# C03 — Product Identity & Requirements

Canonical ADRs: **005 (includes 041), 012, 042, 043, 044, 045, 046, 047, 048**.

These decisions establish *what* is being inspected and the requirements/protocol it is
judged against.

---

## ADR-005 — Product Identity (includes ADR-041 sequencing rule)

**Status:** LOCKED

### Decision
Capture serial numbers, photographs, distinctive characteristics and other identifiers
whenever available, to create a **product identity record**.

### Example
```
Inspection #8472
Product:   iPhone 15 Pro
Serial:    XXXXXXXXXXXX
Color:     Natural Titanium
Condition: Used
Observed:  Minor scratch on rear frame
Accessories: Phone + charger
Evidence:  17 photos, 2 videos, 1 live inspection
```
The system does not merely say "iPhone verified"; it says "this particular physical object
was observed and documented."

### ADR-041 — identity is established **before** inspection (folded in)
The verifier should establish which physical item is being inspected **before** performing
substantive tests. There is little value in proving an item satisfies requirements if the
inspected item cannot be reliably connected to the item being purchased.

### Accepted risk
Some products have no unique identifiers.

### Mitigation
Use multiple visual characteristics and packaging evidence.

---

## ADR-042 — Identity Mismatch Is a Blocking Event

**Status:** LOCKED

### Decision
If the physical product does not match the identity associated with the transaction, the
inspection must not silently continue.

### Example
- Expected serial: `ABC123`
- Observed serial: `XYZ789`
- Result: `IDENTITY_MISMATCH`

Require an explicit resolution. Possible outcomes: `STOP_INSPECTION`,
`SELLER_CORRECTION`, `BUYER_APPROVAL`, `REINSPECTION`, `DISPUTE`.

### Reason
Identity is foundational to all subsequent evidence.

---

## ADR-012 — Inspection Requirements Are First-Class Data

**Status:** LOCKED

### Decision
Store the buyer's inspection requirements as structured data, not only inside chat.

### Example
```
InspectionRequirement
  product_id
  requirement_id
  description
  test_method
  expected_result
  required_evidence
  priority

Requirement: Battery health
Test:        Open OS battery-health screen
Expected:    >= 80%
Evidence:    Screenshot
Result:      82%
Status:      PASS
```
This lets the platform compare what the buyer requested vs. what the verifier tested vs.
what the verifier observed.

---

## ADR-043 — Inspection Protocols Should Be Versioned

**Status:** LOCKED

### Decision
Record the exact inspection protocol (with version) used for each transaction.

### Example
```
Protocol:      Laptop Basic Inspection
Version:       3.2
Requirements:  12
Created:       2026-08-01
```
If the procedure changes later, historical inspections still reference the procedure
actually used.

---

## ADR-044 — Requirements Should Be Frozen Before Inspection

**Status:** LOCKED

### Decision
Once an inspection starts, the original buyer requirements must not silently change.

- Original requirement set remains.
- A new requirement creates a new version or inspection scope (`Requirement Set v2`).

### Reason
Otherwise the system could make it appear the verifier failed to test something that was
not originally requested.

---

## ADR-045 — Requirement Changes Must Be Auditable

**Status:** LOCKED

### Decision
Every requirement change records: who changed it; what changed; when; why; and whether it
requires additional inspection.

### Example
```
14:00 Buyer requests: Battery >= 80%
14:15 Inspection begins.
14:30 Buyer adds: Original charger must be included.
Result: Additional requirement created.
        Inspection status: PARTIALLY_COMPLETED
```
Requirements are part of the transaction's evidence chain.

---

## ADR-046 — Verification Instructions Should Be Deterministic

**Status:** LOCKED

### Decision
Inspection instructions should minimize subjective interpretation.

- "Inspect the screen under normal indoor lighting from ~50 cm and record visible cracks,
  chips or dead pixels."
- "Open the operating-system battery-health screen and record the reported maximum
  capacity."

### Trade-off
Highly detailed procedures take longer to create and maintain.

---

## ADR-047 — The Platform Should Support Procedure Templates

**Status:** LOCKED

### Decision
Reusable inspection procedure templates per common product category:

Smartphone Basic · Laptop Basic · Used Camera · Bicycle · Vehicle Visual.

Each template contains: required identity checks; required tests; optional tests; evidence
requirements; safety warnings; completion criteria.

### Reason
Improves consistency without manually defining every inspection from scratch.

---

## ADR-048 — Templates Must Not Pretend to Cover Every Product

**Status:** LOCKED

### Decision
Templates must explicitly define their scope.

"Laptop Basic Inspection" ≠ full hardware diagnostic. "Vehicle Visual Inspection" ≠
mechanical safety certification. The system must communicate exactly what the protocol
covers.
