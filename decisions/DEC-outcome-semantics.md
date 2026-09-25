# DEC-outcome-semantics: PASS / FAIL / INCONCLUSIVE / NOT_TESTED Are Distinct

**Status**: Active

**Category**: Convention

**Scope**: system-wide

**Source**: [REQ-F-inspection-results](../1-spec/requirements/REQ-F-inspection-results.md)

**Last updated**: 2026-09-23

## Context

Collapsing outcomes into one binary forces over-claiming. FAIL is not "defective", a missing
test is not a failure, and insufficient evidence must be reportable without lying
(ADR-052, ADR-053, ADR-054). Partial verification is legitimate and useful (ADR-025).

## Decision

Each requirement evaluates to exactly one of PASS / FAIL / INCONCLUSIVE / NOT_TESTED.
FAIL means observed result did not satisfy the requirement (not product-defective);
INCONCLUSIVE is first-class when evidence is insufficient; NOT_TESTED is distinct from FAIL.
The inspection then reflects the mix of outcomes rather than a single "verified".

## Enforcement

### Trigger conditions

- **Design phase**: outcome is an enumerated field; report composes results per requirement.
- **Code phase**: the UI/logic must never map NOT_TESTED or INCONCLUSIVE onto PASS/FAIL.

### Required patterns

- Enumerated result on RequirementResult (ADR-052/053/054).
- Report shows per-requirement outcomes, supporting partial verification (ADR-025).

### Required checks

1. No silent coercion of INCONCLUSIVE/NOT_TESTED to PASS or FAIL.
2. FAIL surfaced as requirement-not-satisfied, not product-defective (ADR-052).

### Prohibited patterns

- A single global "verified / not verified" boolean as the only signal.
- Treating "no evidence of a problem" as "pass" (contrast ADR-059).
