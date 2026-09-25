# DEC-time-semantics: Timestamps Have Meaning and Use Server Time in UTC

**Status**: Active

**Category**: Data

**Scope**: system-wide

**Source**: n/a (determined during MVP design; grounded in ADR-098..101)

**Last updated**: 2026-09-23

## Context

A single generic timestamp creates misleading assumptions about when an observation
occurred; client clocks can be wrong or manipulated; and timestamps alone cannot order events
in a distributed system (ADR-098, ADR-099, ADR-100, ADR-101).

## Decision

Timestamps are typed (captured_at, uploaded_at, verified_at, created_at, updated_at),
transaction-critical timing uses server-side trusted time, all timestamps are stored in a
canonical UTC representation (displayed in the user's local zone), and event/entity ordering
uses explicit sequence/version metadata rather than timestamps alone.

## Enforcement

### Trigger conditions

- **Design phase**: schema uses typed time fields, UTC storage, and sequence/version for
  ordering.
- **Code phase**: server sets transactional timestamps; client timestamps retained only as
  metadata.

### Required patterns

- Typed timestamps (ADR-098); UTC canonical storage with local display (ADR-100).
- Ordering via event_sequence / version, not timestamps alone (ADR-101).

### Required checks

1. Transactional time comes from the server, not the client (ADR-099).
2. Ordering-critical logic never depends solely on wall-clock timestamps (ADR-101).

### Prohibited patterns

- Trusting client-supplied timestamps for transaction ordering.
- A single ambiguous "timestamp" field for events with different times.
