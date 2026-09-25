# US-perform-inspection: Verifier Inspects and Captures Evidence

**As a** verifier, **I want** a guided, scoped inspection task that documents product
identity and captures evidence per requirement, **so that** I produce trustworthy
observations without having to guarantee or transport the product.

**Status**: Draft

**Priority**: Must-have

**Source stakeholder**: [STK-verifier](../stakeholders.md)

**Related goal**: [GOAL-mvp-trust-transaction](../goals/GOAL-mvp-trust-transaction.md)

## Acceptance Criteria

- Given an assigned inspection, when I start, then I first confirm product identity and any
  mismatch is a blocking event (ADR-005/041/042).
- Given each requirement, when I test it, then I record an observation, evidence and a
  result of PASS / FAIL / INCONCLUSIVE / NOT_TESTED (ADR-013/052/053/054).
- Given I must not take custody, when the inspection is done, then I observe→test→document
  and submit an immutable report (ADR-004/014).

## Derived Requirements

- [REQ-F-capture-evidence](../requirements/REQ-F-capture-evidence.md)
- [REQ-F-inspection-results](../requirements/REQ-F-inspection-results.md)
- [REQ-F-product-identity](../requirements/REQ-F-product-identity.md)
