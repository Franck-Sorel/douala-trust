# US-review-evidence: Buyer Reviews the Evidence Package

**As a** buyer, **I want** to review a scoped evidence package that answers what was
checked, observed, and not tested, **so that** I can decide whether to proceed without
over-inferring beyond the evidence.

**Status**: Draft

**Priority**: Must-have

**Source stakeholder**: [STK-buyer](../stakeholders.md)

**Related goal**: [GOAL-mvp-trust-transaction](../goals/GOAL-mvp-trust-transaction.md)

## Acceptance Criteria

- Given a completed inspection, when I open the package, then I see requirements organized
  with result, observation and evidence, plus access to original artifacts (ADR-060/061/062).
- Given the claim "verified", when I read it, then it is scoped to what was actually
  verified (ADR-018), never a bare guarantee (CON-verification-not-certification).
- Given I have decided, when the inspection did not accept, then my decision is recorded
  separately from verification (ADR-021) as ACCEPT / REJECT / REQUEST_MORE_EVIDENCE.

## Derived Requirements

- [REQ-F-review-evidence](../requirements/REQ-F-review-evidence.md)
- [REQ-F-inspection-results](../requirements/REQ-F-inspection-results.md)
