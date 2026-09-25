# REQ-F-inspection-results: Explicit Outcome Semantics Per Requirement

**Type**: Functional

**Status**: Approved

**Priority**: Must-have

**Source**: [US-perform-inspection](../user-stories/US-perform-inspection.md)

**Source stakeholder**: [STK-verifier](../stakeholders.md) and [STK-buyer](../stakeholders.md)

## Description

Each requirement is evaluated with an explicit outcome drawn from PASS, FAIL, INCONCLUSIVE,
NOT_TESTED. FAIL means the observed result did not satisfy the requirement (not that the
product is defective); INCONCLUSIVE is a first-class outcome when evidence is insufficient;
NOT_TESTED is distinct from FAIL (ADR-052, ADR-053, ADR-054). The verifier reports
observations + evidence, not broad verdicts (ADR-009).

## Acceptance Criteria

- **AC-result-set**: Given an evaluated requirement, when recorded, then its result is one
  of PASS / FAIL / INCONCLUSIVE / NOT_TESTED.
- **AC-result-evidenced**: Given a result, when submitted, then it carries the supporting
  observation, evidence reference, verifier and timestamp (ADR-013).
- **AC-result-not-defective**: Given a FAIL, when interpreted, then it is expressed as
  requirement-not-satisfied, not product-defective (ADR-052).
- **AC-report-immutable**: Given a submitted report, when a correction is needed, then a
  new version is created and the original remains (ADR-014/079).

## Related Constraints

- [CON-verification-not-certification](../../1-spec/constraints/CON-verification-not-certification.md)
