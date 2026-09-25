# DEC-buyer-verifier-communication: Direct Buyer–Verifier Interaction

**Status**: Active

**Category**: Architecture

**Scope**: system-wide

**Source**: n/a (determined during MVP design; grounded in ADR-002)

**Last updated**: 2026-09-23

## Context

Static inspection forms cannot anticipate every product-specific question (e.g. "which USB-C
port should I test?"). The buyer often has product expertise while the verifier has physical
proximity; live/guided interaction covers a wide range of inspections (ADR-002, ADR-006,
ADR-007 level 3 "assisted").

## Decision

The buyer and verifier can communicate directly (text and media) and schedule live/guided
segments, while all formal inspection requirements and results remain structured records —
the conversation does not replace the requirement model.

## Enforcement

### Trigger conditions

- **Design phase**: a messaging channel exists; structured requirements remain authoritative.
- **Code phase**: messages/guidance are stored and linked to the inspection; they are not the
  requirement store.

### Required patterns

- Communication supporting text/photos/video/calls and scheduling (ADR-002).
- Formal requirements and results still written as first-class data (ADR-012).

### Required checks

1. Guidance shared in chat never silently rewrites frozen requirements (ADR-044).
2. Buyer/verifier messages are captured and linked to the inspection for context.

### Prohibited patterns

- Using chat as the system of record for requirements or results.
- A verifier being pressured into unsafe/decisive claims via chat (ADR-029, ADR-009).
