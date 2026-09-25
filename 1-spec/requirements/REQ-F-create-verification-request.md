# REQ-F-create-verification-request: Buyer Creates a Verification Request

**Type**: Functional

**Status**: Approved

**Priority**: Must-have

**Source**: [US-request-verification](../user-stories/US-request-verification.md)

**Source stakeholder**: [STK-buyer](../stakeholders.md)

## Description

A buyer can create a verification request for a physical product located in Douala that
they cannot inspect themselves. The request identifies the product (description, location,
and — where known — identifiers) and the buyer's stated inspection requirements
(ADR-001 independent verification; ADR-012 requirements as first-class data).

## Acceptance Criteria

- **AC-request-product-detail**: Given a product is located in Douala, when the buyer
  creates a request, then they can record product description, location and optional
  identifiers.
- **AC-request-assign-verifier**: Given an active request with requirements, when the
  platform routes it, then an independent verifier is assigned who does not control the
  sale or custody (ADR-003/004).
- **AC-request-list**: Given a buyer with requests, when they view their requests, then
  they see current state, assigned verifier and inspection status.

## Related Constraints

- [CON-mvp-scope](../../1-spec/constraints/CON-mvp-scope.md) — MVP = single verification
  transaction, not a marketplace.
- [CON-separate-responsibilities](../../1-spec/constraints/CON-separate-responsibilities.md) —
  buyer specifies outcome; verifier inspects.

## Related Assumptions

- [ASM-yaounde-douala-market](../../1-spec/assumptions/ASM-yaounde-douala-market.md)
