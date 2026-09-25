# C02 — Responsibilities & Actors

Canonical ADRs: **003, 004, 027, 028, 029, 030, 049, 050**.

These decisions define who does what, and the boundaries that keep roles independent.

---

## ADR-003 — Separation of Responsibilities

**Status:** LOCKED — CORE ARCHITECTURAL PRINCIPLE

### Decision
Do not allow one participant to control inspection, possession, transportation and
financial settlement simultaneously.

### Reason
A single actor controlling verification + possession + transportation + payment + final
approval creates enormous opportunity for collusion or theft.

### Responsibility matrix
| Responsibility | Actor |
|---|---|
| Owns/sells product | Seller |
| Specifies desired outcome | Buyer |
| Physically inspects | Verifier |
| Controls payment | Platform / financial mechanism |
| Transports | Transport/logistics actor |
| Receives product | Buyer |
| Resolves disputes | Platform |

**Principle:** No single participant should be able to manipulate the entire transaction.

### Trade-off
More operational actors.

### Accepted risk
Collusion between multiple actors remains possible.

### Mitigation
Independent evidence and traceability.

---

## ADR-004 — Verifier Does Not Own / Custody the Product

**Status:** LOCKED

### Decision
The verifier normally inspects the product at its existing location and does not take
custody or become the transporter.

### Reason
If the verifier takes possession: theft risk increases; damage liability complicates;
substitution becomes possible; insurance complicates; transport responsibility becomes
ambiguous; and the verifier becomes part of the logistics chain.

Default protocol: **Observe → Test → Document → Return** (not Collect → Transport →
Store → Inspect → Deliver).

### Trade-off
Some logistics become harder.

### Accepted risk
The product can still be damaged or substituted after inspection.

### Mitigation
Packaging, sealing, product identity and custody events.

---

## ADR-027 — Verification Capability Must Be Declared

**Status:** LOCKED

### Decision
Every verifier should have an explicit **capability profile**.

### Example
```
Verifier V-1827
Capabilities:
  Basic electronics   ✓
  Smartphones         ✓
  Laptops             ✓
  Vehicles            ✗
  Industrial machinery ✗
  Laboratory testing   ✗
```
This allows the platform to match jobs to appropriate verifiers.

---

## ADR-028 — Verifier Training Is Part of the Product

**Status:** LOCKED

### Decision
The platform must not assume a new user automatically knows how to inspect.

### Training covers
evidence collection; photography; serial-number capture; following test instructions;
handling products; privacy; safety; fraud prevention; chain-of-custody procedures; when to
stop an inspection; when to escalate to an expert.

The platform is therefore also a **verification-protocol delivery system**, not just a
marketplace for people.

---

## ADR-029 — Verifiers Must Be Allowed to Refuse Unsafe Tasks

**Status:** LOCKED

### Decision
A verifier can stop an inspection when the task creates unacceptable risk.

### Example triggers
electrical hazards; dangerous machinery; unknown chemicals; unsafe locations; aggressive
animals; suspicious circumstances; requests to bypass safety procedures.

### Outcomes
Provide `STOP_INSPECTION` and `ESCALATE`. The verifier must never be incentivized to take
unsafe actions merely to complete a job.

---

## ADR-030 — The Platform Should Minimize Physical Handling

**Status:** LOCKED

### Decision
The verifier should handle the product only as much as necessary to perform the agreed
inspection.

### Reason
Every physical interaction creates risk of damage, loss, misplacement, accidental
activation, contamination and dispute.

---

## ADR-049 — Expert Verification Is a Separate Capability

**Status:** LOCKED

### Decision
Support escalation from a general verifier to an expert; do not encourage general-purpose
verifiers to make claims beyond their competence.

### Example
- General verifier: physical condition inspection.
- Issue detected: possible structural repair.
- Escalation: certified specialist.
- Specialist result: structural assessment.

---

## ADR-050 — Verification Qualifications Should Be Traceable

**Status:** LOCKED

### Decision
Where verification requires qualifications, record the relevant verifier credentials.

### Example
```
Verifier:     V-1827
Qualification: Certified Watchmaker
Credential:   CRED-8812
Verified:     2026-06-14
Expiry:       2028-06-14
```
The system must distinguish "Verifier performed an inspection" from "Qualified specialist
performed an inspection."
