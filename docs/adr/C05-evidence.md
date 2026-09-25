# C05 — Evidence

Canonical ADRs: **013, 014, 015, 034→097, 035→095, 038, 039, 040, 055, 056, 060, 061,
062, 093, 094, 095, 097**.

These decisions govern how evidence is produced, stored, retained, protected and
presented.

---

## ADR-013 — Every Verification Result Must Have Evidence

**Status:** LOCKED

### Decision
A verifier should not simply submit "PASS" where practical. Each result should carry
evidence.

### Example
```
Result:      PASS
Observation: Battery health = 82%
Evidence:    Photo #18
Timestamp:   14:37
Verifier:    V-1827
```
General rule: **Claim → Observation → Evidence → Actor → Timestamp**.

---

## ADR-014 — Inspection Reports Are Immutable After Submission

**Status:** LOCKED

### Decision
Once finalized, the original report should not be silently editable. A correction creates
a new event/version.

### Example
```
REPORT_SUBMITTED → CORRECTION_REQUESTED → REPORT_CORRECTED → CORRECTION_REASON_RECORDED
```

### Reason
Otherwise a verifier could alter evidence after a dispute begins — especially timestamps
and results.

---

## ADR-015 — Evidence Should Be Append-Only

**Status:** LOCKED

### Decision
Treated as append-only wherever practical. A verifier can add photo/video/observation/
correction/clarification, but previously submitted evidence should not disappear without
an auditable record.

### Example (evidence timeline)
```
14:02 Photo uploaded
14:04 Serial number recorded
14:11 Battery test performed
14:14 Buyer asks clarification
14:16 Additional photo uploaded
14:21 Inspection submitted
```
Invaluable during disputes.

---

## ADR-034 / ADR-097 — Evidence Provenance Should Be Captured

**Status:** LOCKED (merged; ADR-034 folded into 097)

### Decision
Every important evidence item should have provenance.

### Example
```
Evidence #18291
Created by:   Verifier V-1827
Created:      2026-09-23 14:21
Type:         PHOTO
Related req:  REQ-17
Related prod: PRODUCT-8472
```

Possible provenance fields: `created_by`, `created_at`, `capture_device`, `source`,
`upload_method`, `related transaction`, `related inspection`, `related requirement`,
`content_hash`.

This allows the platform to answer who created this evidence, when, for which product, for
which requirement, during which inspection.

---

## ADR-035 / ADR-095 — Evidence Integrity Should Be Verifiable

**Status:** PROPOSED (technical validation required)

### Decision
Generate a cryptographic content hash for evidence artifacts.

### Example
```
evidence_id: EVIDENCE-18291
SHA-256:     abc123...
```
If the downloaded artifact produces a different hash, the system detects that content
changed. (See ADR-096: integrity ≠ truth.)

---

## ADR-038 — Evidence Storage Should Be Separated

**Status:** LOCKED

### Decision
Binary evidence (photos, videos, documents, attachments) is stored separately from
transactional metadata. The transactional DB stores references, not binary blobs.

### Example
```
Evidence
  evidence_id
  transaction_id
  inspection_id
  requirement_id
  type
  storage_reference
  content_hash
  created_at
  created_by
```
The file lives in object storage; the DB stores *what* it is, *where* it is, *who* created
it, *when*, what it relates to, and whether integrity was verified.

### Trade-off
Dependency on an additional storage subsystem.

### Accepted risk
Evidence storage can become unavailable independently of the transactional DB.

### Mitigation
Durable object storage, backups, replication, explicit evidence lifecycle policies.

---

## ADR-039 — Evidence Retention Must Be Explicit

**Status:** LOCKED

### Decision
Define retention policies per evidence category; not everything is kept forever.

### Example
- Low-value transaction: 90 days.
- High-value transaction: 2 years.
- Active dispute: until resolved + applicable retention.
- Legal hold: until released.

### Trade-off
Deleting evidence can make future investigations impossible.

### Accepted risk
Some historical evidence will eventually become unavailable.

### Mitigation
Retention rules visible, configurable, and extended automatically when a dispute or legal
hold exists.

---

## ADR-040 — Evidence Deletion Must Also Be Auditable

**Status:** LOCKED

### Decision
When evidence is deleted per policy, preserve an audit record that it existed and was
deleted.

### Example
```
Evidence: EVIDENCE-18291
Created:  2026-09-23
Retention: 180 days
Deleted:  2027-03-22
Reason:   RETENTION_POLICY
```
The system should not pretend the evidence never existed.

---

## ADR-055 — Evidence Requirements Defined Per Requirement

**Status:** LOCKED

### Decision
Different requirements require different evidence.

### Example
- Serial matches listing → photo of serial number.
- Battery health ≥ 80% → screenshot of battery-health info.
- No visible screen cracks → photos from defined angles.
- Includes original charger → photo showing charger and identification.

Generic evidence requirements often produce evidence that cannot prove the claim.

---

## ADR-056 — Evidence Quality Should Be Validated

**Status:** LOCKED

### Decision
Validate evidence quality where practical: blurry photo, required area not visible,
unreadable screenshot, video too short, wrong type, missing angle.

Request "please retake this evidence" rather than letting poor evidence silently enter the
report.

---

## ADR-060 — The Buyer Should Be Able to Inspect the Evidence Package

**Status:** LOCKED

### Decision
Before completing the transaction, the buyer reviews the evidence package: requirements;
observations; photos; videos; test results; timestamps; verifier identity; protocol;
exceptions; inconclusive results.

The buyer can ask: what was checked / observed / not checked / when / by whom.

---

## ADR-061 — Evidence Presentation Should Follow the Buyer's Requirements

**Status:** LOCKED

### Decision
Organize the buyer-facing report around the requirements the buyer cares about.

### Example
```
Buyer Requirement: Battery >= 80%
Result:   PASS
Observed: 82%
Evidence: Photo #18
```
Rather than forcing the buyer to scan 47 photos to determine what each proves.

---

## ADR-062 — The Original Evidence Remains Accessible

**Status:** LOCKED

### Decision
Summaries should not replace source evidence. Provide a layered experience:

`Summary → Requirement result → Observation → Evidence → Original artifact`.

---

## ADR-093 — Sensitive Data Should Be Minimized in Evidence

**Status:** LOCKED

### Decision
Avoid collecting/retaining information not required to verify the transaction.

### Example
If a photo of a device serial number is required, do not also require unrelated personal
documents.

### Reason
Evidence collection can unintentionally become a mechanism for collecting excessive
personal information.

---

## ADR-094 — PII Should Be Redacted Where Appropriate

**Status:** LOCKED

### Decision
Support redaction where evidence contains unnecessary personal information.

### Examples
address; phone number; email; payment info; government identifier.

The original may be restricted retained; the user-facing version may be a redacted copy.

### Reason
Reduction of unnecessary exposure while preserving useful evidence.
