# DEC-state-transition-validation: State Changes Are Validated, Atomic, and Versioned

**Status**: Active

**Category**: Architecture

**Scope**: system-wide

**Source**: n/a (determined during MVP design; grounded in ADR-135..139)

**Last updated**: 2026-09-23

## Context

Distributed retries and concurrent requests can attempt the same transition twice or deliver
transitions out of order. Silently accepting invalid transitions corrupts business state and
complicates reconciliation (ADR-135, ADR-136). A transition and its authoritative record must
be committed atomically, and concurrent writers must not silently overwrite each other
(ADR-137, ADR-138).

## Decision

Every business state transition validates against the entity's current state, is rejected
explicitly when invalid, is committed atomically with its event, and uses optimistic
concurrency (version numbers) where contention is low (ADR-135..139). Retries re-run the same
validation — they never assume state is unchanged (ADR-140).

## Enforcement

### Trigger conditions

- **Design phase**: state machines define allowed transitions per entity.
- **Code phase**: commands validate current state, record an event, and use a version check
  on write; idempotency + validation are both present (ADR-141).

### Required patterns

- Explicit state machine / transition rules per lifecycle entity (ADR-135).
- Invalid transition → explicit REJECTED with reason (ADR-136).
- Optimistic concurrency (version on UPDATE ... WHERE version = n) (ADR-138/139).
- Transaction writes state + event atomically (ADR-137).

### Required checks

1. A retry executes the same validation as the first attempt (ADR-140).
2. Concurrent conflicting writes fail rather than silently overwrite.

### Prohibited patterns

- Applying a transition without validating current state.
- Silently overwriting a newer version on conflict.
