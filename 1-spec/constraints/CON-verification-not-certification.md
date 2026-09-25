# CON-verification-not-certification: Platform Verification Is Not Professional Certification

**Category**: Business

**Status**: Active

**Source stakeholder**: [STK-platform](../stakeholders.md)

## Description

The platform's "verified" claim must never imply regulatory, legal or professional
certification. Platform inspection = "inspected against the transaction requirements"; it
is distinct from "certified by [recognized professional body]". The verifier produces
observations and evidence, not a guarantee or a "good product" verdict.

## Rationale

The core trust model (ADR-001, ADR-009, ADR-051) establishes that evidence integrity ≠
truth, and that the platform answers *what was required / observed / evidenced* — it does
not guarantee the product's future performance or authenticity absent actual testing
(ADR-052, ADR-096).

## Impact

- Never display a bare "Product Verified"; always scope the claim (ADR-018): "verified
  against 12 requirements", "battery health observed at 82%".
- Preserve outcome semantics (ADR-052/053/054): FAIL ≠ defective; INCONCLUSIVE is
  first-class; NOT_TESTED ≠ FAIL.
- The verifier's report carries observations + evidence, not final commercial judgments.

## Related Artifacts

- Derived requirements: [REQ-F-inspection-results](../requirements/REQ-F-inspection-results.md)
