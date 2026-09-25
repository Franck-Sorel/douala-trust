# C11 — AI & Automation

Canonical ADRs: **058, 059**.

These decisions bound how AI/automation may be used so it never fabricates or impersonates
a human observation. (See also ADR-057 in C04: automation assists but does not replace
verification.)

---

## ADR-058 — AI-Generated Observations Must Be Clearly Identified

**Status:** LOCKED

### Decision
If AI analyzes evidence, its output must never be indistinguishable from human
observations.

### Example
```
AI-assisted observation:  "Image analysis detected a possible crack."
Human verifier:          "Confirmed visible crack approximately 12 mm."
```
Preserve both.

### Reason
Users need to understand how an observation was produced.

---

## ADR-059 — AI Should Not Invent Missing Evidence

**Status:** LOCKED

### Decision
AI must not infer that a requirement passed simply because evidence was not obviously
negative.

### Example
A photo does not show the back of the device. The system must not conclude "back cover has
no damage." Correct result: `NOT_TESTED` or `INSUFFICIENT_EVIDENCE`.

### Reason
Absence of evidence is not evidence of compliance.
