# DEC-evidence-access-control: Evidence Access Is Role-Based, Least-Privilege

**Status**: Active

**Category**: Architecture

**Scope**: system-wide

**Source**: [REQ-SEC-evidence-access](../1-spec/requirements/REQ-SEC-evidence-access.md)

**Last updated**: 2026-09-23

## Context

Evidence may contain sensitive personal, financial or identifying information (ADR-031).
Not everyone should see everything, and permanent public links over-expose it (ADR-032,
ADR-092, ADR-093/094).

## Decision

Evidence access is role-based and least-privilege: the buyer sees their transaction evidence,
the verifier sees evidence required for assigned inspections, and evidence is served via
short-lived signed/authenticated access, never permanent public URLs. Access to sensitive
evidence is auditable (ADR-091).

## Enforcement

### Trigger conditions

- **Design phase**: authorization model maps evidence to roles and transaction context.
- **Code phase**: evidence endpoints enforce role checks and issue short-lived signed URLs.
- **Deploy phase**: object store bucket is private; only signed access.

### Required patterns

- Role matrix (buyer / verifier / support / admin) per ADR-032.
- Redaction support and PII minimization (ADR-093/094).

### Required checks

1. Evidence download requires authorization and a short-lived signed URL (ADR-092).
2. Access to sensitive evidence is logged (ADR-091).

### Prohibited patterns

- Public, guessable, long-lived evidence URLs.
- A role seeing another transaction's evidence.
