# DEC-verifier-independent-evidence: Verifier Is an Independent Evidence Producer

**Status**: Active

**Category**: Architecture

**Scope**: system-wide

**Source**: [CON-separate-responsibilities](../1-spec/constraints/CON-separate-responsibilities.md)

**Last updated**: 2026-09-23

## Context

The platform must not become a guarantor, insurer, or universal product-guarantee service.
The verifier is not the buyer's agent and does not guarantee the transaction; a single actor
must not control inspection + possession + transport + payment + final approval (ADR-003).
Verifiers do not take custody of or transport the product (ADR-004, ADR-030).

## Decision

The verifier is an **independent evidence producer**: aligned incentives, independent
responsibility. The verifier earns for completing a legitimate inspection — not for declaring
the product good — observes→tests→documents→returns, and is isolated from sale, custody and
payment control.

## Enforcement

### Trigger conditions

- **Design phase**: component & actor model must keep verifier separate from seller,
  transporter and payer roles.
- **Code phase**: authorization must prevent a verifier from also satisying seller/custody
  roles or final approval.

### Required patterns

- Responsibility map per ADR-003: seller owns, buyer specifies outcome, verifier inspects,
  platform controls settlement/disputes, transport is separate.
- Default protocol Observe → Test → Document → Return (ADR-004/030).

### Required checks

1. No participant can both inspect and assume custody/transport in the MVP flow.
2. Verifier compensation is tied to completing a legitimate inspection, not to a verdict.

### Prohibited patterns

- "Verifier only paid if buyer accepts" incentives (biases the verdict).
- Verifier as custodian, transporter, or guarantor.
