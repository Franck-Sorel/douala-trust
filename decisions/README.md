# Decisions Index

Active decision records (`DEC-*`, one two-file entry each) that govern the MVP, mapped to
the authoritative ADR register in [`docs/adr/`](../docs/adr/README.md) (ADR-001..141). The
DEC records are the enforcement layer used during design/code; the ADR register is the full
source.

| DEC | Title | Primary ADR sources |
|-----|-------|---------------------|
| [DEC-mvp-scope](DEC-mvp-scope.md) | MVP is one verification transaction, not the platform | design analysis; ADR bucket-scope |
| [DEC-verifier-independent-evidence](DEC-verifier-independent-evidence.md) | Verifier is an independent evidence producer | ADR-003, 004, 030 |
| [DEC-evidence-over-verdicts](DEC-evidence-over-verdicts.md) | Report observations, not verdicts | ADR-009, 016, 018 |
| [DEC-verification-not-certification](DEC-verification-not-certification.md) | Verified ≠ certified; integrity ≠ truth | ADR-051, 052, 096 |
| [DEC-product-identity](DEC-product-identity.md) | Identity before inspection; mismatch blocks | ADR-005, 041, 042 |
| [DEC-requirements-first-class](DEC-requirements-first-class.md) | Requirements structured and frozen | ADR-012, 044, 045, 128, 129 |
| [DEC-outcome-semantics](DEC-outcome-semantics.md) | PASS/FAIL/INCONCLUSIVE/NOT_TESTED distinct | ADR-025, 052, 053, 054 |
| [DEC-inspection-state-separation](DEC-inspection-state-separation.md) | Independent state machines | ADR-017, 021, 063, 064, 065 |
| [DEC-buyer-verifier-communication](DEC-buyer-verifier-communication.md) | Direct buyer–verifier communication | ADR-002, 006, 007 |
| [DEC-evidence-immutable-append-only](DEC-evidence-immutable-append-only.md) | Evidence history is immutable | ADR-014, 015, 037, 077, 078, 079, 109 |
| [DEC-evidence-storage-separated](DEC-evidence-storage-separated.md) | Binaries outside the transactional DB | ADR-038, 039, 095, 097 |
| [DEC-evidence-access-control](DEC-evidence-access-control.md) | Role-based, least-privilege access | ADR-031, 032, 090, 091, 092, 093, 094 |
| [DEC-state-transition-validation](DEC-state-transition-validation.md) | State changes validated, atomic, versioned | ADR-135, 136, 137, 138, 139, 140 |
| [DEC-idempotency](DEC-idempotency.md) | Critical writes idempotent with validation | ADR-070→073, 107, 141 |
| [DEC-time-semantics](DEC-time-semantics.md) | Typed timestamps, server UTC time | ADR-098, 099, 100, 101 |
| [DEC-authoritative-single-source](DEC-authoritative-single-source.md) | Authoritative state is single source of truth | ADR-130, 131, 132, 133, 134 |

## How decisions are used

- **Active records** (`DEC-*.md`) are read during normal task execution (design → code).
- **History files** (`DEC-*.history.md`) hold alternatives/reasoning; append to the
  changelog only, per [`decisions/PROCEDURES.md`](PROCEDURES.md).
- When a DEC must be recorded/deprecated/superseded, follow `PROCEDURES.md`.

## Relationship to the ADR register

The 141 ADRs in `docs/adr/` are the complete, deduplicated source. The 16 DEC records above
are the subset that actively **constrains the MVP** (its invariants and operational
safeguards). Post-MVP decisions (projections, outbox, dead-letter, AI, dispute engine,
custody network, complex concurrency) are documented in the register and reappear as DEC
records when work reaches them.
