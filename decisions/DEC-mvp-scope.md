# DEC-mvp-scope: MVP Is One Verification Transaction, Not the Platform

**Status**: Active

**Category**: Process

**Scope**: system-wide

**Source**: [CON-mvp-scope](../1-spec/constraints/CON-mvp-scope.md)

**Last updated**: 2026-09-23

## Context

ADR-001..141 thoroughly define how the verification platform should behave. Following them
blindly becomes an implementation spec that balloons the first release. The MVP must prove
only the core trust hypothesis with one complete real-world transaction (buyer → request →
Douala verifier → evidence → buyer decision). ADRs are constraints, not a feature checklist.

## Decision

The MVP implements exactly the vertical slice: a buyer creates a structured verification
request; an independent Douala verifier inspects and captures evidence; the buyer reviews a
scoped evidence package and records a decision. Everything else (payments automation,
disputes engine, custody/logistics network, expert-escalation marketplace, AI observations,
projections/outbox/dead-letter, complex distributed concurrency) is deferred as post-MVP
architecture that the design anticipates but does not implement.

## Enforcement

### Trigger conditions

- **Specification phase**: when defining requirements, include only the vertical-slice
  capabilities; mark payments/disputes/AI as out of scope.
- **Design phase**: architecture and data model include only MVP components; reserve (do not
  build) seams for later events/projections.
- **Code phase**: reject tasks that add post-MVP infrastructure (brokers, projections,
  AI) unless the user explicitly expands scope.
- **Deploy phase**: ship a single modest API + DB + object storage; no stream/broker infra.

### Required patterns

- Actors limited to Buyer, Seller, Verifier, Platform (ADR-003 separation).
- Manual/off-platform paths for payments (ADR-065/067), disputes (ADR-023/081),
  custody/logistics (ADR-010/011) in the MVP.

### Required checks

1. Every MVP task traces to a requirement in the vertical slice.
2. No task depends on a broker, projection, outbox, or AI service.
3. The MVP can run a full transaction end-to-end with real people and a real product.

### Prohibited patterns

- Building a miniature marketplace, payment engine, or event-streaming layer in the MVP.
- Treating any ADR as an automatic feature to implement in the first release.
