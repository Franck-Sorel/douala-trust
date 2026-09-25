# DEC-requirements-first-class: Requirements Are Structured and Frozen

**Status**: Active

**Category**: Data

**Scope**: system-wide

**Source**: [REQ-F-requirements-first-class](../1-spec/requirements/REQ-F-requirements-first-class.md)

**Last updated**: 2026-09-23

## Context

Requirements stored only in chat cannot be compared, versioned or audited. Without freezing,
the system could make it look like the verifier failed to test something not originally
requested (ADR-012, ADR-044, ADR-045). Historical evaluations must reference the exact
requirement version used (ADR-128, ADR-129).

## Decision

Inspection requirements are first-class structured data (description, expected result, test
method, required evidence). They are frozen once inspection starts; changes create a new
version/scope. Evaluations reference the exact requirement version applied.

## Enforcement

### Trigger conditions

- **Design phase**: data model includes a Requirement entity with versioning and an
  InspectionRequirement link.
- **Code phase**: requirement mutations after inspection start create versions, never
  in-place edits.

### Required patterns

- Requirement: description, expected_result, test_method, required_evidence, priority
  (ADR-012).
- Evaluation references requirement_version (ADR-129).

### Required checks

1. Inspection references frozen requirement set + a documentable version (ADR-044/128).
2. Requirement changes are auditable with who/what/when/why (ADR-045).

### Prohibited patterns

- Editing requirements in place after inspection started.
- Losing the link between an evaluation and the requirement version it used.
