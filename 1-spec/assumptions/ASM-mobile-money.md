# ASM-mobile-money: Value Settlement Will Use Mobile Money

**Category**: Business

**Status**: Unverified

**Risk if wrong**: Medium — if settlement is not via MTN MoMo / Orange Money, payment
integration differs; however payments are out of MVP scope initially (CON-mvp-scope).

## Statement

When the platform handles money, value moves via Cameroonian Mobile Money (MTN MoMo /
Orange Money) in FCFA, not cards.

## Rationale

Mobile Money is the dominant payment rail in Cameroon. It is relevant to verifier payouts
and buy-side settlement later (ADR-064/065), but the MVP defers automated payments.

## Verification Plan

Defer detailed validation to post-MVP; confirm MoMo business-account availability and API
access before building settlement.

## Related Artifacts

- [REQ-F-review-evidence](../requirements/REQ-F-review-evidence.md)
