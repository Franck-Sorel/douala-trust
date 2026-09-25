# US-request-verification: Buyer Creates a Verification Request

**As a** buyer, **I want** to create a verification request for a product located in Douala
with my inspection requirements, **so that** an independent local verifier can check the
product against what I actually care about.

**Status**: Draft

**Priority**: Must-have

**Source stakeholder**: [STK-buyer](../stakeholders.md)

**Related goal**: [GOAL-mvp-trust-transaction](../goals/GOAL-mvp-trust-transaction.md)

## Acceptance Criteria

- Given a real product in Douala, when I create a request, then I can describe the product,
  its location, and 5–10 concrete inspection requirements stored as structured data
  (ADR-012).
- Given requirements are set, when an inspection starts, then they are frozen and any
  change creates a new version rather than rewriting (ADR-044).

## Derived Requirements

- [REQ-F-create-verification-request](../requirements/REQ-F-create-verification-request.md)
- [REQ-F-requirements-first-class](../requirements/REQ-F-requirements-first-class.md)
