# C09 — Concurrency, Consistency & Events

Canonical ADRs: **036, 037, 072, 073 (includes 070), 074, 075, 076, 077, 078, 079, 132,
133, 134, 135, 136, 137 (includes 071), 138, 139, 140, 141**.

These decisions establish a coherent **history + transition + concurrency** policy so the
platform can answer *what happened, who did it, when, and under which rule*.

---

## ADR-036 — Avoid Blockchain Unless It Solves a Specific Problem

**Status:** LOCKED

### Decision
Do not introduce blockchain merely because there is a chain of custody.

### Important properties
immutability; auditability; provenance; access control; tamper detection.

These can usually be delivered with conventional databases, append-only event logs,
cryptographic hashes and controlled access. Blockchain is justified only when a concrete
multi-party trust requirement cannot be solved otherwise.

---

## ADR-037 — Event Sourcing Is a Strong Architectural Fit

**Status:** PROPOSED

### Decision
The transaction can be modeled as a sequence of immutable events.

### Example
```
TransactionCreated → SellerClaimSubmitted → BuyerRequirementsSubmitted →
InspectionRequested → VerifierAssigned → InspectionStarted → EvidenceAdded →
RequirementTested → InspectionCompleted → PackageCreated → PackageSealed →
TransporterAccepted → TransportStarted → BuyerReceived → BuyerConfirmed
```
Current state is derived from the event history. Strong audit trail.

### Trade-off
The MVP does not necessarily need a full event-sourcing architecture; a conventional
relational DB with append-only transaction events may suffice initially.

---

## ADR-072 — External Side Effects Must Be Reconciled

**Status:** LOCKED

### Decision
When a critical operation affects an external system, keep enough information to determine
whether the external operation actually succeeded.

### Example
```
Internal state: PAYMENT_RELEASE_REQUESTED
External provider: UNKNOWN
```
Do not assume `UNKNOWN` means `FAILED`; reconcile to determine actual external state.

### Reason
Network failures can occur after the provider processes a request but before the platform
receives the response.

### Accepted risk
A temporary period where the final state cannot be determined.

### Mitigation
Provider transaction IDs, idempotency keys, periodic reconciliation, manual intervention
for unresolved cases.

---

## ADR-070 / ADR-073 — Idempotency Key for Every Critical Request

**Status:** LOCKED (ADR-070 folded into 073)

### Decision
Operations that can create financial, transactional or lifecycle side effects must accept
an idempotency key.

### Example
```
POST /payments/release
Idempotency-Key: REQ-88291
```
Repeated requests with the same key return the original result rather than creating a
second operation. (ADR-070: critical events such as payment release, inspection
submission, package handoff, delivery confirmation and dispute creation must be idempotent
so a double-submit does not create two releases or contradictory transitions.)

### Reason
Retries are normal in distributed systems; clients, networks and brokers may retry.

---

## ADR-074 — Idempotency Records Should Have Explicit Retention

**Status:** LOCKED

### Decision
Idempotency keys/results need not be retained forever; define retention per operation.

### Example
```
Payment release:   30 days
Inspection submit: 7 days
Evidence upload:   24 hours
```
Retain longer than the expected retry window.

### Accepted risk
A retry after expiry may be treated as new.

### Mitigation
Choose periods according to operational characteristics and financial risk.

---

## ADR-075 — Concurrent Actions Must Have Defined Conflict Rules

**Status:** LOCKED

### Decision
Define what happens when two actors attempt conflicting actions at approximately the same
time.

### Example
Buyer `ACCEPT_TRANSACTION` and Verifier `SUBMIT_INSPECTION_CORRECTION` arrive
simultaneously. Apply a deterministic ordering and conflict policy.

Possible outcomes: `FIRST_WRITE_WINS`, `VERSION_CONFLICT`, `STATE_TRANSITION_REJECTED`,
`REQUIRES_REVIEW`.

### Accepted risk
Some concurrent actions will not succeed on the first attempt.

### Mitigation
Optimistic concurrency control, version numbers, explicit transition rules.

---

## ADR-076 — Mutable Records Should Use Versioning for Concurrency Control

**Status:** LOCKED

### Decision
Important mutable entities contain a version/revision number.

### Example
```
Inspection version: 7
Client submits update against: 7
Current version: 8 → update rejected or reconciled
```
Prevents stale clients from silently overwriting newer state.

### Example
A buyer updates the requirement set; the verifier submits an inspection based on an older
requirement version. The system detects the conflict.

---

## ADR-077 — Historical Facts Should Be Immutable

**Status:** LOCKED

### Decision
Once an event is part of the historical record, the original event is not overwritten.

### Example
Do not change `Battery observed: 82%` to `78%`. Record a correction/new observation
instead:
```
Observation #1  82%  created 14:00
Correction      78%  created 14:15
```

### Trade-off
Immutable histories need more storage and more complex data models.

### Accepted risk
Some records may contain errors.

### Mitigation
Explicit correction, supersession and voiding mechanisms instead of destructive edits.

---

## ADR-078 — Corrections Must Preserve the Original Value

**Status:** LOCKED

### Decision
When corrected, the original value remains available to authorized auditors.

### Example
```
Original: 82%
Corrected: 78%
Reason:    Incorrect measurement method
Show: original value / corrected value / correction actor / correction time / reason
```

### Reason
Silently replacing the original would weaken the evidence history.

---

## ADR-079 — Corrections Should Not Rewrite Previous Events

**Status:** LOCKED

### Decision
Corrections are new events, not modifications to historical events.

### Example
```
ObservationRecorded → ObservationCorrected → InspectionReportUpdated
```
An audit trail answers both "what is the current value?" and "what happened previously?"

---

## ADR-132 — Projections Should Be Rebuildable

**Status:** LOCKED

### Decision
Materialized views, search indexes and other derived projections must be rebuildable from
authoritative transactional data and/or persisted domain events.

### Reason
Derived state may become corrupted, incomplete or unavailable (defects, infrastructure
failures, deployment changes). Provide a mechanism to reconstruct it without manual
editing.

### Trade-off
Rebuilding requires additional processing capacity and sufficiently complete historical
data.

### Accepted risk
Large projections may take significant time to rebuild.

### Mitigation
Support incremental rebuilding; full rebuilds; checkpointing; replay from a defined event
position; monitoring of rebuild progress.

---

## ADR-133 — Projection Lag Should Be Explicitly Accepted

**Status:** LOCKED

### Decision
Consumers of asynchronously maintained projections assume projections may temporarily lag
the authoritative transactional state.

### Reason
Events and projection updates may be processed asynchronously; a reporting/search
projection may briefly show previous state.

### Mitigation
Where freshness matters, expose: projection timestamp; event sequence; last processed
version; synchronization status.

---

## ADR-134 — Critical Decisions Must Use Authoritative State

**Status:** LOCKED

### Decision
Critical business decisions must use authoritative transactional state, not stale caches,
search indexes or eventually consistent projections.

### Example
Authoritative payment `RELEASED` vs cached payment `HELD` — a release/hold decision must
not rely on the cached value.

### Trade-off
May require an additional read from the authoritative data source (slightly higher
latency).

### Mitigation
Identify authoritative sources; prevent critical decision paths from depending exclusively
on derived state.

---

## ADR-135 — State Transitions Should Be Validated Against the Current State

**Status:** LOCKED

### Decision
Validate that the entity is currently in a state from which the requested transition is
valid.

### Example
`HELD → RELEASED` valid. `CANCELLED → RELEASED` invalid unless supported by the domain
model.

### Reason
Distributed retries and concurrent requests can retry the same transition or deliver them
out of order.

### Mitigation
Define explicit state machines / transition rules for critical lifecycle entities.

---

## ADR-136 — Invalid State Transitions Should Be Explicitly Rejected

**Status:** LOCKED

### Decision
Reject state transitions that violate lifecycle rules.

### Example
```
Transaction: CANCELLED
Command:     ReleasePayment
Result:      REJECTED
Reason:      INVALID_STATE_TRANSITION
```

### Reason
Silently accepting invalid transitions corrupts business state and complicates
reconciliation.

---

## ADR-071 / ADR-137 — State Transitions Should Be Atomic

**Status:** LOCKED (ADR-071 folded into 137)

### Decision
A business state transition and the authoritative record of that transition are committed
atomically.

### Example
```
BEGIN
Transaction.status = COMPLETED
Insert TransactionCompleted event
COMMIT
```
Avoid a state where the entity indicates a transition but the historical record is missing.

### Trade-off
Atomicity may constrain distribution across independently owned systems.

### Mitigation
Transactional boundaries within a service; transactional outbox across service
boundaries.

---

## ADR-138 — Concurrency Control Is Required for Critical State Transitions

**Status:** LOCKED

### Decision
Use an explicit concurrency-control mechanism for critical transitions.

Possible mechanisms: optimistic locking; entity versions; compare-and-swap; database
constraints; serialized processing.

### Reason
Two concurrent operations (e.g. Request A: Release payment; Request B: Cancel
transaction) may read the same previous state before either commits.

### Example
```
version = 7
UPDATE ... WHERE id = X AND version = 7
version = 8
```
If another request already moved it to version 8, the second update fails instead of
silently overwriting.

---

## ADR-139 — Optimistic Concurrency Should Be Preferred Where Appropriate

**Status:** LOCKED

### Decision
Where contention is expected to be relatively low, prefer optimistic concurrency control
over long-lived DB locks.

### Reason
Long-lived locks reduce throughput and increase deadlock risk. Optimistic concurrency lets
transactions proceed independently and detects conflicts at commit time.

### Trade-off
Applications must handle conflicts and may need to retry or return an explicit conflict
response.

---

## ADR-140 — Business Retries Must Not Bypass Validation

**Status:** LOCKED

### Decision
Retries of failed commands/messages must execute the same relevant validation rules as the
original attempt; a retry must not assume state is unchanged.

### Reason
The entity may have changed between attempts (e.g. a payment-release retry while the
transaction was cancelled).

---

## ADR-141 — Idempotency and State Validation Solve Different Problems

**Status:** LOCKED

### Decision
Use **both** idempotency and state-transition validation; neither substitutes for the
other.

### Reason
- Idempotency answers: "Have I already processed this request/event?"
- State validation answers: "Is this operation valid given the entity's current state?"

### Example
`event_id = EVT-100` may already be processed; but a new event `EVT-101 PaymentReleased`
may still be invalid if payment was already cancelled.

### Conclusion
Use **Idempotency + concurrency control + state-transition validation** for critical
state-changing operations.
