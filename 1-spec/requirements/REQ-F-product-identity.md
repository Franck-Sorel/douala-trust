# REQ-F-product-identity: Product Identity Established and Verified

**Type**: Functional

**Status**: Approved

**Priority**: Must-have

**Source**: [US-perform-inspection](../user-stories/US-perform-inspection.md)

**Source stakeholder**: [STK-verifier](../stakeholders.md)

## Description

Before substantive tests, the verifier establishes which physical item is being inspected
via serial numbers, IMEI, model, or distinctive marks with photographic evidence. An
identity mismatch is a blocking event requiring explicit resolution
(ADR-005, ADR-041, ADR-042). "Verified" is always scoped to what was checked (ADR-018).

## Acceptance Criteria

- **AC-identity-established**: Given an inspection starts, when the verifier begins, then
  product identity is established and evidenced before substantive testing (ADR-041).
- **AC-identity-mismatch-blocking**: Given the observed item differs from the expected
  identity, when matched, then the inspection is blocked with an explicit resolution
  outcome (ADR-042).
- **AC-identity-evidenced**: Given identifiers exist, when captured, then they are recorded
  with evidence (e.g. photo of serial) and provenance (ADR-013/097).

## Related Constraints

- [CON-verification-not-certification](../../1-spec/constraints/CON-verification-not-certification.md)
