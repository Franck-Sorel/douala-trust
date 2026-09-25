# CON-mvp-scope: Strict MVP Verifies One Transaction, Not the Platform

**Category**: Business

**Status**: Active

**Source stakeholder**: [STK-platform](../stakeholders.md)

## Description

The first product is one complete real-world verification transaction — buyer → request →
Douala verifier → inspection → evidence package → buyer decision. The MVP must **not** be a
miniature of the full platform. The following are out of MVP scope for the first release
(mapped from the ADR register + design analysis): automated payments / funds release,
dispute-resolution engine, custody & logistics network, expert-escalation marketplace,
AI-generated observations, asynchronous projections / outbox / dead-letter infrastructure,
and complex distributed concurrency.

## Rationale

The ADRs define how the system should behave once it exists (ADR-001..141). They are
**constraints, not a feature checklist**. The MVP exists to test only: *can a Yaoundé buyer
get trustworthy evidence from a Douala verifier and act on it?* Everything else is
post-MVP.

## Impact

- Scope the MVP to actors Buyer, Seller, Verifier, Platform (ADR-003 separation: no single
  actor controls everything).
- Defer payments (ADR-065/067) and disputes (ADR-023/081) to manual/off-platform initially.
- Defer projections (ADR-132/133), outbox (ADR-113), dead-letter (ADR-116) — a single
  modest database satisfies the principles for the MVP (ADR-037 allows a conventional DB
  with append-only events).

## Related Artifacts

- Derived requirements: [REQ-F-create-verification-request](../requirements/REQ-F-create-verification-request.md), [REQ-F-review-evidence](../requirements/REQ-F-review-evidence.md)
