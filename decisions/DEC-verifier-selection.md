# DEC-verifier-selection: Buyer Selects Verifiers; First Responder Claims the Job

**Status**: Active

**Category**: Architecture

**Scope**: system-wide

**Source**: REQ-F-create-verification-request/AC-request-assign-verifier, grounded in
DEC-verifier-independent-evidence and DEC-idempotency

**Last updated**: 2026-10-02

## Context

`AC-request-assign-verifier` requires an independent verifier to be assigned who does not
control the sale/custody. The MVP pilot (goal: at least 3 real transactions) needs a
concrete assignment mechanism. Because verifiers are rated and the buyer has the most at
stake in *who* inspects, assignment is **buyer-driven**: the customer chooses. Verifiers
must be discoverable by availability, and the "first to respond wins" handoff is a race
that must not double-assign (DEC-idempotency, DEC-state-transition-validation).

## Decision

The buyer selects a verifier for their request. A verifier carries an `availability_status`:
`AVAILABLE` | `BUSY` | `SNOOZED` | `BANNED`. `AVAILABLE` is the only selection filter — there
is **no rating/ranking in the MVP**; availability alone defines the candidate pool. The buyer
shortlists up to **3** available verifiers; the first verifier to respond **claims** the job
and the inspection/request moves to ASSIGNED; the others are released. Verifier independence
is preserved: compensation is for completing a legitimate inspection, not tied to the buyer's
verdict, and the verifier is isolated from seller/custody/payment roles.

## Enforcement

### Trigger conditions

- **Specification phase**: assignment is described as buyer-selected; `AC-request-assign-verifier`
  reflects selection by the buyer (reconciliation pending — see `PROCEDURES.md` issues).
- **Design phase**: data model adds `VERIFIER.availability_status`; API adds list-by-availability,
  shortlist, and claim operations; state machine includes offer/claim states.
- **Code phase**: the claim is a critical, idempotent, optimistic-concurrency write that
  atomically flips the winner to `ASSIGNED`/`BUSY` and rejects the second responder;
  availability transitions follow the status machine (who may set each status).
- **Deploy phase**: nothing special beyond normal transactional integrity.

### Required patterns

- Availability: `AVAILABLE` (open to claims) | `BUSY` (on an active claim/inspection) |
  `SNOOZED` (verifier self-set; not available) | `BANNED` (platform compliance; not selectable).
- Status ownership: system sets `BUSY` on a successful claim and releases to `AVAILABLE`
  when the inspection ends/fails to start; verifier sets `SNOOZED`/`AVAILABLE`; platform
  compliance sets `BANNED` (auditable action, past-tense event).
- Selection: buyer lists verifiers where `availability_status = AVAILABLE` (subject to any
  request context), picks up to 3, sends offers; first accept wins.
- Race handling: claim endpoint validates current state, applies idempotency key, and uses
  `UPDATE ... WHERE availability_status='AVAILABLE' ... AND version=?`; second responder
  receives an explicit reject (e.g. `ALREADY_ASSIGNED`).
- Fallback: if all offers decline or lapse (default window 24h), the request returns to a
  re-select state. `Timeout ≠ acceptance` (ADR-066/067).

### Required checks

1. No two verifiers can both claim the same offer.
2. A verifier cannot be listed/selected while `BUSY`, `SNOOZED`, or `BANNED`.
3. Buyer selection never lets a verifier also take seller/custody/payment control
   (DEC-verifier-independent-evidence).
4. Verifier compensation is not gated on the buyer's ACCEPT/REJECT verdict.

### Prohibited patterns

- Platform-only assignment (the buyer does not choose).
- A rating/ranking gate that replaces availability as the selection filter in the MVP.
- Non-atomic claim that can double-assign or silently overwrite a concurrent claim.
- Paying a verifier only if the buyer accepts the product.
