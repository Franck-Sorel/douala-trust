# DEC-verifier-selection: Trail

> Companion to `DEC-verifier-selection.md`.
> AI agents read this only when evaluating whether the decision is still
> valid or when proposing a change or supersession.

## Alternatives considered

### Option A: Platform assigns a single verifier
- Pros: simplest; automated.
- Cons: the buyer, who carries the risk, has no say — weaker trust signal.

### Option B: Buyer shortlists up to 3; first responder claims (chosen)
- Pros: buyer controls who inspects; verifier availability is the filter; "first to
  respond" maps cleanly onto the existing concurrency/idempotency decisions.
- Cons: introduces a race and an offer/claim state machine (complexity).

### Option C: Sequential fallback (ask #1, if declines ask #2)
- Pros: no race.
- Cons: slower; one verifier can hold up the whole request.

## Reasoning

The user specified the model directly: buyers choose, verifiers carry an availability
status (available/snoozed/ban/busy), the buyer shortlists 3, and the first to respond gets
the job. Ratings (mentioned as "rated verifiers") were clarified to mean **availability is
the filter — no rating/ranking gate in the MVP**. Simultaneous offer + first-responder-claim
was explicitly approved by the user, with a 24h timeout and re-select fallback. The race is
deliberately handled with the existing DEC-idempotency / DEC-state-transition-validation
machinery rather than avoided. Independence invariant is carried forward from
DEC-verifier-independent-evidence.

This reasoning would be invalidated if field trials show simultaneous offers create
low-quality claims, or if ratings become a required trust signal sooner than planned.

## User involvement

**Type**: user-decided

**Notes**: The user supplied the assignment model (buyer chooses, availability status,
shortlist of 3, first-responder wins) and approved the invitation-semantics default
(simultaneous, 24h timeout, re-select). Rating was dropped in favor of availability-only
filtering.

## Changelog

| Date | Change | Involvement |
|------|--------|-------------|
| 2026-10-02 | Initial decision | user-decided |
