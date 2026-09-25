# DEC-inspection-state-separation: Transaction, Inspection and Buyer Decision Are Independent States

**Status**: Active

**Category**: Architecture

**Scope**: system-wide

**Source**: [REQ-F-review-evidence](../1-spec/requirements/REQ-F-review-evidence.md)

**Last updated**: 2026-09-23

## Context

Combining transaction, inspection and payment into one life-cycle creates contradictory
logic (a transaction can be SHIPPING while inspection is COMPLETED). Inspection completion
must not imply buyer acceptance or funds release (ADR-063, ADR-064, ADR-021, ADR-065).

## Decision

The system keeps separate state machines: Transaction, Inspection, and (later) Payment. A
completed inspection does not equal buyer acceptance; the buyer decision (ACCEPT / REJECT /
REQUEST_MORE_EVIDENCE / DISPUTE) is a distinct event.

## Enforcement

### Trigger conditions

- **Design phase**: model independent state machines per concern; buyer decision is separate
  from inspection state.
- **Code phase**: transitions are scoped to their owning state machine; no cross-state
  coupling that auto-releases funds or auto-accepts.

### Required patterns

- Inspection state: REQUESTED → ASSIGNED → IN_PROGRESS → COMPLETED / INCONCLUSIVE /
  CANCELLED (ADR-017, ADR-063).
- Buyer decision state separate (ADR-021); payment release policy explicit later
  (ADR-064/065).

### Required checks

1. Inspection completion never implicitly changes transaction acceptance or payment.
2. Each concern's transitions validate against its own state machine (ADR-135).

### Prohibited patterns

- One giant status field mixing inspection + transaction + payment.
- Auto-accept or auto-release funds from inspection completion.
