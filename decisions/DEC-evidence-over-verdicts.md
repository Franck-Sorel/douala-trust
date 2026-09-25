# DEC-evidence-over-verdicts: Report Observations, Not Verdicts

**Status**: Active

**Category**: Convention

**Scope**: system-wide

**Source**: [CON-verification-not-certification](../1-spec/constraints/CON-verification-not-certification.md)

**Last updated**: 2026-09-23

## Context

A verifier reporting "this is a good product" forces subjective judgment, is hard to audit,
and invites over-inference. Observations and test results are auditable, comparable to the
buyer's requirements, and keep the buyer responsible for interpreting them (ADR-009, ADR-016,
ADR-018).

## Decision

The verifier reports observations and test results, never bare grid labels like "good."
Store raw observations separately from derived interpretations; the buyer decides whether the
observations satisfy requirements. Claims are scoped: "verified against 12 requirements", not
"verified".

## Enforcement

### Trigger conditions

- **Design phase**: data model stores observations (and optional platform interpretation)
  separately.
- **Code phase**: result submission requires an observation + evidence, not only a pass/fail.

### Required patterns

- Claim → Observation → Evidence → Actor → Timestamp (ADR-013).
- Three-layer separation: observation / interpretation / buyer decision (ADR-016).

### Required checks

1. Every result carries supporting observation and evidence.
2. UI never displays a bare unqualified "Verified".
3. Platform summaries (PASS/FAIL/INCONCLUSIVE/NOT_TESTED) never replace the evidence.

### Prohibited patterns

- Verifier submitting "PASS" with no observation/evidence.
- Persisting only an aggregated verdict and discarding observations.
