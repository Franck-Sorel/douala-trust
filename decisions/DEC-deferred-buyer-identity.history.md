# DEC-deferred-buyer-identity: Trail

> Companion to `DEC-deferred-buyer-identity.md`.
> AI agents read this only when evaluating whether the decision is still
> valid or when proposing a change or supersession.

## Alternatives considered

### Option A: Require an account before any request (eager signup)
- Pros: every action is attributed.
- Cons: poor UX; depresses a pilot whose whole experiment is whether buyers trust and use
  the service.

### Option B: No identity at all in Epic 1 (single anonymous buyer)
- Pros: simplest.
- Cons: makes `AC-request-list` ("my requests") meaningless and sets a weak precedent.

### Option C: Guest draft, identity at the request step (chosen)
- Pros: matches the "sign up at the point of value" pattern; keeps `AC-request-list` intact
  post-identity; defers heavy auth to Epic 4.
- Cons: drafting phase is ephemeral; needs an explicit draft-vs-commit boundary in the API.

## Reasoning

The user proposed deferring buyer-account creation until the moment they request a verifier,
for UX. This aligns with the standard guest-checkout pattern. It preserves `AC-request-list`
by scoping it to the committed buyer, and cleanly separates anonymous drafting from
authoritative post-commit request state (DEC-authoritative-single-source). Full authentication
remains in the security epic.

This reasoning would be invalidated if post-commit identity proves insufficient to establish
trust/communication between buyer and verifier (DEC-buyer-verifier-communication).

## User involvement

**Type**: user-decided

**Notes**: The user supplied the deferral idea and asked whether it aligns with sound design
principles; the agent affirmed with caveats (draft ephemeral; list scoped post-identity).

## Changelog

| Date | Change | Involvement |
|------|--------|-------------|
| 2026-10-02 | Initial decision | user-decided |
