# C04 — Inspection & Verification Process

Canonical ADRs: **002, 006, 007, 008, 017, 019, 020, 021, 025, 057**.

These decisions govern how an inspection is run, its states, and how human/automated
verification fits together.

---

## ADR-002 — Buyer and Verifier Can Communicate

**Status:** LOCKED

### Decision
The buyer and verifier can communicate directly.

### Supported channels
text; photos; videos; images; voice/video calls; inspection instructions; clarification
questions; scheduling; test instructions.

### Reason
A predefined checklist cannot anticipate every situation.

### Example
- Buyer: "Please check whether the laptop's USB-C port works."
- Verifier: "There are two USB-C ports. Which one should I test?"

### Trade-off
More communication complexity.

### Risk
The buyer could influence the verifier improperly or overwhelm them.

### Mitigation
All important inspection requirements become structured records; loaner can also schedule
a live inspection (see ADR-002 companion in the analysis: buyer/verifier live scheduling —
captured under communication scope).

---

## ADR-006 — Guided Verification

**Status:** LOCKED

### Decision
Use structured checklists rather than relying entirely on verifier expertise.

### Reason
Scales local verification.

### Trade-off
Generic checklists cannot capture every specialized product.

### Mitigation
Allow buyer-specific requirements and live assistance.

---

## ADR-007 — Expert Escalation

**Status:** LOCKED

### Decision
Create an escalation path: local verifier → remote expert → professional inspector.

### Reason
Some products require specialized knowledge.

### Trade-off
Higher cost.

### Accepted risk
Not every transaction can be verified cheaply.

> Level model: Level 1 Basic · Level 2 Guided · Level 3 Assisted (live buyer) · Level 4
> Expert. Live buyer assistance acts as a safety valve (non-expert verifier + buyer
> expertise).

---

## ADR-008 — Inspection Economics

**Status:** LOCKED (business principle)

### Decision
Inspection is optional and economically justified primarily for sufficiently
valuable/risky transactions.

### Reason
Inspection has a cost. Expected-loss-avoided must exceed inspection cost.

### Trade-off
Low-value transactions receive less protection.

### Accepted risk
Some users will choose not to inspect and suffer losses.

### Tiering
Basic (no inspection) / Verified (standard inspection) / Premium (expert or professional
service).

---

## ADR-017 — Inspection Status Must Be Explicit

**Status:** LOCKED

### Decision
Avoid a single binary `VERIFIED / NOT VERIFIED`. Use a richer state model.

### States
`DRAFT`, `SCHEDULED`, `IN_PROGRESS`, `PARTIALLY_COMPLETED`, `COMPLETED`,
`FAILED_REQUIREMENTS`, `INCONCLUSIVE`, `CANCELLED`, `DISPUTED`, `EXPIRED`.

---

## ADR-019 — Verification Has a Timestamp

**Status:** LOCKED

### Decision
Every inspection result has a clear submitted timestamp.

### Reason
A product's condition changes. Battery health of 82% on September 10 does not mean 82%
forever. "No visible damage at inspection" does not mean it cannot be damaged later. An
inspection is a **point-in-time observation**.

---

## ADR-020 — Inspection Has a Defined Validity Window

**Status:** LOCKED

### Decision
An inspection optionally has a validity period depending on product and transaction.

### Example
Inspected Monday 10:00, shipped same day 14:00 — meaningfully different from shipping
three weeks later. Communicate "Inspected at [time]" rather than implying permanent
certification. For high-risk products, require shipment within a defined window.

---

## ADR-021 — Buyer Approval Is Separate From Verification

**Status:** LOCKED

### Decision
Inspection completion does not automatically equal buyer acceptance.

Lifecycle: Seller claim → Buyer requirements → Inspection → Evidence → Buyer review →
Buyer decision.

Possible buyer decisions: `ACCEPT`, `REJECT`, `REQUEST_MORE_EVIDENCE`,
`REQUEST_REINSPECTION`, `DISPUTE`.

This maintains the distinction between "product matches the inspection requirements" and
"buyer wants to complete the transaction."

---

## ADR-025 — The Platform Should Support Partial Verification

**Status:** LOCKED

### Decision
A transaction should not be all-or-nothing.

### Example
```
Product identity:  VERIFIED
Physical condition: VERIFIED
Power-on:          VERIFIED
Battery:           VERIFIED
Wi-Fi:             NOT_TESTED
Water resistance:  NOT_VERIFIED
Authenticity:      NOT_VERIFIED
```
More honest and more useful than "100% verified."

---

## ADR-057 — Automated Checks Assist But Do Not Replace Verification

**Status:** LOCKED

### Decision
Automation may assist with: OCR; serial-number extraction; image quality checks; duplicate
detection; metadata validation; requirement matching; missing-evidence detection; anomaly
detection.

Automated output must remain distinguishable from human observation.

### Example
- Human observation: "Serial number appears to be ABC123."
- Automated OCR: "Detected text: ABC123."
- Final verified value: ABC123.

### Reason
Automation reduces operational cost while preserving human accountability for tasks
requiring judgment.
