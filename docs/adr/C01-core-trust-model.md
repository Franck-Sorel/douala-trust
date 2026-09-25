# C01 — Trust Model & Product Philosophy

Canonical ADRs: **001, 009, 016, 018, 026, 051, 052, 053, 054, 096**.

These decisions define *what the product is* and how it frames claims — the foundation
everything else builds on.

---

## ADR-001 — Independent Verification

**Status:** LOCKED

### Decision
Introduce an independent verifier between the remote buyer and the physical product.

### Reason
The buyer cannot physically inspect the product.

### Alternatives
- buyer trusts the seller
- seller sends photos
- buyer travels
- professional inspection only

### Trade-off
Adds cost and operational complexity.

### Accepted risk
The verifier can make mistakes or collude.

### Mitigation
KYC, evidence, reputation, separation of responsibilities, audits and dispute mechanisms.

---

## ADR-009 — Evidence Over Verdicts

**Status:** LOCKED

### Decision
The verifier reports **observations and test results** rather than broad claims such as
"good product."

### Reason
Objective observations are easier to audit, dispute and compare against the buyer's
requirements.

### Trade-off
The buyer has to interpret some results.

### Accepted risk
Some buyers may still want a simple recommendation.

### Mitigation
The platform can summarize whether each predefined requirement was `PASS`, `FAIL`,
`NOT_TESTED`, `NOT_APPLICABLE` or `INCONCLUSIVE` — without replacing the underlying
evidence.

---

## ADR-016 — Distinguish Observation From Interpretation

**Status:** LOCKED

### Decision
Store raw **observations** separately from derived **interpretations**.

### Example
- Observation: "Screen displayed a black dot approximately 2 mm in diameter."
- Interpretation: "Possible dead pixel."
- Buyer decision: "Accepts product despite defect."

These are three different things. The verifier is primarily responsible for the first; the
platform may assist with the second; the buyer remains responsible for the third.

---

## ADR-018 — "Verified" Must Be Scoped

**Status:** LOCKED

### Decision
Never display simply "Product Verified." Instead communicate what was verified and against
what:

- "Verified against 12 requested requirements."
- "Physical condition inspected."
- "Serial number verified."
- "Battery health observed at 82%."

Verification must always answer: **Verified for what?**

---

## ADR-026 — Not All Attributes Can Be Verified Remotely

**Status:** LOCKED

### Decision
Explicitly classify what type of verification is required for each attribute.

Possible categories: `VISUAL`, `FUNCTIONAL`, `MEASUREMENT`, `DOCUMENTARY`, `IDENTITY`,
`AUTHENTICITY`, `LABORATORY`, `LEGAL/REGULATORY`.

### Example
- Visual condition — local verifier can inspect.
- Battery health — verifier may inspect a software-reported value.
- Battery chemical composition — requires specialized testing.
- Authenticity — may require an expert or specialized service.
- Legal ownership — may require documentary/legal verification.

This prevents the MVP from promising capabilities it does not possess.

---

## ADR-051 — Platform Verification ≠ Professional Certification

**Status:** LOCKED

### Decision
The word "verified" must not imply regulatory, legal or professional certification.

- **Platform inspection:** "Inspected against the transaction requirements."
- **Professional certification:** "Certified by [recognized professional body]."

These are different claims.

### Reason
Users may otherwise infer authority the platform does not possess.

---

## ADR-052 — Failed Requirements ≠ Product Failure

**Status:** LOCKED

### Decision
A failed requirement means "the observed result did not satisfy the requirement" — not
automatically "the product is defective."

### Example
- Buyer requirement: Battery ≥ 80%.
- Observed: Battery = 72%.
- Result: `FAIL`.

The product did not meet the buyer's specified requirement; it does not necessarily mean
the battery is defective. Preserve this distinction in the data model.

---

## ADR-053 — Inconclusive Is a First-Class Outcome

**Status:** LOCKED

### Decision
The verifier must be able to report `INCONCLUSIVE` when available evidence is
insufficient, and must not be forced to choose `PASS` or `FAIL` when neither is supported.

### Example
- Requirement: Water resistance.
- Result: `INCONCLUSIVE`.
- Reason: No safe method available to test water resistance during inspection.

---

## ADR-054 — "Not Tested" Must Be Different From "Failed"

**Status:** LOCKED

### Decision
The system must distinguish `NOT_TESTED` from `FAIL`.

### Example
`Battery health: NOT_TESTED` does not mean `Battery health: FAILED`.

This is particularly important when an inspection is only partially completed.

---

## ADR-096 — Evidence Hashes Do Not Prove Truth

**Status:** LOCKED

### Decision
A content hash proves **consistency of the artifact**, not the **truthfulness of the
information** it contains.

### Example
A photograph may have a valid hash while still showing: the wrong product, an old product,
an edited image, or an irrelevant object.

### Conclusion
`Integrity ≠ Authenticity ≠ Truth`. Cryptographic integrity must not be presented as proof
that the underlying claim is true.
