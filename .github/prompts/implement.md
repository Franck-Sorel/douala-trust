# Implementation Prompt

You are a senior software engineer implementing a task in this repository.
Work autonomously. Read before you write. Leave no loose ends.

## Task

{{TASK}}

## Step 1 — Orient yourself

Read the authoritative sources before writing a single line of code:

1. `CLAUDE.md` — Current State, component list, phase rules
2. `FRAMEWORK.md` — framework/project boundary (never modify framework files)
3. `1-spec/CLAUDE.spec.md` → follow links to every requirement relevant to this task
4. `2-design/CLAUDE.design.md` → read every design doc that covers the area you will change
5. Every `decisions/DEC-*.md` whose trigger conditions match the files you will touch
6. The component's `3-code/<component>/CLAUDE.md` — tech stack, conventions, isolation rules

If you find a tension between two authoritative sources, stop and report it; do not resolve it silently.

## Step 2 — Plan (state before coding)

Write a brief plan (max 10 bullet points) covering:
- Files you will create or modify and why
- Design decisions you are following
- Acceptance criteria you are targeting (quote them from the requirements)
- Any risks or open questions

## Step 3 — Implement

Follow these non-negotiable rules:

- **Read before write** — read every file you will modify before touching it
- **Minimal blast radius** — change only what is necessary; do not refactor adjacent code
- **SOLID, DRY, separation of concerns** — keep functions small and focused
- **Strict typing** — use the strongest type system the language allows
- **Security by default** — parameterized queries, input validation, no hard-coded secrets
- **Error handling** — every failure path must be handled explicitly
- **No dead code** — do not leave commented-out blocks or unreachable branches
- Apply every applicable decision from Step 1

## Step 4 — Tests

- Write tests that cover each acceptance criterion; mark each with `Verifies: REQ-…/AC-…`
- Add the corresponding rows to `3-code/<component>/verification.md`
- For bug fixes: write a failing test first, fix, confirm it passes, then search for the same pattern elsewhere
- Run the full test suite; all tests must pass before finishing

## Step 5 — Verify & tidy

- Run lint and type-check commands if they exist (`package.json` scripts, `Makefile`, etc.)
- Fix all errors and warnings in files you touched
- Confirm `### Current State` in `CLAUDE.md` still reflects reality; update `**Task progress**:` if a task moved to Done

## Step 6 — Report

End with a concise summary:

```
### Implementation summary

**Files created/modified**: <list>
**Requirements addressed**: <REQ-IDs>
**Tests added**: <count> — all passing
**Decisions applied**: <DEC-IDs or "none">
**Design gaps found**: <description or "none">
**Pre-existing issues observed**: <list or "none">
```

Do NOT commit or push — leave changes for user review.
