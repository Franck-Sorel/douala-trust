# REQ-F-review-evidence: Buyer Reviews the Evidence Package and Decides

**Type**: Functional

**Status**: Approved

**Priority**: Must-have

**Source**: [US-review-evidence](../user-stories/US-review-evidence.md)

**Source stakeholder**: [STK-buyer](../stakeholders.md)

## Description

After inspection completes, the buyer reviews a scoped evidence package organized around
their requirements — result, observation, evidence, and access to original artifacts — then
records a decision separate from verification (ADR-060, ADR-061, ADR-062, ADR-021).

## Acceptance Criteria

- **AC-package-scoped**: Given a completed inspection, when the buyer opens the package,
  then each requirement shows result, observation and evidence, with a clearly scoped claim
  (ADR-061, ADR-018).
- **AC-original-accessible**: Given a summary is shown, when the buyer wants to audit it,
  then the original evidence artifact remains accessible (ADR-062).
- **AC-decision-separate**: Given the buyer decides, when recorded, then the decision is
  ACCEPT / REJECT / REQUEST_MORE_EVIDENCE and is modeled separately from verification
  (ADR-021; transaction vs inspection state ADR-063).

## Related Assumptions

- [ASM-mobile-money](../../1-spec/assumptions/ASM-mobile-money.md) — payment/settlement is
  out of MVP scope (ADR-065/067 deferred).
