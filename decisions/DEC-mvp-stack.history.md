# DEC-mvp-stack: Trail

> Companion to `DEC-mvp-stack.md`.
> AI agents read this only when evaluating whether the decision is still
> valid or when proposing a change or supersession.

## Alternatives considered

### Option A: Node.js + TypeScript
- Pros: single language across API and PWA clients; large ecosystem; fast iteration for a
  lean vertical slice; strong TS tooling for agent-friendly, strictly typed code.
- Cons: requires discipline to keep types meaningful.

### Option B: Python (FastAPI)
- Pros: very fast to build a small API; concise.
- Cons: frontend stays in a different language, splitting human/agent context.

### Option C: Go
- Pros: single compiled binary, low ops cost on a small VPS.
- Cons: more boilerplate for rapid PWA-era iteration; separate frontend language.

## Reasoning

The MVP is one vertical slice across an API and browser-based apps; a single language
reduces toolchain and context-switching for both humans and AI agents. Node + TypeScript
was selected by the user as the default offered during planning.

Trade-off accepted: TypeScript on Node is not the lowest-ops option (Go), but the 
eliminated split-brain (separate backend/frontend languages) is worth more for a small
team building a PWA. This reasoning would be invalidated if the majority of the system
became a data-heavy, long-running service where Go's operational advantages dominated.

## User involvement

**Type**: ai-proposed/user-approved

**Notes**: User selected "Node + TypeScript" from the stack options during Epic 1 planning.

## Changelog

| Date | Change | Involvement |
|------|--------|-------------|
| 2026-10-02 | Initial decision | ai-proposed/user-approved |
