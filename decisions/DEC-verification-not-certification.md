# DEC-verification-not-certification: Verified ≠ Certified; Integrity ≠ Truth

**Status**: Active

**Category**: Convention

**Scope**: system-wide

**Source**: [CON-verification-not-certification](../1-spec/constraints/CON-verification-not-certification.md)

**Last updated**: 2026-09-23

## Context

Users may infer regulatory/professional authority the platform does not have, and may treat
"verified" or evidence hashes as proof of truthfulness. Platform inspection differs from
professional certification (ADR-051); a content hash proves file consistency, not that the
observation is truthful (ADR-096). A failed requirement does not mean the product is defective
(ADR-052).

## Decision

Platform "verified" always means "inspected against the transaction requirements" — never
regulatory/legal/professional certification. Evidence integrity is verifiable, but integrity ≠
authenticity ≠ truth. No participant is held to have guaranteed the product's future
performance or hidden defects.

## Enforcement

### Trigger conditions

- **Design phase**: terminology and disclosure language use scoped claims.
- **Code phase**: no path presents hashes, photos, or "verified" as proof of truth or as a
  guarantee.

### Required patterns

- Distinct labels: "Platform inspection" vs "Professional certification" (ADR-051).
- Hash used only to detect alteration (ADR-095), with the ADR-096 caveat surfaced.

### Required checks

1. User-facing copy never claims certification or a product guarantee.
2. Evidence hashes are presented as integrity checks, not truth proofs.

### Prohibited patterns

- Advertising "100% verified" or guaranteed authenticity without actual testing.
- Using evidence hash as evidence that an observation is truthful.
