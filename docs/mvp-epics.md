# Douala Trust — Epics for the First Release (Minimum Viable Product)

## What this document is

This document breaks the first release of Douala Trust into four large pieces of work,
called **epics**. Each epic describes one part of the product from the point of view of
the person who uses it, explains why that part matters, walks through how it works step by
step, and lists the conditions that must be true before the epic can be considered finished.

It is written to be read by anyone on the team — product, design, development, or a pilot
partner — without needing to know the project's internal vocabulary. Where the project
uses an internal reference identifier (for example, the name of the requirement file that
backs a section), it is shown in a separate "Reference identifier" line so that it can be
traced back to the source specification, but the text itself never depends on it. See the
[Glossary of reference identifiers](#glossary-of-reference-identifiers) at the end for an
explanation of how those identifiers are built.

## The problem Douala Trust solves

A person living in **Yaoundé** wants to buy a physical product — for example a used phone,
a laptop, or a generator — that is located in **Douala**, about 240 kilometres away. They
cannot travel to look at it themselves. Today they must either trust the seller's word and
photos, ask a friend or relative to look at it, or make the trip. All three options are
risky, slow, or expensive.

Douala Trust closes this gap. The buyer writes down exactly what they want checked. An
**independent verifier** who lives in Douala goes to see the product, checks each point
the buyer asked about, and records photos, videos and written observations as evidence. The
buyer then reviews that evidence from Yaoundé and decides whether to go ahead with the
purchase.

### What Douala Trust is — and what it is not

The platform does **not** guarantee that the product is good, authentic, or will keep
working. It is a **trust and evidence layer**: it records, in a way that cannot be quietly
changed afterwards,

- what the buyer asked to be checked,
- what the verifier actually observed,
- what evidence (photos, videos, notes) exists for each observation,
- who made each observation,
- when each observation was made, and
- what happened afterwards (for example, the buyer's decision).

This distinction matters legally and commercially: Douala Trust says "this is what an
independent person saw and recorded", never "we certify this product".

### The people involved

| Person | Where they are | What they do in the first release |
|--------|----------------|-----------------------------------|
| **Buyer** | Yaoundé | Describes the product and what must be checked, reviews the evidence, and decides whether to proceed. |
| **Verifier** | Douala | Goes to the product, confirms it is the right item, checks each point the buyer asked for, and records evidence. Has no stake in the sale. |
| **Seller** | Douala | Owns the product and lets the verifier inspect it. Does not use the platform directly in the first release. |
| **Platform (Douala Trust)** | — | Stores requests, evidence and decisions securely, assigns verifiers, and controls who can see what. |

## Goal of the first release

**Prove that a buyer in Yaoundé can make a real purchase decision based on evidence
collected by an independent verifier in Douala.** This is a must-have goal.

*Reference identifier:* [`GOAL-mvp-trust-transaction`](../1-spec/goals/GOAL-mvp-trust-transaction.md)

The first release is considered successful when all of the following are true:

- [ ] A real buyer in Yaoundé can create a verification request, with concrete points to
      check, for a real product located in Douala.
- [ ] A verifier in Douala can inspect that product, confirm it is the correct item, and
      record evidence for every point the buyer asked about — marking each point as
      **Passed**, **Failed**, **Inconclusive** or **Not tested**.
- [ ] The buyer can review the resulting evidence package and record a decision: **Accept**,
      **Reject**, or **Request more evidence**.
- [ ] At least three real pilot transactions have been completed, and for each one we have
      recorded whether the buyer would use the service again and whether they would pay
      for it.

### Deliberately left out of the first release

To keep the first release small enough to test the core idea quickly, the following are
**not** included. They may come later, but nothing in the first release should depend on
them:

- **Live video calls** between buyer and verifier during the inspection.
- **Payments**, including Mobile Money (MTN Mobile Money, Orange Money) and holding money
  until the buyer is satisfied. Payment between buyer and seller happens outside the
  platform for now.
- **Dispute handling** — a formal process for when the buyer and seller disagree.
- **Marketplace features** — browsing products, seller listings, ratings, and so on. The
  buyer already knows which product they want verified.
- **Transport and delivery** of the product from Douala to Yaoundé.

## Overview of the four epics

| Number | Epic | Main user | What it delivers | Priority |
|--------|------|-----------|------------------|----------|
| 1 | Creating a verification request | Buyer | The buyer describes the product and writes the list of points to be checked. The list is then locked so it cannot change silently during the inspection. | Must-have |
| 2 | Inspecting the product and capturing evidence | Verifier | The verifier confirms the product is the right one, checks each point, and records photos, videos and observations through a guided mobile workflow. | Must-have |
| 3 | Reviewing the evidence and recording the buyer's decision | Buyer | The buyer sees, point by point, what was checked, what was found and what was not tested, then records their decision. | Must-have |
| 4 | Keeping the evidence secure | Platform | Only the right people can see the evidence, links to photos and videos expire, and unnecessary personal information is not kept. | Must-have |

The epics follow the natural order of one transaction: the buyer asks (epic 1), the
verifier inspects (epic 2), the buyer decides (epic 3). Epic 4 runs across all three,
because evidence must be protected from the moment it is captured.

```
Buyer (Yaoundé)               Verifier (Douala)                Buyer (Yaoundé)
──────────────────            ──────────────────               ──────────────────
Epic 1                        Epic 2                           Epic 3
Describe the product   ──▶    Confirm it is the right   ──▶    Review evidence
List points to check          item, check each point,          point by point,
Lock the list                 record evidence, submit          Accept / Reject /
                              the report                       Request more evidence

                   Epic 4 — Evidence security applies throughout
```

---

## Epic 1 — Creating a verification request

### In one sentence

The buyer tells the platform which product they want checked, where it is, and exactly
what they want the verifier to look at — and that list is locked before the inspection
begins.

### Why this matters

Everything that follows depends on a clear, written list of what the buyer cares about.
If the buyer's wishes only exist in a chat conversation, the verifier may check the wrong
things, and nobody can later prove what was asked. If the list could be changed after the
inspection, a dishonest participant could rewrite the request to match the result. Making
the list structured and locked is what makes the final evidence meaningful.

### How it works, step by step

1. The buyer opens the buyer application and starts a new verification request.
2. They describe the product: what it is (for example "Samsung Galaxy S21, 128 gigabytes,
   black"), where in Douala it is located, and any identifying details they already know,
   such as a serial number.
3. They write between five and ten concrete points they want checked. For each point they
   state:
   - **what** should be checked (for example "battery health"),
   - **what result they expect** (for example "at least 80 percent"),
   - **how it should be tested** (for example "read from the phone's battery settings
     screen"), and
   - **what evidence they want** (for example "a photo of the battery settings screen").
4. The platform assigns an independent verifier in Douala — someone who is not the seller,
   does not hold the product on the seller's behalf, and has no interest in the sale.
5. When the verifier starts the inspection, the list of points is **locked**. If the buyer
   wants to change something afterwards, the platform creates a new version of the list
   and keeps the original unchanged, so it is always clear which version the verifier
   worked from.
6. At any time, the buyer can see a list of their requests, showing the current status of
   each one, the assigned verifier, and how far the inspection has progressed.

### User story

**As a** buyer in Yaoundé,
**I want** to create a verification request for a product located in Douala, including
the specific points I want inspected,
**so that** an independent local verifier checks the product against what I actually care
about, rather than against a generic checklist.

*Reference identifier:* [`US-request-verification`](../1-spec/user-stories/US-request-verification.md)

**This story is complete when:**

- [ ] For a real product in Douala, the buyer can describe the product, its location, and
      five to ten concrete inspection points, and these are stored as structured
      information rather than free text.
- [ ] Once the inspection has started, the points can no longer be edited in place; any
      change creates a new version and the original is preserved.

### Requirement 1.1 — The buyer can create a verification request

A buyer can create a verification request for a physical product in Douala that they
cannot inspect themselves. The request identifies the product (its description, its
location, and any optional identifying details) and contains the buyer's list of
inspection points.

*Reference identifier:* [`REQ-F-create-verification-request`](../1-spec/requirements/REQ-F-create-verification-request.md)
· *Based on architecture decision records 001 and 012*

**Acceptance criteria — this requirement is met when:**

- [ ] **Product details can be recorded.** The buyer can enter a description of the
      product, where it is located, and optional identifying details such as a serial
      number or model number.
      *(Reference identifier: `request-product-detail`)*
- [ ] **An independent verifier is assigned.** The verifier assigned to the request is
      someone who does not control the sale and does not hold the product on anyone's
      behalf. *(Reference identifier: `request-assign-verifier` · architecture decision
      records 003 and 004)*
- [ ] **The buyer can see their requests.** The buyer sees a list of their requests with
      each request's current status, the assigned verifier, and the progress of the
      inspection. *(Reference identifier: `request-list`)*

### Requirement 1.2 — Inspection points are structured, locked and versioned

Inspection points are stored as structured information, not only as chat messages. They
are locked before the inspection starts, and any later change creates a new version
instead of overwriting the old one.

*Reference identifier:* [`REQ-F-requirements-first-class`](../1-spec/requirements/REQ-F-requirements-first-class.md)
· *Based on architecture decision records 012, 044, 045, 128 and 129*

**Acceptance criteria — this requirement is met when:**

- [ ] **Each point has a fixed structure.** Every inspection point records four things:
      a description of what to check, the expected result, the test method, and the
      evidence required. *(Reference identifier: `req-structured`)*
- [ ] **Points are locked once inspection starts.** After the verifier begins, any change
      to the points creates a new version; the original set remains stored and readable.
      *(Reference identifier: `req-frozen` · architecture decision record 044)*
- [ ] **Every result points to the exact version it used.** Each result the verifier
      records is linked to the precise version of the inspection point it was checked
      against. *(Reference identifier: `req-versioned` · architecture decision record 129)*

### Rules and assumptions that shape this epic

- **The first release covers one transaction from start to finish, not a marketplace.**
  There is no product catalogue or seller listing; the buyer arrives already knowing
  which product they want checked.
  *(Constraint: [`CON-mvp-scope`](../1-spec/constraints/CON-mvp-scope.md))*
- **Responsibilities are kept separate.** The buyer decides what to check; the verifier
  does the checking. Neither does the other's job, and the verifier never becomes the
  seller's agent, the product's custodian, or its transporter.
  *(Constraint: [`CON-separate-responsibilities`](../1-spec/constraints/CON-separate-responsibilities.md))*
- **Assumption — the first market is buyers in Yaoundé buying from Douala.** Both buyer
  and verifier are inside Cameroon; the buyer's problem is distance, not international
  reach. **Risk if wrong: high** — if early buyers turn out to be elsewhere, the market,
  verifier logistics and transport plans would all change. Not yet confirmed; the pilot
  transactions are designed to test it.
  *(Assumption: [`ASM-yaounde-douala-market`](../1-spec/assumptions/ASM-yaounde-douala-market.md))*

### Where it is built

Buyer application (request form and request list) and the application programming
interface on the server (storing requests, locking and versioning points, assigning
verifiers).

---

## Epic 2 — Inspecting the product and capturing evidence

### In one sentence

The verifier in Douala uses a guided mobile workflow to confirm that the product in front
of them is the right one, checks each of the buyer's points, and records photos, videos
and observations that cannot be quietly altered afterwards.

### Why this matters

The evidence is the product. If the verifier inspects the wrong phone, the whole report is
worthless — so identity comes first. If evidence could be edited or replaced after the
fact, nobody could trust it — so evidence is only ever added, never overwritten. And if
results were reduced to "good" or "bad", the buyer could misread them — so each point gets
one of four precise outcomes with a clear meaning.

The verifier is also protected: they record what they see, they never have to guarantee
the product, and they can stop or mark a point as inconclusive if a test is unsafe or
impossible.

### How it works, step by step

1. The verifier opens the verifier application on their phone and sees the inspection
   assigned to them, with the buyer's locked list of points.
2. **Confirming identity.** Before testing anything, the verifier records what identifies
   this particular item — for example the serial number, the International Mobile
   Equipment Identity number of a phone, the model, or distinctive scratches or marks —
   and takes photos as proof. If the item does not match what the buyer described, the
   inspection stops and the mismatch is recorded with an explicit outcome.
3. **Checking each point.** For each inspection point, the application shows clear,
   step-by-step instructions. The verifier observes, performs the test, and documents
   what they found.
4. **Recording evidence.** Photos, videos and written observations are attached to the
   specific point they relate to. Each item automatically records who captured it, when,
   what type of evidence it is, and which point, product and inspection it belongs to. A
   digital fingerprint of the file is stored so that any later alteration can be detected.
5. **Choosing a result.** For each point, the verifier selects exactly one result:
   - **Passed** — the point was checked and the buyer's expectation was met.
   - **Failed** — the point was checked and the buyer's expectation was *not* met. This
     does **not** mean the product is defective; it only means this specific expectation
     was not satisfied.
   - **Inconclusive** — the point was checked but the verifier could not reach a clear
     answer (for example, the battery screen could not be opened). This is a legitimate
     result, not a failure.
   - **Not tested** — the point was not checked at all (for example, it was unsafe). This
     is different from Failed.
6. **Stopping safely.** If a test is unsafe or cannot be answered, the verifier can stop,
   escalate, or mark the point as inconclusive without any penalty.
7. **Submitting the report.** When finished, the verifier submits the report. From that
   moment it cannot be edited. If a correction is needed, a new version of the report is
   created and the original stays available.
8. Throughout, the verifier only observes, tests and documents. They do not take the
   product away, transport it, or vouch for it.

### User story

**As a** verifier in Douala,
**I want** a guided inspection task that tells me exactly what to check, helps me confirm
the product's identity, and lets me capture evidence for each point,
**so that** I can produce trustworthy observations without having to guarantee the product
or take responsibility for transporting it.

*Reference identifier:* [`US-perform-inspection`](../1-spec/user-stories/US-perform-inspection.md)

**This story is complete when:**

- [ ] When starting an assigned inspection, the verifier must first confirm the product's
      identity, and any mismatch blocks the inspection from continuing.
- [ ] For every inspection point, the verifier records an observation, the supporting
      evidence, and one of the four results: Passed, Failed, Inconclusive or Not tested.
- [ ] The verifier never takes custody of the product; they observe, test and document,
      then submit a report that cannot be changed afterwards.

### Requirement 2.1 — The product's identity is established and verified first

Before any substantive testing, the verifier establishes which physical item is being
inspected — using its serial number, International Mobile Equipment Identity number (for
phones), model, or distinctive marks — and supports this with photographic evidence. If the
item does not match, the inspection is blocked.

*Reference identifier:* [`REQ-F-product-identity`](../1-spec/requirements/REQ-F-product-identity.md)
· *Based on architecture decision records 005, 018, 041 and 042*

**Acceptance criteria — this requirement is met when:**

- [ ] **Identity comes first.** The product's identity is established and supported by
      evidence before any other test can be recorded.
      *(Reference identifier: `identity-established`)*
- [ ] **A mismatch stops the inspection.** If the item does not match the request, the
      inspection is blocked and the outcome of that mismatch is recorded explicitly.
      *(Reference identifier: `identity-mismatch-blocking`)*
- [ ] **Identifiers are backed by evidence.** Each identifying detail is recorded together
      with its proof (for example, a photo of the serial number label) and information
      about who captured it and when. *(Reference identifier: `identity-evidenced`)*

### Requirement 2.2 — Evidence can only be added, never overwritten, and its origin is recorded

Photos, videos and observations are captured for each inspection point, together with
information about where they came from and a digital fingerprint that reveals any later
tampering. Evidence is only ever added; existing evidence is never replaced.

*Reference identifier:* [`REQ-F-capture-evidence`](../1-spec/requirements/REQ-F-capture-evidence.md)
· *Based on architecture decision records 013, 015, 038, 095 and 097*

**Acceptance criteria — this requirement is met when:**

- [ ] **Evidence belongs to a specific point.** Every piece of evidence is linked to the
      inspection point it supports, and all evidence the buyer required for that point is
      present. *(Reference identifier: `evidence-per-requirement` · architecture decision
      record 055)*
- [ ] **The origin of each item is recorded.** Every piece of evidence records who created
      it, when, what type it is, and which inspection point, product and inspection it
      belongs to. *(Reference identifier: `evidence-provenance`)*
- [ ] **Nothing is overwritten.** Additions and corrections are saved as new records; the
      original evidence is never replaced or deleted. *(Reference identifier:
      `evidence-append-only` · architecture decision records 014, 015 and 077)*
- [ ] **Tampering can be detected.** A digital fingerprint (a cryptographic hash) of each
      file is stored so that anyone can check whether the file has been altered. Note that
      this proves the file has not changed since capture — it does not prove that what the
      file shows is true. *(Reference identifier: `evidence-integrity` · architecture
      decision records 095 and 096)*

### Requirement 2.3 — Each inspection point has one clearly defined result

Each inspection point receives exactly one of four results: Passed, Failed, Inconclusive
or Not tested. Failed means the buyer's expectation was not met — not that the product is
defective. Inconclusive is a legitimate result in its own right. Not tested is not the
same as Failed.

*Reference identifier:* [`REQ-F-inspection-results`](../1-spec/requirements/REQ-F-inspection-results.md)
· *Based on architecture decision records 009, 052, 053 and 054*

**Acceptance criteria — this requirement is met when:**

- [ ] **Only the four results are possible.** Each point's result is exactly one of
      Passed, Failed, Inconclusive or Not tested. *(Reference identifier: `result-set`)*
- [ ] **Every result is backed up.** Each result carries the verifier's observation, a
      link to the supporting evidence, the verifier's identity and the time it was
      recorded. *(Reference identifier: `result-evidenced`)*
- [ ] **Failed is worded carefully.** A Failed result is always presented as "this
      expectation was not met", never as "the product is defective".
      *(Reference identifier: `result-not-defective`)*
- [ ] **Submitted reports cannot be edited.** Corrections create a new version of the
      report; the original version remains stored and viewable.
      *(Reference identifier: `report-immutable` · architecture decision records 014 and 079)*

### Requirement 2.4 — A guided, low-effort mobile workflow for the verifier *(should-have)*

The verifier application is designed for phones first, runs in the phone's web browser
and can be added to the home screen like an app (a progressive web application), guides
the verifier step by step, and keeps working on Douala's variable mobile data connections.

*Reference identifier:* [`REQ-USA-mobile-verifier`](../1-spec/requirements/REQ-USA-mobile-verifier.md)
· *Based on architecture decision records 006, 027, 029 and 046*

**Acceptance criteria — this requirement is met when:**

- [ ] **The workflow is guided.** For each inspection point, the verifier sees clear,
      predictable, step-by-step instructions. *(Reference identifier: `guided-flow`)*
- [ ] **Uploads are small.** Photos and videos are compressed on the phone before upload,
      to sizes that are practical on Cameroonian mobile data plans.
      *(Reference identifier: `media-efficient`)*
- [ ] **The verifier can refuse safely.** The verifier can stop, escalate, or mark a point
      as Inconclusive when a task is unsafe or cannot be answered, without any penalty.
      *(Reference identifier: `can-refuse`)*

### Rules and assumptions that shape this epic

- **Verification is not certification.** The platform never says "Product verified" on
  its own. It always states what was checked, for example "checked against 8 points" or
  "battery health observed at 82 percent". The verifier records observations, not
  commercial verdicts.
  *(Constraint: [`CON-verification-not-certification`](../1-spec/constraints/CON-verification-not-certification.md))*
- **Keep the first release simple.** Photo and video files are stored in a dedicated file
  storage service, and the database only stores references to them.
  *(Constraint: [`CON-mvp-scope`](../1-spec/constraints/CON-mvp-scope.md) · architecture
  decision record 038)*
- **Assumption — verifiers use Android phones on Cameroonian mobile networks.** Users
  connect mainly through MTN, Orange, CAMTEL or NEXTTEL, often on older phones with
  limited memory and an unreliable connection. **Risk if wrong: medium** — if connections
  are better than expected, our compression choices are simply more cautious than
  necessary. The pilot will check device types and practical upload sizes.
  *(Assumption: [`ASM-cameroon-mobile-android`](../1-spec/assumptions/ASM-cameroon-mobile-android.md))*

### Where it is built

Verifier application (guided inspection, camera capture, compression, submission) and the
application programming interface on the server (storing evidence, recording fingerprints,
enforcing add-only storage and report versions).

---

## Epic 3 — Reviewing the evidence and recording the buyer's decision

### In one sentence

The buyer opens an evidence package organised point by point, sees exactly what was
checked, what was found and what was not tested, and records whether they accept, reject,
or want more evidence.

### Why this matters

The buyer must be able to make a confident decision without reading more into the
evidence than it actually shows. A vague "verified" badge invites misunderstanding; a
clear, point-by-point view with the original photos and videos available lets the buyer
judge for themselves. Recording the buyer's decision separately from the verifier's
report keeps the two responsibilities apart: the verifier says what they saw, the buyer
decides what to do about it.

### How it works, step by step

1. The buyer is told that the inspection is complete and opens the evidence package in the
   buyer application.
2. The package is organised by the buyer's original inspection points. For each point, the
   buyer sees:
   - the result (Passed, Failed, Inconclusive or Not tested),
   - the verifier's written observation, and
   - the supporting photos and videos.
3. Any summary statement is clearly limited to what was actually checked — for example
   "7 of 8 points passed; battery health was not tested" — never a bare "verified".
4. Behind every summary, the buyer can open the original, full-quality evidence files.
5. The buyer records one decision:
   - **Accept** — they are satisfied and intend to proceed with the purchase.
   - **Reject** — they do not intend to proceed.
   - **Request more evidence** — they need something clarified or checked again before
     deciding.
6. The decision is stored as its own record, separate from the verifier's report. Payment
   to the seller, if the buyer accepts, happens outside the platform in the first release.

### User story

**As a** buyer in Yaoundé,
**I want** to review an evidence package that clearly shows what was checked, what was
observed and what was not tested,
**so that** I can decide whether to go ahead with the purchase without assuming more than
the evidence actually proves.

*Reference identifier:* [`US-review-evidence`](../1-spec/user-stories/US-review-evidence.md)

**This story is complete when:**

- [ ] After an inspection is complete, the buyer sees their inspection points organised
      with the result, the observation and the evidence for each one, and can open the
      original evidence files. *(Architecture decision records 060, 061 and 062)*
- [ ] Wherever the word "verified" appears, it is limited to what was actually checked and
      is never presented as a guarantee. *(Architecture decision record 018)*
- [ ] Once the buyer has decided, the decision — Accept, Reject or Request more evidence —
      is recorded separately from the verification itself. *(Architecture decision
      record 021)*

### Requirement 3.1 — The buyer reviews the evidence package and records a decision

After the inspection, the buyer reviews an evidence package organised by inspection point
and records a decision that is stored separately from the verification report.

*Reference identifier:* [`REQ-F-review-evidence`](../1-spec/requirements/REQ-F-review-evidence.md)
· *Based on architecture decision records 021, 060, 061, 062 and 063*

**Acceptance criteria — this requirement is met when:**

- [ ] **The package is clear and limited to what was checked.** Each inspection point
      shows its result, the observation and the evidence, and any overall statement is
      clearly limited to what was actually checked. *(Reference identifier: `package-scoped`)*
- [ ] **Original evidence is always available.** The original photos and videos remain
      accessible behind any summary or thumbnail. *(Reference identifier:
      `original-accessible`)*
- [ ] **The decision is separate from the verification.** The buyer's decision is one of
      Accept, Reject or Request more evidence, and it is stored independently of the
      verifier's report. *(Reference identifier: `decision-separate`)*

This epic also displays the four results defined in Requirement 2.3 (epic 2).

### Rules and assumptions that shape this epic

- **Assumption — money will eventually move through Mobile Money.** When the platform
  later handles payments, they are expected to go through MTN Mobile Money or Orange Money
  in Central African francs, not bank cards. **Risk if wrong: medium.** This does not
  affect the first release, because payments are out of scope.
  *(Assumption: [`ASM-mobile-money`](../1-spec/assumptions/ASM-mobile-money.md) ·
  architecture decision records 065 and 067, deferred)*

### Where it is built

Buyer application (evidence package view, decision screen) and the application programming
interface on the server (assembling the package, storing the decision).

---

## Epic 4 — Keeping the evidence secure

### In one sentence

Only the people involved in a transaction can see its evidence, links to photos and videos
expire quickly, and personal information that is not needed is removed or never stored.

### Why this matters

Evidence photos can show people's homes, shops, faces, phone numbers and serial numbers.
If anyone with a link could open them, the platform would expose sellers and buyers to
fraud and privacy harm, and lose the trust it exists to create. Access must be limited to
the people who genuinely need it, for as long as they need it.

### How it works

1. Every request for a photo, video or report is checked against the person's role and
   their connection to the transaction:
   - a **buyer** can see the evidence for their own transactions only;
   - a **verifier** can see the evidence for inspections assigned to them only.
2. Evidence files are never published at permanent public web addresses. When someone is
   allowed to view a file, the platform generates a temporary, signed link that stops
   working after a short time.
3. Faces, phone numbers, addresses and other personal details that are not needed for the
   inspection can be blurred or removed, and the platform does not keep personal
   information it does not need.

### Requirement 4.1 — Evidence access is limited by role, with the minimum access necessary

Buyers see the evidence for their own transactions; verifiers see the evidence for the
inspections assigned to them and nothing else. There are no permanent public links —
access is always through short-lived, signed or logged-in links.

*Reference identifier:* [`REQ-SEC-evidence-access`](../1-spec/requirements/REQ-SEC-evidence-access.md)
· *Based on architecture decision records 031, 032, 090 and 092*

**Acceptance criteria — this requirement is met when:**

- [ ] **Access follows each person's role.** Participants can only access evidence that
      belongs to their role and to their own transaction. *(Reference identifier:
      `role-based-access`)*
- [ ] **There are no public links.** Links to evidence are temporary or require the user
      to be logged in; they are never permanent public web addresses. *(Reference
      identifier: `no-public-links`)*
- [ ] **Personal information is kept to a minimum.** Sensitive details can be blurred or
      removed, and personal information that is not needed is not stored. *(Reference
      identifier: `minimize-pii` · architecture decision records 093 and 094)*

### Where it is built

Mainly the application programming interface on the server (access checks, temporary
links, redaction), with both applications respecting these rules when displaying evidence.

---

## Current status

- **Requirements:** six are approved (the functional requirements 1.1, 1.2, 2.1, 2.2, 2.3
  and 3.1); two are still drafts awaiting approval (requirement 2.4, the guided mobile
  workflow, and requirement 4.1, evidence security).
- **Goal and user stories:** still drafts awaiting approval.
- **Software components and which epics they serve:**
  - Buyer application — epics 1 and 3.
  - Verifier application — epic 2.
  - Application programming interface on the server — all four epics.
- **Next step:** the detailed task breakdown has not been created yet. It will be produced
  by running the implementation planning step (`/SDLC-implementation-plan`).

---

## Glossary of reference identifiers

The project keeps every piece of its specification in its own file, and each file has a
short, unique name. These names appear in this document only in the "Reference identifier"
lines so that readers can trace a section back to its source. You do not need them to
understand the epics. They are built as a **prefix** followed by a descriptive name:

| Prefix | Meaning | Example in this document |
|--------|---------|--------------------------|
| `GOAL-` | A business goal the project is trying to achieve. | `GOAL-mvp-trust-transaction` — the goal of the first release. |
| `US-` | A **user story**: a short description of what a user wants and why, written as "As a … I want … so that …". | `US-request-verification` — the buyer's story for epic 1. |
| `REQ-F-` | A **functional requirement**: something the system must do. | `REQ-F-capture-evidence` — requirement 2.2. |
| `REQ-SEC-` | A **security requirement**: how the system must protect data and access. | `REQ-SEC-evidence-access` — requirement 4.1. |
| `REQ-USA-` | A **usability requirement**: how easy and pleasant the system must be to use. | `REQ-USA-mobile-verifier` — requirement 2.4. |
| `AC-` | An **acceptance criterion**: one specific, testable condition that must be true for a requirement to count as done. Shown above as the short identifier in brackets after each criterion (the `AC-` prefix is omitted for readability). | `request-product-detail` under requirement 1.1. |
| `CON-` | A **constraint**: a fixed rule or limit the solution must respect. | `CON-mvp-scope` — the first release covers one transaction only. |
| `ASM-` | An **assumption**: something we believe is true but have not yet confirmed, with the risk if it turns out to be wrong. | `ASM-yaounde-douala-market` — the first market. |

Other terms used in this document:

| Term | Meaning |
|------|---------|
| **Minimum Viable Product** | The smallest version of the product that can be put in front of real users to test whether the core idea works. In this document, "the first release". |
| **Architecture decision record** | A short document recording one technical or product decision, why it was made and what alternatives were considered. The project has 141 of them, numbered 001 to 141, in [`docs/adr/`](adr/). The numbers cited above point to the records each requirement is based on. |
| **Epic** | A large piece of work that delivers one meaningful part of the product, broken down into user stories and requirements. |
| **Digital fingerprint (cryptographic hash)** | A short code calculated from a file's contents. If even one pixel of the file changes, the code changes, so tampering can be detected. |
| **Progressive web application** | A website that works well on phones, can be added to the home screen like an app, and can cope with poor connections, without needing to be installed from an app store. |
| **Application programming interface** | The server-side part of the system that the buyer and verifier applications talk to; it stores data and enforces the rules. |
| **Personally identifiable information** | Any information that can identify a person, such as a face, name, phone number or home address. |
| **International Mobile Equipment Identity number** | The unique 15-digit number that identifies an individual mobile phone. |
