# CON-separate-responsibilities: No Single Actor Controls the Whole Transaction

**Category**: Business

**Status**: Active

**Source stakeholder**: [STK-platform](../stakeholders.md)

## Description

Responsibilities are independent: the seller owns/sells the product, the buyer specifies
the desired outcome, the verifier physically inspects, the platform controls settlement
and dispute facilitation, transport is a separate actor, the buyer receives the product
(ADR-003). The verifier must not also become the custodian, transporter or guarantor
(ADR-004, ADR-030).

## Rationale

Giving one person control over verification + possession + transportation + payment + final
approval creates an extreme opportunity for collusion, theft or substitution. The platform
relies on **aligned incentives + independent responsibilities**, not on trusting any single
participant (ADR-003/004).

## Impact

- Onboarding treats verifiers as independent evidence producers, isolated from sale,
  custody and payment control (DEC-verifier-independent-evidence).
- The MVP does not hand the verifier possession of the product beyond what the agreed
  inspection requires (observe → test → document → return).
- Transaction, inspection and payment concerns are modeled as separate state machines
  (ADR-063/064).

## Related Artifacts

- Derived requirements: [REQ-F-create-verification-request](../requirements/REQ-F-create-verification-request.md)
