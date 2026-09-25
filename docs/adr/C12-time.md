# C12 — Time Semantics

Canonical ADRs: **098, 099, 100**.

These decisions make timestamps unambiguous and trustworthy.

---

## ADR-098 — Timestamps Must Have an Explicit Meaning

**Status:** LOCKED

### Decision
Distinguish between different types of timestamps.

### Examples
- `captured_at` — when evidence was captured.
- `uploaded_at` — when evidence reached the platform.
- `verified_at` — when a verifier reviewed it.
- `created_at` — when the DB record was created.
- `updated_at` — when metadata changed.

### Reason
A single generic timestamp can create misleading assumptions about when an observation
actually occurred.

---

## ADR-099 — Server Time Should Be the Canonical Transaction Time

**Status:** LOCKED

### Decision
Important transactional timestamps use server-side trusted time, not client-provided
clocks.

Client timestamps may be retained as metadata but are not authoritative for transaction
ordering.

### Reason
Device clocks can be incorrect, manipulated or configured in different time zones.

---

## ADR-100 — Time Should Be Stored in a Canonical Format

**Status:** LOCKED

### Decision
Store transactional timestamps in a canonical timezone-independent representation,
preferably UTC. User interfaces may display timestamps in the user's local time zone.

### Example
```
Stored:   2026-09-23T17:30:00Z
Displayed: 23 Sep 2026, 18:30 BST
```

### Reason
Distributed systems may involve users, services and external providers in different time
zones. A canonical representation prevents ambiguity when ordering events and
reconstructing transaction history.

### Trade-off
Users may need timezone conversion when reviewing historical events.

### Accepted risk
Historical records may appear with different local times depending on the viewer.

### Mitigation
Store UTC and include the relevant timezone when presenting timestamps to users.

> Combined with ADR-099 (server time is canonical). See also ADR-101 (event ordering should
> not rely solely on timestamps).
