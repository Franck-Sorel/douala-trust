# DEC-idempotency: Critical Writes Are Idempotent With State Validation

**Status**: Active

**Category**: Architecture

**Scope**: system-wide

**Source**: [REQ-F-inspection-results](../1-spec/requirements/REQ-F-inspection-results.md)

**Last updated**: 2026-09-23

## Context

Retries are normal: clients, networks and brokers may resend the same request. A double
submission must not create two releases or two contradictory transitions (ADR-070→073;
consumers idempotent ADR-107). Idempotency solves "have I already processed this?" while
state validation solves "is this valid now?" — both are needed; neither substitutes for the
other (ADR-141).

## Decision

Critical state-changing operations (inspection submission, evidence upload, requirement
change, decisions) accept an idempotency key and re-validate current state on every attempt.
Idempotency + concurrency control + state-transition validation are applied together.

## Enforcement

### Trigger conditions

- **Design phase**: API design marks critical writes with idempotency keys.
- **Code phase**: handlers deduplicate by key and re-validate state; consumers treat
  redelivery as normal (ADR-107).

### Required patterns

- Idempotency key on critical requests (ADR-073).
- Consumers idempotent against duplicate events (ADR-107).
- State validation on every attempt (ADR-141).

### Required checks

1. Re-sending the same critical request returns the original result, no duplicate side effect.
2. A retry still validates the entity's current state (ADR-140/141).

### Prohibited patterns

- Relying on idempotency alone to skip state validation, or vice versa (ADR-141).
- Creating duplicate financial/lifecycle side effects on retry.
