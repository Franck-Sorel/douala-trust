# REQ-SEC-evidence-access: Evidence Access Is Role-Based and Least-Privilege

**Type**: Security

**Status**: Draft

**Priority**: Must-have

**Source**: [US-review-evidence](../user-stories/US-review-evidence.md)

**Source stakeholder**: [STK-platform](../stakeholders.md)

## Description

Evidence access is role-based and least-privilege: buyer sees their transaction evidence,
verifier sees evidence required for assigned inspections, and evidence is not exposed via
permanent public URLs — use short-lived signed/authenticated access (ADR-031, ADR-032,
ADR-092; least-privilege ADR-090).

## Acceptance Criteria

- **AC-role-based-access**: Given a participant, when they request evidence, then they only
  access evidence within their role and transaction context (ADR-032).
- **AC-no-public-links**: Given evidence is served, when a link is produced, then it is
  short-lived/authenticated, not a permanent public URL (ADR-092).
- **AC-minimize-pii**: Given evidence is captured, when it contains unnecessary personal
  information, then redaction is supported and retention of unneeded PII is avoided
  (ADR-093/094).

## Related Constraints

- [CON-verification-not-certification](../../1-spec/constraints/CON-verification-not-certification.md)
