# DEC-deferred-buyer-identity: Guest Drafting; Identity Captured at the Request Step

**Status**: Active

**Category**: Architecture

**Scope**: system-wide

**Source**: [REQ-F-create-verification-request/AC-request-list](../1-spec/requirements/REQ-F-create-verification-request.md), determined during MVP planning for UX

**Last updated**: 2026-10-02

## Context

`AC-request-list` requires a buyer to see *their* requests, which implies identity scoping.
But forcing account creation at first touch is a known conversion killer, and full
authentication is explicitly deferred to the security epic (`REQ-SEC-evidence-access`, Epic 4).
The MVP needs a way to let a buyer start a request without an account, while still being able
to attribute and list requests once the buyer is serious.

## Decision

A buyer may **draft** a verification request (product + requirements) as a **guest**, with no
account. Identity is **captured at the point of commitment** — when the buyer chooses to
actually send a verifier ("request a verifier for my product"). At that point a minimal buyer
identity is created and the draft is persisted and attributed to it. `AC-request-list` (list
**my** requests) applies **only after** identity exists; pre-commit drafts are ephemeral and
not listable. Full authentication (REQ-SEC) remains deferred to the security epic.

## Enforcement

### Trigger conditions

- **Specification phase**: `AC-request-list` is read as a *post-identity* capability; "my
  requests" means the committed buyer's requests, never anonymous drafts.
- **Design phase**: the request lifecycle is two-phase — anonymous **draft** vs committed
  **request**; the API distinguishes draft persistence (client-held / ephemeral) from a
  committed request (server-persisted with `buyer_id`).
- **Code phase**: the only identity needed in Epic 1 is the minimal buyer identifier captured
  at commit (e.g. contact handle); full `REQ-SEC` auth is not built here.
- **Deploy phase**: minimal identity/session infrastructure only; no full auth stack.

### Required patterns

- **Draft**: product + requirements edited without identity; held client-side or as an
  ephemeral, non-listable record; reaped if never committed.
- **Commit**: buyer provides minimal contact/identity → identity created, request persisted
  with `buyer_id`, request transitions to its next state.
- **List**: `list my requests` returns only requests whose `buyer_id` matches the
  authenticated buyer.

### Required checks

1. A guest can draft without creating any account.
2. No anonymous draft is listable as "mine" or appears as a real request.
3. Every committed request has an attributed `buyer_id`.
4. Epic 1 does not build full authentication (deferred to Epic 4 / REQ-SEC).

### Prohibited patterns

- Requiring an account before a buyer can draft a request.
- Persisting and listing anonymous drafts as attributable requests.
- Pulling full `REQ-SEC` authentication into the Epic 1 scope.
