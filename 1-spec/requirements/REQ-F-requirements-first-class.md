# REQ-F-requirements-first-class: Requirements Are Structured, Frozen Data

**Type**: Functional

**Status**: Approved

**Priority**: Must-have

**Source**: [US-request-verification](../user-stories/US-request-verification.md)

**Source stakeholder**: [STK-buyer](../stakeholders.md)

## Description

Inspection requirements are stored as structured data (description, expected result, test
method, required evidence), not only inside chat. Requirements are frozen before inspection;
changes create new versions rather than rewriting (ADR-012, ADR-044, ADR-045; requirement
versions preserved ADR-128/129).

## Acceptance Criteria

- **AC-req-structured**: Given a buyer defines requirements, when stored, then each
  requirement carries description, expected_result, test_method, and required_evidence.
- **AC-req-frozen**: Given an inspection has started, when a requirement would change, then
  a new version is created and the original set is preserved (ADR-044).
- **AC-req-versioned**: Given an evaluation, when recorded, then it references the exact
  requirement version applied (ADR-129).

## Related Constraints

- [CON-verification-not-certification](../../1-spec/constraints/CON-verification-not-certification.md)
