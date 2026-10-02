# Douala Trust — MVP Epics

> Trust & evidence layer for remote physical transactions: a buyer in **Yaoundé** purchases a
> product located in **Douala**. An independent local verifier inspects it and produces an
> evidence package; the buyer reviews it and decides. The platform does **not** guarantee the
> product — it records *what was required, what was observed, what evidence exists, who
> observed it, when, and what happened afterward.*

**Parent goal:** `GOAL-mvp-trust-transaction` — Prove a remote buyer can act on verifier evidence (Must-have)

**Goal success criteria**
- [ ] A real Yaoundé buyer can create a verification request with concrete requirements for a real product located in Douala.
- [ ] A Douala verifier can inspect the product, confirm its identity, and capture evidence for each requirement (PASS / FAIL / INCONCLUSIVE / NOT_TESTED).
- [ ] The buyer can review the scoped evidence package and record a decision (ACCEPT / REJECT / REQUEST_MORE_EVIDENCE).
- [ ] The platform runs at least 3 pilot transactions and captures buyer willingness to use and pay for the service.

**Out of MVP scope:** live video, payments / Mobile Money settlement, disputes, marketplace features.

## Epic overview

| # | Epic | Actor | User story | Requirements | Priority |
|---|------|-------|------------|--------------|----------|
| 1 | Verification Request | Buyer | `US-request-verification` | `REQ-F-create-verification-request`, `REQ-F-requirements-first-class` | Must-have |
| 2 | Inspection & Evidence Capture | Verifier | `US-perform-inspection` | `REQ-F-product-identity`, `REQ-F-capture-evidence`, `REQ-F-inspection-results`, `REQ-USA-mobile-verifier` | Must-have |
| 3 | Evidence Review & Buyer Decision | Buyer | `US-review-evidence` | `REQ-F-review-evidence` (+ consumes `REQ-F-inspection-results`) | Must-have |
| 4 | Evidence Access Security | Platform | `US-review-evidence` | `REQ-SEC-evidence-access` | Must-have |

---

## Epic 1 — Verification Request

**User story (`US-request-verification`)**
**As a** buyer, **I want** to create a verification request for a product located in Douala with my inspection requirements, **so that** an independent local verifier can check the product against what I actually care about.

**Story acceptance criteria**
- [ ] Given a real product in Douala, when I create a request, then I can describe the product, its location, and 5–10 concrete inspection requirements stored as structured data (ADR-012).
- [ ] Given requirements are set, when an inspection starts, then they are frozen and any change creates a new version rather than rewriting (ADR-044).

### `REQ-F-create-verification-request` — Buyer creates a verification request
A buyer can create a verification request for a physical product in Douala they cannot inspect themselves. The request identifies the product (description, location, optional identifiers) and the buyer's inspection requirements (ADR-001, ADR-012).

- [ ] **AC-request-product-detail** — Buyer can record product description, location and optional identifiers.
- [ ] **AC-request-assign-verifier** — An independent verifier is assigned who does not control the sale or custody (ADR-003/004).
- [ ] **AC-request-list** — Buyer sees their requests with current state, assigned verifier and inspection status.

### `REQ-F-requirements-first-class` — Requirements are structured, frozen data
Requirements are stored as structured data, not only in chat. They are frozen before inspection; changes create new versions (ADR-012, ADR-044, ADR-045, ADR-128/129).

- [ ] **AC-req-structured** — Each requirement carries `description`, `expected_result`, `test_method`, `required_evidence`.
- [ ] **AC-req-frozen** — Once an inspection starts, a change creates a new version; the original set is preserved (ADR-044).
- [ ] **AC-req-versioned** — Each evaluation references the exact requirement version applied (ADR-129).

**Constraints:** `CON-mvp-scope` (single transaction, not a marketplace), `CON-separate-responsibilities` (buyer specifies, verifier inspects).
**Assumptions:** `ASM-yaounde-douala-market` (High risk, unverified).

---

## Epic 2 — Inspection & Evidence Capture

**User story (`US-perform-inspection`)**
**As a** verifier, **I want** a guided, scoped inspection task that documents product identity and captures evidence per requirement, **so that** I produce trustworthy observations without having to guarantee or transport the product.

**Story acceptance criteria**
- [ ] Given an assigned inspection, when I start, then I first confirm product identity and any mismatch is a blocking event (ADR-005/041/042).
- [ ] Given each requirement, when I test it, then I record an observation, evidence and a result of PASS / FAIL / INCONCLUSIVE / NOT_TESTED (ADR-013/052/053/054).
- [ ] Given I must not take custody, when the inspection is done, then I observe → test → document and submit an immutable report (ADR-004/014).

### `REQ-F-product-identity` — Product identity established and verified
Before substantive tests, the verifier establishes which physical item is inspected (serial, IMEI, model, distinctive marks) with photo evidence. A mismatch blocks the inspection (ADR-005, ADR-041, ADR-042, ADR-018).

- [ ] **AC-identity-established** — Identity is established and evidenced before substantive testing.
- [ ] **AC-identity-mismatch-blocking** — A mismatch blocks the inspection with an explicit resolution outcome.
- [ ] **AC-identity-evidenced** — Identifiers are recorded with evidence (e.g. photo of serial) and provenance.

### `REQ-F-capture-evidence` — Evidence capture is append-only and provenanced
Photos/videos/observations are captured per requirement with provenance and an integrity hash. Evidence is append-only (ADR-013, ADR-015, ADR-038, ADR-095, ADR-097).

- [ ] **AC-evidence-per-requirement** — Evidence is linked to its requirement and required artifacts are present (ADR-055).
- [ ] **AC-evidence-provenance** — Each item carries creator, timestamp, type, related requirement/product/inspection.
- [ ] **AC-evidence-append-only** — Additions/corrections are new records, never overwrites (ADR-014/015/077).
- [ ] **AC-evidence-integrity** — Content hash is verifiable so alteration is detectable (ADR-095; integrity ≠ truth, ADR-096).

### `REQ-F-inspection-results` — Explicit outcome semantics per requirement
Each requirement gets PASS / FAIL / INCONCLUSIVE / NOT_TESTED. FAIL = requirement not satisfied (not "product defective"); INCONCLUSIVE is first-class; NOT_TESTED ≠ FAIL (ADR-009, ADR-052/053/054).

- [ ] **AC-result-set** — Result is one of PASS / FAIL / INCONCLUSIVE / NOT_TESTED.
- [ ] **AC-result-evidenced** — Result carries observation, evidence reference, verifier and timestamp.
- [ ] **AC-result-not-defective** — FAIL is expressed as requirement-not-satisfied.
- [ ] **AC-report-immutable** — Corrections create a new report version; the original remains (ADR-014/079).

### `REQ-USA-mobile-verifier` — Guided, low-friction mobile workflow *(Should-have)*
Mobile-first PWA, guided, and usable on variable Douala mobile data (ADR-006, ADR-027, ADR-029, ADR-046).

- [ ] **AC-guided-flow** — Deterministic, step-by-step instructions per requirement.
- [ ] **AC-media-efficient** — Media compressed before upload to sizes viable on Cameroonian mobile data.
- [ ] **AC-can-refuse** — Verifier can STOP / ESCALATE / mark INCONCLUSIVE an unsafe or unanswerable task without penalty.

**Constraints:** `CON-verification-not-certification`, `CON-mvp-scope` (evidence in object storage referenced by DB, ADR-038).
**Assumptions:** `ASM-cameroon-mobile-android` (Medium risk).

---

## Epic 3 — Evidence Review & Buyer Decision

**User story (`US-review-evidence`)**
**As a** buyer, **I want** to review a scoped evidence package that answers what was checked, observed, and not tested, **so that** I can decide whether to proceed without over-inferring beyond the evidence.

**Story acceptance criteria**
- [ ] Given a completed inspection, when I open the package, then I see requirements organized with result, observation and evidence, plus access to original artifacts (ADR-060/061/062).
- [ ] Given the claim "verified", when I read it, then it is scoped to what was actually verified (ADR-018), never a bare guarantee.
- [ ] Given I have decided, then my decision is recorded separately from verification (ADR-021) as ACCEPT / REJECT / REQUEST_MORE_EVIDENCE.

### `REQ-F-review-evidence` — Buyer reviews the package and decides
After inspection, the buyer reviews a requirement-organized evidence package and records a decision separate from verification (ADR-060/061/062, ADR-021, ADR-063).

- [ ] **AC-package-scoped** — Each requirement shows result, observation and evidence, with a clearly scoped claim.
- [ ] **AC-original-accessible** — Original evidence artifacts remain accessible behind any summary.
- [ ] **AC-decision-separate** — Decision is ACCEPT / REJECT / REQUEST_MORE_EVIDENCE, modeled separately from verification.

Also displays the outcomes defined by `REQ-F-inspection-results` (Epic 2).

**Assumptions:** `ASM-mobile-money` — payment/settlement is out of MVP scope (ADR-065/067 deferred).

---

## Epic 4 — Evidence Access Security

### `REQ-SEC-evidence-access` — Role-based, least-privilege evidence access
Buyers see their transaction's evidence, verifiers see evidence for assigned inspections only; no permanent public URLs — short-lived signed/authenticated access (ADR-031/032, ADR-090, ADR-092).

- [ ] **AC-role-based-access** — Participants only access evidence within their role and transaction context.
- [ ] **AC-no-public-links** — Evidence links are short-lived/authenticated, never permanent public URLs.
- [ ] **AC-minimize-pii** — Redaction is supported and unneeded PII is not retained (ADR-093/094).

---

### Status notes
- Requirements: 6 Approved (`REQ-F-*`), 2 Draft (`REQ-SEC-evidence-access`, `REQ-USA-mobile-verifier`).
- Goal and user stories: Draft.
- Components: `buyer-app` (Epics 1, 3), `verifier-app` (Epic 2), `api` (all epics).
- Task breakdown not yet created (`/SDLC-implementation-plan` pending).
