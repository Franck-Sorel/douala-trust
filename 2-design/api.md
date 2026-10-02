# API / Interface Design

**Status**: Draft

**Purpose**: The HTTP interface for the MVP vertical slice of Epic 1 — endpoints, payloads,
error semantics, and the offer/claim handoff — grounded in the state-separation, idempotency,
transition-validation, and verifier-selection decisions. This is the contract that makes
backend tickets precise ("given payload → this response / this transition").

> Stack decision: Node + TypeScript ([DEC-mvp-stack](../decisions/DEC-mvp-stack.md)).
> Authoritative state in PostgreSQL; requests are two-phase (draft vs committed)
> ([DEC-deferred-buyer-identity](../decisions/DEC-deferred-buyer-identity.md),
> [DEC-authoritative-single-source](../decisions/DEC-authoritative-single-source.md)).

## Conventions

- **Identifiers**: opaque keys. `buyer_id`, `verifier_id`, `request_id`, `offer_id`.
- **Idempotency**: every critical write (create request, send offers, claim) accepts an
  optional `Idempotency-Key` header; a replay returns the original result, never a duplicate
  side effect ([DEC-idempotency](../decisions/DEC-idempotency.md), ADR-073).
- **Errors**: machine-readable `{ "error": "code", "message": "...", "detail?" }`.

| Code | Meaning |
|------|---------|
| `400 INVALID_STATE_TRANSITION` | The command is not valid for the request's current state (ADR-136) |
| `409 ALREADY_ASSIGNED` / `409 CONFLICT` | Concurrent claim lost or optimistic-concurrency version conflict (ADR-138/139) |
| `404 NOT_FOUND` | Unknown resource |
| `422 VALIDATION_FAILED` | Malformed/insufficient payload (e.g. >3 verifiers) |

## Draft vs commit (identity boundary)

- **Draft** (no identity): product + requirements edited in the app; held client-side /
  ephemeral. Nothing listable.
- **Commit**: first authenticated write to `POST /requests` below captures minimal buyer
  identity and persists the request. All later reads are scoped to that buyer.

## Endpoints (Epic 1)

### `POST /requests` — create a committed verification request
Captures identity at commit, persists product detail + structured requirements, moves the
request to `REQUIREMENTS_SET`.

Body:
```json
{
  "contact": "+2376XXXXXXXX",
  "product": {
    "description": "iPhone 13, 128GB",
    "location": "Douala",
    "expected_identity": ["serial: X"]        // optional identifiers (AC-request-product-detail)
  },
  "requirements": [                            // structured, AC-req-structured
    {
      "description": "Screen has no cracks",
      "expected_result": "intact",
      "test_method": "visual inspection",
      "required_evidence": ["photo"],
      "priority": "high"
    }
  ]
}
```
Response `201`: `{ "request_id", "state": "REQUIREMENTS_SET", "assigned_verifier": null }`.
Traces: [REQ-F-create-verification-request/AC-request-product-detail](../1-spec/requirements/REQ-F-create-verification-request.md),
[REQ-F-requirements-first-class/AC-req-structured](../1-spec/requirements/REQ-F-requirements-first-class.md),
[DEC-deferred-buyer-identity](../decisions/DEC-deferred-buyer-identity.md).

### `GET /requests` — list my requests
Scoped to the committed buyer's `buyer_id`. Each row: `request_id`, `state`, `assigned_verifier`,
and `inspection_status` — the last is **Epic 2 data** and is returned as `null`/`"-"` until an
inspection exists (ownership split, G8).
Traces: [REQ-F-create-verification-request/AC-request-list](../1-spec/requirements/REQ-F-create-verification-request.md).

### `GET /verifiers?availability=AVAILABLE` — discover selectable verifiers
Returns verifiers whose `availability_status = AVAILABLE` only. Payload is identity + availability
**only** — no rating/ranking in the MVP
([DEC-verifier-selection](../decisions/DEC-verifier-selection.md)).

Response:
```json
{ "verifiers": [ { "verifier_id", "name", "availability_status": "AVAILABLE" } ] }
```

### `POST /requests/{request_id}/offers` — shortlist and send offers
Buyer chooses up to **3** `verifier_id`s from the available pool. The system creates `OFFER`
records and the request moves to `VERIFIER_OFFERING`. More than 3 → `422`.

Body: `{ "verifier_ids": ["v1","v2","v3"] }`
Response `201`: `{ "offer_ids": [...], "state": "VERIFIER_OFFERING" }`.
Traces: [DEC-verifier-selection](../decisions/DEC-verifier-selection.md),
[REQ-F-create-verification-request/AC-request-assign-verifier](../1-spec/requirements/REQ-F-create-verification-request.md).

### `POST /offers/{offer_id}/claim` — first responder claims the job
Atomic, idempotent, optimistic-concurrency write ([DEC-idempotency](../decisions/DEC-idempotency.md),
[DEC-state-transition-validation](../decisions/DEC-state-transition-validation.md)):
`UPDATE offers SET status='CLAIMED' ... WHERE offer_id=? AND status='PENDING' AND version=?`.
On success: verifier → `BUSY`, request → `ASSIGNED`; other offers → `DECLINED`; response `200
{ "request_id", "state": "ASSIGNED" }`. If another verifier won the race: `409 ALREADY_ASSIGNED`.

Traces: [REQ-F-create-verification-request/AC-request-assign-verifier](../1-spec/requirements/REQ-F-create-verification-request.md),
[DEC-verifier-selection](../decisions/DEC-verifier-selection.md).

## Invitation lifecycle & fallback

- **Offers** are sent simultaneously to the shortlisted verifiers.
- **First** `claim` wins; the rest are released.
- If all offers **decline or lapse** (default window **24h**, then expired), the request
  returns to a re-select state; the buyer may send new offers.
- `Timeout ≠ acceptance` (ADR-066/067). The `REJECT` / expiry is a past-tense event, never a
  silent overwrite ([DEC-evidence-immutable-append-only](../decisions/DEC-evidence-immutable-append-only.md) —
  history applies to request/offer events too).

## Requirement freeze boundary (Epic 1 vs Epic 2)

- Epic 1 builds the **version-aware model** (`requirement_set_version`, `REQUIREMENT_VERSION`
  refs) and satisfies [REQ-F-requirements-first-class/AC-req-versioned](../1-spec/requirements/REQ-F-requirements-first-class.md).
- The **freeze trigger** — freezing the frozen set when *an inspection starts* — is owned by
  **Epic 2** ([AC-req-frozen](../1-spec/requirements/REQ-F-requirements-first-class.md)). No
  requirement-editing endpoint exists in Epic 1's API.

## Out of scope for this document

Payments, disputes, in-app buyer–verifier messaging ([DEC-buyer-verifier-communication](../decisions/DEC-buyer-verifier-communication.md)
— deferred), evidence upload/download (Epic 2), full authentication (Epic 4 / REQ-SEC).
