# Douala Trust — Architecture Decision Records

Series of ADRs for the **product verification platform** (a trust & evidence layer for
physical transactions where the buyer cannot directly inspect the product).

## Coverage

| Range | Status |
|---|---|
| ADR-001 – ADR-100 | Present in the source material |
| ADR-101 – ADR-131 | Present (events, messaging & audit block) — category C13 |
| ADR-132 – ADR-141 | Present in the source material |

## Canonical ADR files

The ADRs are de-duplicated and grouped by **domain category** (the classification). Each
category file contains the canonical decision record.

| Category | File | ADRs |
|---|---|---|
| Trust model & product philosophy | `C01-core-trust-model.md` | 001, 009, 016, 018, 026, 051, 052, 053, 054, 096 |
| Responsibilities & actors | `C02-responsibilities-actors.md` | 003, 004, 027, 028, 029, 030, 049, 050 |
| Product identity & requirements | `C03-product-identity-requirements.md` | 005, 012, 041, 042, 043, 044, 045, 046, 047, 048 |
| Inspection & verification process | `C04-inspection-verification.md` | 002, 006, 007, 008, 017, 019, 020, 021, 025, 057 |
| Evidence | `C05-evidence.md` | 013, 014, 015, 034, 035, 038, 039, 040, 055, 056, 060, 061, 062, 093, 094, 095, 097 |
| Custody & chain of custody | `C06-custody.md` | 010, 011 |
| Disputes | `C07-disputes.md` | 022, 023, 024, 080, 081, 082, 083, 084, 085, 086 |
| State & lifecycle | `C08-state-lifecycle.md` | 063, 064, 065, 066, 067, 068, 069 |
| Concurrency, consistency & events | `C09-transitions-events.md` | 036, 037, 070, 071, 072, 073, 074, 075, 076, 077, 078, 079, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141 |
| Events, messaging & audit | `C13-events-messaging-audit.md` | 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131 |
| Authorization, security & privacy | `C10-auth-security-privacy.md` | 032, 033, 089, 090, 091, 092 |
| AI & automation | `C11-ai-automation.md` | 058, 059 |
| Time semantics | `C12-time.md` | 098, 099, 100 |

> Merged duplicates: ADR-072 (folded into 073), ADR-090 (merged with 032).

---

## Classification — domain taxonomy

Every ADR maps to a single **domain category** and a **decision status**, plus an **MVP
readiness bucket** (see below).

### Category legend

- **TM** — Trust model & product philosophy
- **RA** — Responsibilities & actors
- **PI** — Product identity & requirements
- **IV** — Inspection & verification process
- **EV** — Evidence
- **CU** — Custody & chain of custody
- **DS** — Disputes
- **SL** — State & lifecycle
- **CC** — Concurrency, consistency & events
- **EM** — Events, messaging & audit
- **AS** — Authorization, security & privacy
- **AI** — AI & automation
- **TZ** — Time semantics

### Status legend

- **LOCKED** — accepted; API/behaviour contract
- **PROPOSED** — needs technical validation or later review

### Master index

| ADR | Title | Cat | Status | MVP bucket |
|---|---|---|---|---|
| 001 | Independent verification | TM | LOCKED | INVARIANT |
| 002 | Buyer–verifier communication | IV | LOCKED | INVARIANT |
| 003 | Separation of responsibilities | RA | LOCKED | INVARIANT |
| 004 | Verifier does not own/custody product | RA | LOCKED | INVARIANT |
| 005 | Product identity | PI | LOCKED | INVARIANT |
| 006 | Guided verification | IV | LOCKED | INVARIANT |
| 007 | Expert escalation | IV | LOCKED | MANUAL |
| 008 | Inspection economics | IV | LOCKED | POLICY |
| 009 | Evidence over verdicts | TM | LOCKED | INVARIANT |
| 010 | Chain of custody | CU | LOCKED | MANUAL |
| 011 | Tamper evidence (not prevention) | CU | LOCKED | MANUAL |
| 012 | Inspection requirements are first-class data | PI | LOCKED | INVARIANT |
| 013 | Every result must have evidence | EV | LOCKED | INVARIANT |
| 014 | Reports immutable after submission | EV | LOCKED | INVARIANT |
| 015 | Evidence append-only | EV | LOCKED | GUARD |
| 016 | Observation vs interpretation | TM | LOCKED | INVARIANT |
| 017 | Inspection status explicit | IV | LOCKED | INVARIANT |
| 018 | "Verified" must be scoped | TM | LOCKED | INVARIANT |
| 019 | Verification has a timestamp | IV | LOCKED | INVARIANT |
| 020 | Inspection validity window | IV | LOCKED | GUARD |
| 021 | Buyer approval separate from verification | IV | LOCKED | INVARIANT |
| 022 | Seller sees/responds to discrepancies | DS | LOCKED | GUARD |
| 023 | Disputes evidence-driven | DS | LOCKED | MANUAL |
| 024 | Dispute resolution separate concern | DS | LOCKED | MANUAL |
| 025 | Support partial verification | IV | LOCKED | INVARIANT |
| 026 | Not all attributes verifiable remotely | TM | LOCKED | INVARIANT |
| 027 | Verification capability declared | RA | LOCKED | GUARD |
| 028 | Verifier training part of product | RA | LOCKED | MANUAL |
| 029 | Verifiers may refuse unsafe tasks | RA | LOCKED | INVARIANT |
| 030 | Minimize physical handling | RA | LOCKED | GUARD |
| 031 | Privacy part of evidence design | AS | LOCKED | INVARIANT |
| 032 | Evidence access role-based | AS | LOCKED | INVARIANT |
| 033 | Location evidence proportional | AS | LOCKED | GUARD |
| 034 | Record who created each evidence item | EV | LOCKED | **DUP → 097** |
| 035 | Evidence integrity-protected (hash) | EV | PROPOSED | GUARD |
| 036 | Avoid blockchain | CC | LOCKED | GUARD |
| 037 | Event sourcing is a strong fit | CC | PROPOSED | GUARD |
| 038 | Evidence storage separated | EV | LOCKED | GUARD |
| 039 | Evidence retention explicit | EV | LOCKED | GUARD |
| 040 | Evidence deletion auditable | EV | LOCKED | GUARD |
| 041 | Product identity before inspection | PI | LOCKED | INVARIANT |
| 042 | Identity mismatch is blocking | PI | LOCKED | INVARIANT |
| 043 | Inspection protocols versioned | PI | LOCKED | GUARD |
| 044 | Requirements frozen before inspection | PI | LOCKED | INVARIANT |
| 045 | Requirement changes auditable | PI | LOCKED | GUARD |
| 046 | Verification instructions deterministic | PI | LOCKED | GUARD |
| 047 | Procedure templates | PI | LOCKED | MANUAL |
| 048 | Templates scoped | PI | LOCKED | INVARIANT |
| 049 | Expert verification separate capability | RA | LOCKED | MANUAL |
| 050 | Verification qualifications traceable | RA | LOCKED | MANUAL |
| 051 | Platform verification ≠ professional certification | TM | LOCKED | INVARIANT |
| 052 | Fail ≠ product defective | TM | LOCKED | INVARIANT |
| 053 | Inconclusive is first-class | TM | LOCKED | INVARIANT |
| 054 | Not tested ≠ failed | TM | LOCKED | INVARIANT |
| 055 | Evidence required per requirement | EV | LOCKED | INVARIANT |
| 056 | Evidence quality validated | EV | LOCKED | GUARD |
| 057 | Automated checks assist, don't replace | IV | LOCKED | FUTURE |
| 058 | AI observations clearly identified | AI | LOCKED | FUTURE |
| 059 | AI must not invent evidence | AI | LOCKED | FUTURE |
| 060 | Buyer can inspect evidence package | EV | LOCKED | INVARIANT |
| 061 | Evidence presentation follows requirements | EV | LOCKED | GUARD |
| 062 | Original evidence accessible | EV | LOCKED | INVARIANT |
| 063 | Transaction & inspection state separate | SL | LOCKED | INVARIANT |
| 064 | Payment state separate from verification | SL | LOCKED | INVARIANT |
| 065 | Completion does not auto-release funds | SL | LOCKED | GUARD |
| 066 | Buyer timeout rules explicit | SL | LOCKED | GUARD |
| 067 | Timeout ≠ acceptance | SL | LOCKED | GUARD |
| 068 | Every transition has an actor | SL | LOCKED | GUARD |
| 069 | System events distinguishable | SL | LOCKED | GUARD |
| 070 | Idempotency for critical events | CC | LOCKED | **DUP → 073** |
| 071 | Critical transitions atomic | CC | LOCKED | **DUP → 137** |
| 072 | External side effects reconciled | CC | LOCKED | **(merged into 073/075)** |
| 073 | Idempotency key per critical request | CC | LOCKED | GUARD |
| 074 | Idempotency retention explicit | CC | LOCKED | FUTURE |
| 075 | Concurrent actions conflict rules | CC | LOCKED | GUARD |
| 076 | Mutable records versioned | CC | LOCKED | GUARD |
| 077 | Historical facts immutable | CC | LOCKED | INVARIANT |
| 078 | Corrections preserve original | CC | LOCKED | GUARD |
| 079 | Corrections don't rewrite events | CC | LOCKED | GUARD |
| 080 | Dispute preserves pre-dispute state | DS | LOCKED | GUARD |
| 081 | Dispute is a separate lifecycle | DS | LOCKED | MANUAL |
| 082 | Dispute claims explicit | DS | LOCKED | MANUAL |
| 083 | Dispute evidence linked to claim | DS | LOCKED | MANUAL |
| 084 | Both parties can give evidence | DS | LOCKED | MANUAL |
| 085 | Dispute decisions explainable | DS | LOCKED | MANUAL |
| 086 | Dispute resolution doesn't rewrite inspection | DS | LOCKED | GUARD |
| 087 | Manual overrides require reason | SL | LOCKED | GUARD |
| 088 | Privileged actions more auditable | SL | LOCKED | GUARD |
| 089 | Authorization at time of action | AS | LOCKED | GUARD |
| 090 | Evidence access least-privilege | AS | LOCKED | **(merged into 032)** |
| 091 | Evidence access auditable | AS | LOCKED | GUARD |
| 092 | Evidence URLs not permanent public links | AS | LOCKED | INVARIANT |
| 093 | Sensitive data minimized in evidence | EV | LOCKED | INVARIANT |
| 094 | PII redacted | EV | LOCKED | GUARD |
| 095 | Evidence integrity verifiable | EV | PROPOSED | GUARD |
| 096 | Hashes don't prove truth | TM | LOCKED | INVARIANT |
| 097 | Evidence provenance captured | EV | LOCKED | INVARIANT |
| 098 | Timestamps have explicit meaning | TZ | LOCKED | INVARIANT |
| 099 | Server time is canonical | TZ | LOCKED | INVARIANT |
| 100 | Time stored canonically (UTC) | TZ | LOCKED | INVARIANT |
| 101 | Event ordering not solely timestamps | EM | LOCKED | GUARD |
| 102 | Events are meaningful domain facts | EM | LOCKED | GUARD |
| 103 | Events are past-tense facts | EM | LOCKED | GUARD |
| 104 | Commands and events separate | EM | LOCKED | GUARD |
| 105 | Events contain stable identifiers | EM | LOCKED | INVARIANT |
| 106 | Events have unique IDs | EM | LOCKED | INVARIANT |
| 107 | Event consumers idempotent | EM | LOCKED | GUARD |
| 108 | Event schemas versioned | EM | LOCKED | FUTURE |
| 109 | Events not modified for schema evolution | EM | LOCKED | GUARD |
| 110 | Consumers tolerate unknown fields | EM | LOCKED | FUTURE |
| 111 | Critical changes produce domain events | EM | LOCKED | INVARIANT |
| 112 | Not every DB change becomes an event | EM | LOCKED | GUARD |
| 113 | Transactional outbox | EM | LOCKED | FUTURE |
| 114 | Outbox records retryable | EM | LOCKED | FUTURE |
| 115 | Failed delivery doesn't block primary | EM | LOCKED | FUTURE |
| 116 | Dead-letter handling | EM | LOCKED | FUTURE |
| 117 | Dead-letter operational ownership | EM | LOCKED | FUTURE |
| 118 | Events carry correlation info | EM | LOCKED | GUARD |
| 119 | Tracing IDs ≠ business identifiers | EM | LOCKED | GUARD |
| 120 | Audit records ≠ domain events | EM | LOCKED | GUARD |
| 121 | Audit records append-only | EM | LOCKED | GUARD |
| 122 | Audit logs record actor identity + type | EM | LOCKED | GUARD |
| 123 | System actions have explicit actor type | EM | LOCKED | GUARD |
| 124 | Automated decisions record trigger | EM | LOCKED | GUARD |
| 125 | Business rules identifiable | EM | LOCKED | GUARD |
| 126 | Policy changes not retroactive | EM | LOCKED | GUARD |
| 127 | Policy version captured with decisions | EM | LOCKED | GUARD |
| 128 | Requirement versions preserved | EM | LOCKED | INVARIANT |
| 129 | Evaluations reference requirement version | EM | LOCKED | INVARIANT |
| 130 | Derived state reconstructable | EM | LOCKED | FUTURE |
| 131 | Derived state not sole source of truth | EM | LOCKED | GUARD |
| 132 | Projections rebuildable | CC | LOCKED | FUTURE |
| 133 | Projection lag explicitly accepted | CC | LOCKED | FUTURE |
| 134 | Critical decisions use authoritative state | CC | LOCKED | GUARD |
| 135 | Transitions validated against current state | CC | LOCKED | GUARD |
| 136 | Invalid transitions explicitly rejected | CC | LOCKED | GUARD |
| 137 | State transitions atomic | CC | LOCKED | GUARD |
| 138 | Concurrency control for critical transitions | CC | LOCKED | GUARD |
| 139 | Optimistic concurrency preferred | CC | LOCKED | GUARD |
| 140 | Business retries must not bypass validation | CC | LOCKED | GUARD |
| 141 | Idempotency vs state validation | CC | LOCKED | GUARD |

> **DUP → N** marks an ADR that is effectively a duplicate of another; its content is
> folded into the canonical ADR `N` and it is not written as a separate canonical record.
> The canonical files use the surviving number.

---

## Duplication & overlap analysis

The source material (received in batches) contains genuine **redundancy**. The following
are the clusters to resolve before treating the set as canonical. These are flagged rather
than silently merged, so you can decide which to keep:

### Exact / near-exact duplicates (fold into one)

| Cluster | ADRs | Canonical | Action |
|---|---|---|---|
| Product identity | 005 ↔ 041 | 005 | 005 = principle; 041 = "before inspection" sequencing. Merge 041 into 005 as the sequencing rule. |
| Idempotency requirement | 070 ↔ 073 | 073 | Both: critical ops need idempotency keys. 070 is redundant with 073. |
| Atomic transitions | 071 ↔ 137 | 137 | Near-identical wording. Keep one (137, newer & more explicit). |
| Evidence provenance | 034 ↔ 097 | 097 | 034 ("who created each item") is subsumed by 097 (full provenance). |
| Evidence integrity (hash) | 035 ↔ 095 | 095 | Both: content hash for integrity. 035 flagged PROPOSED; 095 expresses it fully. |
| Role-based vs least-privilege access | 032 ↔ 090 | 032 | 090 restates 032 as "least-privilege". Merge. |
| Scope of "verified" | 018 ↔ 051 | 018 + 051 | 018 concerns scoping the claim; 051 distinguishes platform vs professional certification. Complementary — keep both but note overlap. |
| Outcome semantics | 052 ↔ 053 ↔ 054 | 052, 053, 054 | Related but distinct (fail ≠ defective; inconclusive is first-class; not-tested ≠ failed). Keep all three; they are one conceptual family. |

### Overlapping clusters (related, keep together, note ties)
- **Immutability family:** 014 (reports immutable) · 015 (evidence append-only) · 077
  (historical facts immutable) · 078 (corrections preserve original) · 079 (corrections
  don't rewrite events). One underlying principle: *history is immutable, corrections are
  new records.*
- **Dispute immutability:** 080 (preserve pre-dispute state) · 086 (resolution doesn't
  rewrite inspection results) — same principle applied at dispute boundaries.
- **State-transition family:** 135 (validate against current state) · 136 (reject invalid)
  · 138 (concurrency control) · 139 (optimistic preferred) · 140 (retries revalidate) ·
  141 (idempotency vs validation) · 137 (atomic). Form **one coherent concurrency +
  transition policy**; keep distinct but cross-reference.
- **Actor/audit family:** 068 (every transition has an actor) · 069 (system events
  distinguishable) · 087 (manual overrides need reason) · 088 (privileged actions more
  auditable). All about accountability of who/what caused a change.
- **AI family:** 057 · 058 · 059. One policy: *automation/AI assist but remain
  identifiable and must not fabricate evidence.*
- **State separation family:** 063 (transaction vs inspection) · 064 (payment vs
  verification) · 065 (completion ≠ release). One principle: *independent state machines
  per concern.*
- **Evidence access family:** 031 (privacy) · 032/090 (role-based/least-privilege) · 091
  (access auditable) · 092 (no permanent public links) · 093 (minimize sensitive data) ·
  094 (redact PII). One coherent evidence-privacy policy.
- **Provenance/integrity family:** 095 (integrity verifiable) · 096 (hash ≠ truth) · 097
  (provenance). 096 is the essential caveat to 095/097.
- **Projection / derived-state family:** 130 (derived reconstructable) · 131 (derived not
  sole source) · 132 (rebuildable) · 133 (lag accepted) · 134 (authoritative state).
  Post-MVP infrastructure positions. 130/131 are the bridge from the events block into
  the projection ADRs.
- **Event semantics family (101–113):** 101 (ordering) · 102 (domain facts) · 103
  (past-tense) · 104 (commands vs events) · 111 (changes produce events) · 112 (not every DB
  change) · 113 (outbox) · 137 (atomic). One coherent event/history model. 113 references
  ADR-137's outbox mitigation.
- **Event identity / idempotency family:** 105 (stable ids) · 106 (unique event ids) · 107
  (consumers idempotent) · 070→073 · 141. Distinct but reinforcing.
- **Messaging reliability family (113–117):** outbox · retryable · don't block primary ·
  dead-letter · dead-letter ownership.
- **Audit family (120–124):** audit ≠ domain events · append-only · actor identity+type ·
  system actor type · automated-decision trigger. Extends the earlier actor/audit family
  (068/069/087/088) to infrastructure-grade audit.
- **Policy/requirement versioning family (125–129 + 043/044/045):** rules identifiable ·
  policy not retroactive · policy version captured · requirement versions preserved ·
  evaluations reference version. Ties into the requirements-frozen decisions (C03).
- **Correlation/tracing family:** 118 (correlation) · 119 (tracing vs business ids).

### Numbering / notes

- **ADR-106 (mentioned in chat as "evidence ≠ truth")** — this is captured by **096**.
- **101–131** were supplied as a single block and are canonical records in `C13`
  (ADR-128/129 on requirement versions also tie back to C03 mapping, but are filed once in
  C13 to keep the block together).
- **ADR-072** (external side effects reconciled) is closely tied to 073 (idempotency key)
  and 075 (conflict rules); kept in `C09` near them.

---

## MVP-readiness classification

Uses the three buckets recommended in the design analysis. These are **not** quality
scores; they are scoping buckets to guide what the first MVP implements now vs. later.

### A. MVP invariants — build from day one (define the product/trust model)

001, 002, 003, 004, 005, 006, 009, 012, 013, 014, 016, 017, 018, 019, 021, 025, 026,
029, 031, 032, 041, 042, 044, 048, 051, 052, 053, 054, 055, 060, 062, 063, 064, 077,
092, 093, 096, 097, 098, 099, 100, 105, 106, 111, 128, 129

### B. MVP operational safeguards — implement simply, no big infrastructure

015, 020, 027, 030, 033, 035, 036, 037, 038, 039, 040, 043, 045, 046, 056, 061, 065,
066, 067, 068, 069, 073, 075, 076, 078, 079, 080, 086, 087, 088, 089, 091, 094, 095,
101, 102, 103, 104, 107, 109, 112, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 131,
134, 135, 136, 137, 138, 139, 140, 141

### C. Manual / policy (allow, don't automate in MVP)

007, 010, 011, 028, 047, 049, 050, 081, 082, 083, 084, 085

### D. Post-MVP architecture — anticipate, do not implement

008 (economics = product policy, iterated later), 022, 023, 024, 057, 058, 059, 074, 108,
110, 113, 114, 115, 116, 117, 130, 132, 133

---

*Classification maintained in `docs/adr/`. One page per domain category + this index.*
