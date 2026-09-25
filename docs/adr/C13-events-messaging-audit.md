# C13 — Events, Messaging & Audit

Canonical ADRs: **101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131**.

This is the previously-missing block that turns the platform into a **historical /
evented** system: how domain events are modeled, published, evolved, consumed, traced, and
audited, and how policy/requirement versions and derived state stay explainable.

> Related: this block is the companion to C09 (transitions & concurrency) and to the
> audit/actor family in C08 (068/069/087/088). ADR-128/129 touch requirements and should be
> read with C03.

---

## A. Event semantics

### ADR-101 — Event Ordering Should Not Rely Solely on Timestamps

**Status:** LOCKED

Use explicit sequencing mechanisms where ordering matters (`event_sequence`,
`revision`, `version`, `causal_reference`). Two events can share a timestamp, and
distributed systems may process events in an order different from their creation time.

Mitigation: sequence numbers, entity versions, explicit causal references where ordering
affects business decisions.

---

### ADR-102 — Business Events Should Represent Meaningful Domain Facts

**Status:** LOCKED

Prefer `PaymentReleased`, `InspectionCompleted`, `DisputeOpened`, `RequirementChanged`,
`EvidenceSubmitted` over implementation events such as `PaymentRowUpdated`,
`DatabaseRecordChanged`, `HTTPRequestReceived`.

Business events are easier to understand, audit and consume across boundaries. Define
events around business capabilities and lifecycle transitions, not database mutations.

---

### ADR-103 — Events Should Be Past-Tense Facts

**Status:** LOCKED

Events describe something that has already happened: `PaymentReleased`,
`InspectionSubmitted`, `DisputeOpened`, `EvidenceUploaded`, `TransactionCancelled` — not
commands (`ReleasePayment`, `SubmitInspection`, `OpenDispute`). Commands represent intent;
events represent facts.

---

### ADR-104 — Commands and Events Should Be Separate Concepts

**Status:** LOCKED

```
Command: ReleasePayment
  → Validation → State transition → Event: PaymentReleased
```
A command may fail; an event represents a completed domain fact. This makes failure
handling, auditing and integration behavior easier to reason about.

---

## B. Event identity & ids

### ADR-105 — Events Should Contain Stable Identifiers

**Status:** LOCKED

Events contain stable identifiers for the entities they describe.
```
{ "event_type": "PaymentReleased", "transaction_id": "TX-18291",
  "payment_id": "PAY-7712", "event_id": "EVT-99182" }
```
Consumers should not infer entity identity from mutable attributes (names, emails,
descriptions).

---

### ADR-106 — Events Should Have Unique Event IDs

**Status:** LOCKED

Every persisted event has a unique `event_id` (e.g. `EVT-918273`) so consumers can detect
duplicates and keep processing idempotent. Consumers must keep some processed-event state
where duplicate detection is required.

---

### ADR-107 — Event Consumers Must Be Idempotent

**Status:** LOCKED

Processing the same event more than once must not create an incorrect outcome (a double
`PaymentReleased` must not release funds twice). Delivery may be at-least-once; retries and
redelivery are normal. Mitigate with event IDs, idempotency records, unique constraints and
state-transition validation.

---

## C. Schema evolution

### ADR-108 — Event Schemas Should Be Versioned

**Status:** LOCKED

Persisted and externally consumed schemas support explicit versioning (`PaymentReleased.v1`,
`PaymentReleased.v2`, or a `schema_version` field). Producers and consumers deploy
independently, and multiple versions may need to coexist.

---

### ADR-109 — Existing Events Should Not Be Modified for Schema Evolution

**Status:** LOCKED

Once persisted/published, a historical event representation is not modified. Evolve via new
fields, new versions, translation layers, or upcasters. Historical events may be required
for audit and reconstruction.

---

### ADR-110 — Event Consumers Should Tolerate Unknown Fields

**Status:** LOCKED

Consumers ignore fields they do not understand unless those fields are required. If a
producer adds `currency`, an older consumer that does not understand it still processes the
event when it's not required. Supports backward-compatible evolution.

---

## D. Event generation policy

### ADR-111 — Critical State Changes Should Produce Domain Events

**Status:** LOCKED

Important lifecycle transitions generate explicit events (`TransactionCreated`,
`InspectionStarted`, `InspectionCompleted`, `PaymentHeld`, `PaymentReleased`,
`DisputeOpened`, `DisputeResolved`, `TransactionCancelled`). Events provide explicit history
and let downstream systems react without coupling to internal DB tables.

---

### ADR-112 — Not Every Database Change Should Become an Event

**Status:** LOCKED

Do not auto-publish an event for every DB mutation (`updated_at`, internal cache metadata,
query-optimization fields, retry counters). Publishing everything creates coupling and
noise. The event model represents meaningful business facts.

---

## E. Transactional outbox

### ADR-113 — Event Publication Should Use a Transactional Outbox

**Status:** LOCKED

When a DB transaction changes business state and must publish an event, write the event to a
transactional outbox in the **same** transaction, then a publisher forwards to the broker.
Prevents committing state while losing the event on a failure between DB commit and message
publication.

---

### ADR-114 — Outbox Records Should Be Retryable

**Status:** LOCKED

Failed publications stay retryable (`OUTBOX_PENDING → PUBLISHING → PUBLISHED`, failure →
`RETRY_REQUIRED`). Use retry counters, exponential backoff, dead-letter handling and
operational alerts so temporary failures do not permanently lose events.

---

### ADR-115 — Failed Event Delivery Should Not Block the Primary Transaction Indefinitely

**Status:** LOCKED

The primary transaction does not stay open waiting on downstream consumers. Long-running
distributed transactions increase lock duration and reduce availability. Downstream systems
observe the change asynchronously (short period where projections lag).

---

## F. Dead-letter handling

### ADR-116 — Critical Event Processing Should Support Dead-Letter Handling

**Status:** LOCKED

Events that repeatedly fail processing move to a controlled dead-letter mechanism rather
than retrying forever. Retain `event_id`, `event_type`, `failure_reason`, `attempt_count`,
`first_failure_at`, `last_failure_at`, `consumer`.

---

### ADR-117 — Dead-Letter Events Require Operational Ownership

**Status:** LOCKED

A dead-letter queue must not become a permanent silent graveyard. Each critical category has
an operational owner and remediation process — an unconsumed `PaymentReleased` may represent
an incomplete business operation requiring investigation.

---

## G. Correlation & tracing

### ADR-118 — Events Should Carry Correlation Information

**Status:** LOCKED

Events carry correlation identifiers (`correlation_id: TX-18291`, `request_id: REQ-88291`,
`event_id: EVT-19281`) so related operations can be traced across services.

---

### ADR-119 — Distributed Tracing IDs Should Not Replace Business Identifiers

**Status:** LOCKED

Technical `trace_id` complements (not replaces) business `transaction_id`. A trace ID
explains a technical execution path; a transaction ID identifies the business operation.
They serve different purposes and may have different retention.

---

## H. Audit

### ADR-120 — Audit Records and Domain Events Serve Different Purposes

**Status:** LOCKED

Domain event (`PaymentReleased`) describes a business fact; audit record
(`Actor: Admin V-17 · Action: RELEASE_PAYMENT · Target: PAY-18291 · Reason: ...`) explains
accountability, authorization and actor behavior. An event should not be assumed to contain
all audit-investigation information.

---

### ADR-121 — Audit Records Should Be Append-Only

**Status:** LOCKED

Audit records are append-only; corrections create new records rather than modifying the
original entry. The audit trail must remain trustworthy and reconstructable.

---

### ADR-122 — Audit Logs Should Record Actor Identity and Actor Type

**Status:** LOCKED

An audit record identifies both who acted and their actor type (`actor_id: USR-1827`,
`actor_type: BUYER`, or `ADM-17 / ADMINISTRATOR`). Different categories have different
authorization and accountability implications.

---

### ADR-123 — System-Generated Actions Must Have an Explicit Actor Type

**Status:** LOCKED

Automated actions identify the initiating system (`actor_type: SYSTEM`,
`actor_id: payment-reconciliation-service`) rather than pretending to be human. Distinguish
human from automated action during investigations.

---

### ADR-124 — Automated Decisions Should Record Their Trigger

**Status:** LOCKED

When automation changes a critical state, record what triggered the decision.
```
Action: PAYMENT_RELEASED · Actor: SYSTEM · Trigger: InspectionCompleted
Rule: AUTO_RELEASE_AFTER_PASS · Timestamp: ...
```
Users/operators must understand why an automated transition occurred.

---

## I. Policies, rules & versions

### ADR-125 — Business Rules Should Be Identifiable

**Status:** LOCKED

When a critical automated decision depends on a business rule, record the rule/policy and
version (`policy: PAYMENT_RELEASE_POLICY · version: 3 · decision: RELEASE`). Months later,
an investigation can determine which rule version produced a decision.

---

### ADR-126 — Policy Changes Should Not Retroactively Rewrite Historical Decisions

**Status:** LOCKED

Changing a policy does not silently change decisions already made under the previous policy.
A transaction created and completed under `Policy v2` remains evaluated under `Policy v2`
even after `v3`. Historical decisions must stay explainable under the rules that existed
when made.

---

### ADR-127 — Policy Version Should Be Captured With Critical Decisions

**Status:** LOCKED

Record the policy version used for a critical decision
(`decision: PAYMENT_RELEASED · policy: PAYMENT_RELEASE_POLICY · policy_version: 3`).
Without it, reproducing historical decisions becomes hard after rules change.

---

### ADR-128 — Requirement Versions Must Be Preserved

**Status:** LOCKED

Requirements applied to a completed lifecycle stage are immutable. `Requirement v1 (Battery
≥ 80%)` then `v2 (≥ 85%)` — a completed inspection against v1 retains its relationship to
v1. Changing requirements after an inspection could make historical results look incorrect
even though they were valid under the requirements in effect.

---

### ADR-129 — Evaluations Should Reference the Exact Requirement Version

**Status:** LOCKED

An evaluation references the exact requirement version:
```
inspection: INS-1827 · requirement: REQ-BATTERY · requirement_version: 4 ·
observed_value: 82% · result: PASS
```
Makes historical evaluation reproducible and prevents ambiguity as requirements evolve.

---

## J. Derived state

### ADR-130 — Derived State Should Be Reconstructable From Authoritative Data

**Status:** LOCKED

Important derived state is reconstructable from authoritative records. A `DISPUTED`
transaction status should be explainable through `DisputeOpened` and the lifecycle. Provide a
mechanism to detect and repair inconsistencies when derived state is corrupted or stale.

---

### ADR-131 — Cached and Derived State Must Not Become the Sole Source of Truth

**Status:** LOCKED

Caches, search indexes, materialized views and projections are not authoritative for
critical transactional facts. A search index showing `payment_status = RELEASED` does not
override the authoritative payment record. Derived systems can lag behind or become
unavailable.

> Bridges into ADR-132 (projections rebuildable), 133 (projection lag) and 134 (critical
> decisions use authoritative state) in C09.
