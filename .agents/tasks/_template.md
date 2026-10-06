---
title: One-line title for the frozen task / PR
issue:            # optional: issue number to link from the PR (e.g. 5). Leave blank if none.
---

# <Task title>

## Context
<!-- Why this task exists and what it connects to: the epic / issue, spec REQ-/US-/GOAL-,
     design docs in 2-design/, and any relevant DEC-* decisions. The runner agent will read
     these artifacts too; point it at them. -->

## Goal
<!-- Outcome in one or two sentences. What "done" means. -->

## Exact task
<!-- Step-by-step, unambiguous instructions the agent must follow. Copy the task brief /
     issue acceptance criteria here verbatim so the run does not depend on the agent going
     and re-interpreting anything. -->

1. ...
2. ...

## Frozen decisions (DO NOT CHANGE)
<!-- Every decision already made locally and approved. The agent must implement these as-is
     and must not revisit or second-guess them. This table is why the runner never needs to
     ask anything. If a requested item is NOT here, it was NOT decided — leave it out of
     scope or get it decided before pushing. -->
| # | Decision | Value |
|---|----------|-------|
| D1 | ... | ... |

## Out of scope
<!-- Explicitly what the agent must NOT build or change. Prevents scope creep. -->

- ...

## Acceptance criteria
<!-- Checkable outcomes. Map to REQ/AC where relevant (e.g. REQ-F-.../AC-...). -->
- [ ] ...
- [ ] ...

## Verification commands
<!-- Exact commands the agent must run and report results for before finishing
     (test / lint / typecheck / build / migrate). These must exist in the component. -->
```bash
pnpm --filter @douala-trust/api test
pnpm -r typecheck
# ... etc
```

## Do not assume
<!-- Invariant for the runner agent (do not delete): -->
> If any decision needed to complete this task is genuinely missing or ambiguous, implement
> only what is unambiguous, do NOT invent a choice, and report the open decision clearly in
> the agent's final message and in the PR body.
