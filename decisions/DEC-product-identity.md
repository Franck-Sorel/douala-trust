# DEC-product-identity: Identity Is Established Before Inspection and Mismatch Blocks

**Status**: Active

**Category**: Data

**Scope**: system-wide

**Source**: [REQ-F-product-identity](../1-spec/requirements/REQ-F-product-identity.md)

**Last updated**: 2026-09-23

## Context

There is little value in proving an item meets requirements if the inspected item cannot be
reliably connected to the purchased item (ADR-005). This is the foundation that all
subsequent evidence depends on (ADR-041, ADR-042).

## Decision

Product identity is captured before substantive testing (serial/IMEI/model/distinctive marks
with photo evidence) and is part of the inspection record. An identity mismatch is a blocking
event requiring explicit resolution (STOP / SELLER_CORRECTION / BUYER_APPROVAL /
REINSPECTION / DISPUTE).

## Enforcement

### Trigger conditions

- **Design phase**: inspection data model makes identity a prerequisite step.
- **Code phase**: inspection cannot proceed to substantive tests until identity is recorded;
  mismatch blocks with an explicit outcome.

### Required patterns

- Identity record with evidence + provenance (ADR-013/097): identifiers plus photographs.
- Explicit IDENTITY_MISMATCH outcome with resolution options (ADR-042).

### Required checks

1. Inspection start requires identity established (ADR-041).
2. Mismatch cannot be bypassed silently (ADR-042).

### Prohibited patterns

- Running substantive tests before documenting what item is being inspected.
- Silently continuing past an identity mismatch.
