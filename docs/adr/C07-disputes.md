# C07 — Disputes

Canonical ADRs: **022, 023, 024, 080, 081, 082, 083, 084, 085, 086**.

These decisions keep disputes separate from verification and evidence-driven. The verifier
produces evidence; the dispute process consumes it.

---

## ADR-022 — Seller Should See and Respond to Discrepancies

**Status:** LOCKED

### Decision
The seller has an opportunity to respond to documented discrepancies.

### Example
```
Verifier: "Battery health is 72%."
Seller:   "That is expected for a used device."
Buyer:    "I require minimum 80%."
```
Preserve all three facts. Do not silently transform a seller explanation into a verifier
correction.

---

## ADR-023 — Disputes Should Be Evidence-Driven

**Status:** LOCKED

### Decision
A dispute references original transaction evidence rather than relying only on user
narratives.

### Useful evidence
buyer requirements; seller claims; inspection results; photos; videos; serial numbers;
timestamps; custody events; seal records; transport handoffs; delivery confirmation; buyer
receipt inspection; relevant communications.

This creates a **transaction evidence package**.

---

## ADR-024 — Dispute Resolution Is a Separate System Concern

**Status:** LOCKED

### Decision
The inspection system produces evidence; dispute resolution consumes it. Prevents the
verifier from becoming inspector + judge + arbitrator.

- Verifier reports: "What I observed."
- Dispute process determines: "How should the disagreement be resolved?"

---

## ADR-080 — Disputes Should Preserve the Pre-Dispute State

**Status:** LOCKED

### Decision
When a transaction enters dispute, preserve the state and evidence that existed
immediately before.

### Example
```
Transaction: INSPECTION_COMPLETED
Buyer:       DISPUTE_OPENED
```
The dispute references the inspection result, requirements and evidence as they existed at
open time.

### Reason
Otherwise later modifications make it difficult to establish what was actually being
disputed.

---

## ADR-081 — Disputes Are a Separate Lifecycle

**Status:** LOCKED

### Decision
Disputes have their own state machine, not just a boolean flag.

### Example
```
DISPUTE_OPENED → EVIDENCE_COLLECTION → UNDER_REVIEW → DECISION_REQUIRED → RESOLVED
```
Terminal states: `RESOLVED_BUYER`, `RESOLVED_SELLER`, `RESOLVED_SHARED`,
`RESOLVED_NO_ACTION`, `ESCALATED`.

---

## ADR-082 — Dispute Claims Must Be Explicit

**Status:** LOCKED

### Decision
A dispute identifies the specific claim being challenged.

### Example
```
Requirement: Battery >= 80%
Inspection result: 82%
Buyer claim: Observed battery result is incorrect.
```
Instead of "Product is not as expected."

### Reason
Explicit claims let the platform determine which evidence and requirements are relevant.

---

## ADR-083 — Dispute Evidence Should Be Linked to the Disputed Claim

**Status:** LOCKED

### Decision
Dispute evidence identifies what it is intended to establish.

### Example
```
Claim: Battery capacity below requirement.
Evidence: battery_health_screenshot.png
Evidence type: BUYER_EVIDENCE
Related requirement: REQ-BATTERY-01
```

---

## ADR-084 — Both Parties Should Have an Opportunity to Provide Evidence

**Status:** LOCKED

### Decision
Where appropriate, let relevant participants submit evidence, distinguishing the source.

### Example
Buyer: delivery photographs. Seller: pre-shipment photographs. Verifier: inspection
evidence.

### Reason
Disputes may involve facts not observable during the original inspection.

---

## ADR-085 — Dispute Decisions Should Be Explainable

**Status:** LOCKED

### Decision
A resolution records the basis for the decision.

### Example
```
Decision: PARTIAL_REFUND
Reason:   Battery requirement was not satisfied.
Supporting evidence: Inspection #1827, Buyer evidence #B-882, Seller evidence #S-114
```
The decision must not exist only as `status = resolved`.

---

## ADR-086 — Dispute Resolution Should Not Rewrite Inspection Results

**Status:** LOCKED

### Decision
Resolving a dispute must not silently change the original inspection result.

### Example
```
Original inspection: Battery 82% PASS
Later dispute: buyer evidence shows 74%
Preserve: original inspection 82% + dispute finding 74%
```
The system may determine a transaction resolution without rewriting the historical
inspection. Inspection findings and dispute findings are different facts at different
times.
