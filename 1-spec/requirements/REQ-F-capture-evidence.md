# REQ-F-capture-evidence: Evidence Capture Is Append-Only and Provenanced

**Type**: Functional

**Status**: Approved

**Priority**: Must-have

**Source**: [US-perform-inspection](../user-stories/US-perform-inspection.md)

**Source stakeholder**: [STK-verifier](../stakeholders.md)

## Description

The verifier captures photos/videos/observations per requirement. Evidence carries
provenance (who, when, related requirement/product/inspection) and an integrity hash.
Evidence is append-only; previously submitted evidence is not deleted without an auditable
record (ADR-013, ADR-015, ADR-038, ADR-095, ADR-097).

## Acceptance Criteria

- **AC-evidence-per-requirement**: Given a requirement, when evidence is captured, then it
  is linked to that requirement and its required evidence artifacts are present (ADR-055).
- **AC-evidence-provenance**: Given an evidence item, when recorded, then it carries
  creator, timestamp, type, related requirement/product/inspection (ADR-097).
- **AC-evidence-append-only**: Given a finalized inspection, when evidence is added or
  corrected, then the prior evidence remains and the change is a new record, not an
  overwrite (ADR-014/015/077).
- **AC-evidence-integrity**: Given stored evidence, when read, then its content hash is
  verifiable so alteration is detectable (ADR-095; integrity ≠ truth ADR-096).

## Related Constraints

- [CON-mvp-scope](../../1-spec/constraints/CON-mvp-scope.md) — evidence stored in object
  storage referenced by DB (ADR-038), not embedded.
