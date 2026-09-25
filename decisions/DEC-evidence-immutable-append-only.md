# DEC-evidence-immutable-append-only: Evidence History Is Immutable

**Status**: Active

**Category**: Data

**Scope**: system-wide

**Source**: [REQ-F-capture-evidence](../1-spec/requirements/REQ-F-capture-evidence.md)

**Last updated**: 2026-09-23

## Context

If evidence or reports can be silently overwritten, a verifier could alter results after a
dispute begins, and history loses reconstructability (ADR-014, ADR-015, ADR-077).
Corrections exist but must preserve the original value and be new records, not edits to past
events (ADR-078, ADR-079).

## Decision

Evidence and inspection reports are append-only and immutable once recorded. Corrections /
additions create new records; the original values remain visible to authorized auditors. This
is implemented as an append-only transaction-event history (see ADR-037 — a conventional DB
with append-only events suffices for the MVP).

## Enforcement

### Trigger conditions

- **Design phase**: data model has append-only events/versions for evidence and reports.
- **Code phase**: no update/delete path on finalized evidence or reports; only addition.
- **Deploy phase**: DB / object store configured to prevent hard deletes of finalized
  artifacts.

### Required patterns

- Evidence timeline: photo/serial/test/observation/correction appended over time (ADR-015).
- Correction event preserves original value, reason, actor, time (ADR-078/079).
- Reports immutable after submission (ADR-014).

### Required checks

1. Finalized report/evidence cannot be edited in place.
2. Any correction is a new record that preserves the original.

### Prohibited patterns

- UPDATE/DELETE on finalized reports or evidence (except audited retention deletion,
  ADR-040).
- Rewriting prior events/versions during schema evolution (ADR-109).
