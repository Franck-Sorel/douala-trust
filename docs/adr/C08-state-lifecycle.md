# C08 — State & Lifecycle

Canonical ADRs: **063, 064, 065, 066, 067, 068, 069, 087, 088**.

These decisions keep business concerns in **independent state machines** and make every
state change attributable.

---

## ADR-063 — Transaction State and Inspection State Are Separate

**Status:** LOCKED

### Decision
The transaction lifecycle and inspection lifecycle are **not** one state machine.

- **Transaction:** CREATED · PAYMENT_PENDING · INSPECTION · SHIPPING · DELIVERED ·
  COMPLETED · DISPUTED · CANCELLED
- **Inspection:** REQUESTED · ASSIGNED · IN_PROGRESS · COMPLETED · INCONCLUSIVE · DISPUTED

A transaction may be `SHIPPING` while an inspection is `COMPLETED`, or `DELIVERED` while a
post-delivery inspection is `IN_PROGRESS`. Separating them prevents contradictory
lifecycle logic.

---

## ADR-064 — Payment State Should Be Separate From Verification State

**Status:** LOCKED

### Decision
Do not encode payment state into inspection state.

### Example
```
Inspection: COMPLETED
Payment:    HELD
```
These are independent facts.

### Reason
A completed inspection does not mean payment should immediately be released.

---

## ADR-065 — Inspection Completion Does Not Automatically Release Funds

**Status:** LOCKED

### Decision
Define explicit conditions for funds release.

Possible conditions: inspection completed; buyer review completed; buyer acceptance;
delivery confirmed; inspection window expired; dispute resolved. The release policy may
differ by transaction type.

### Reason
Prevents accidental coupling between evidence collection and financial settlement.

---

## ADR-066 — Buyer Timeout Rules Must Be Explicit

**Status:** LOCKED

### Decision
If the buyer does not respond after receiving an inspection report, have an explicit
timeout policy.

### Example
```
Inspection completed: Monday 10:00
Buyer review period:  24 hours
No response:          SYSTEM_TIMEOUT_REVIEW
```
Clearly communicate what happens next.

### Reason
A transaction cannot remain indefinitely blocked by one inactive participant.

---

## ADR-067 — Timeout Must Never Be Presented as Evidence of Acceptance

**Status:** LOCKED

### Decision
A timeout is recorded as `BUYER_NO_RESPONSE`, not `BUYER_ACCEPTED`, unless the contract
defines timeout as acceptance.

### Reason
Silence, acceptance, verification, delivery and payment are different events.

---

## ADR-068 — Every Important State Transition Has an Actor

**Status:** LOCKED

### Decision
Important transaction events identify who or what caused them.

### Example
```
InspectionCompleted  actor: Verifier V-1827
BuyerApproved        actor: Buyer U-912
PaymentReleased       actor: System
```
This makes the transaction history understandable.

---

## ADR-069 — System-Generated Events Must Be Distinguishable

**Status:** LOCKED

### Decision
Automatically created events are distinguishable from user-created ones.

### Example
```
actor_type: USER   →  BuyerAccepted
actor_type: SYSTEM →  InspectionExpired
```

### Reason
An audit trail should make clear whether a human explicitly acted or the system did so
automatically.

---

## ADR-087 — Manual Overrides Must Require a Reason

**Status:** LOCKED

### Decision
Any privileged user overriding a system decision must provide a reason.

### Example
```
System:  PAYMENT_HELD
Override: PAYMENT_RELEASED
Reason:  Court-authorized settlement
Actor:   Admin V-17
Timestamp: 2026-09-23T14:30Z
```
Manual overrides are exceptions to normal behavior and require extra accountability.

---

## ADR-088 — Privileged Actions Should Be More Auditable Than Normal Actions

**Status:** LOCKED

### Decision
Administrative/privileged operations produce enhanced audit records.

### Examples
changing retention policy; releasing funds manually; overriding an inspection result;
changing transaction ownership; deleting evidence; changing dispute outcomes.

### Audit record includes
actor; timestamp; action; target; previous state; new state; reason; authorization
context where applicable.

### Reason
Privileged actions can materially affect users and transaction outcomes.
