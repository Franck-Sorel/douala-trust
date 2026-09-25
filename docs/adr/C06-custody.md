# C06 — Custody & Chain of Custody

Canonical ADRs: **010, 011**.

These decisions track where the product is and where responsibility changes — important for
answering "where did the uncertainty enter?"

---

## ADR-010 — Chain of Custody

**Status:** LOCKED

### Decision
Represent custody transitions as explicit platform events.

### Example
```
PRODUCT_REGISTERED
  → INSPECTION_STARTED
  → INSPECTION_COMPLETED
  → PRODUCT_IDENTIFIED
  → PACKAGE_CREATED
  → PACKAGE_SEALED
  → HANDOFF_TO_TRANSPORTER
  → TRANSPORT_STARTED
  → TRANSPORT_COMPLETED
  → BUYER_RECEIVED
  → BUYER_CONFIRMED
```
This becomes the backbone of the architecture and lets the platform determine where
responsibility changed and where product uncertainty may have been introduced.

### Trade-off
More operational steps and event tracking.

### Accepted risk
Users may fail to complete a handoff correctly.

### Mitigation
Require confirmation from both parties where practical and flag incomplete custody
transitions.

> Responsibility follows custody. The verifier is not responsible merely because they
> inspected; a transport actor who accepts custody assumes responsibility from that point.

---

## ADR-011 — Tamper Evidence Rather Than Tamper Prevention

**Status:** LOCKED IN PRINCIPLE

### Decision
Use tamper-evident packaging/seals at appropriate handoff points.

### Reason
It is unrealistic to guarantee nobody can access a package during transport.

### Trade-off
A seal does not prevent sophisticated tampering.

### Accepted risk
A seal can be removed and potentially replaced.

### Mitigation — record
seal ID; package ID; photos of the seal; time of sealing; person responsible; handoff
event; condition of the seal at receipt.

**Objective:** not "nobody can open this package", but "if the package was opened, there
is evidence that the custody state changed."
