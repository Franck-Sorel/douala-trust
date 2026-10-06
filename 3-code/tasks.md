# Tasks

## Status Legend

| Symbol | Status |
|--------|--------|
| `Todo` | Not started |
| `In Progress` | Currently being worked on |
| `Blocked` | Waiting on a dependency or decision (reason **must** be noted in the Notes column) |
| `Done` | Completed |
| `Decomposed` | Split into subtasks (subtask IDs **must** be noted in the Notes column) |
| `Cancelled` | No longer needed (reason **must** be noted in the Notes column) |

## Priority Legend

| Priority | Meaning |
|----------|---------|
| `P0` | Infrastructure / cross-cutting — required before feature work |
| `P1` | Implements a Must-have goal |
| `P2` | Implements a Should-have goal |
| `P3` | Implements a Could-have goal |

---

## Task Table

<!-- Req column: links to requirements this task implements (comma-separated), or "-" if none. -->

### Setup & Infrastructure

| ID | Task | Priority | Status | Req | Dependencies | Updated | Notes |
|----|------|----------|--------|-----|--------------|---------|-------|
| TASK-scaffold-api | Scaffold the `api` component: pnpm workspace, strict TS, Fastify, Drizzle + drizzle-kit with a committed migration, Vitest, lint/build/test/migrate scripts | P0 | Done | - | - | 2026-10-02 | Infrastructure (issue #5) |
| TASK-scaffold-buyer-app | Scaffold the `buyer-app` component: pnpm workspace, strict TS, Vite, Vitest, lint/build/test scripts | P0 | Done | - | - | 2026-10-02 | Infrastructure (issue #5) |
| TASK-ci-lint | Add `.github/workflows/ci.yml`: pnpm install, per-workspace typecheck/lint/test, API migration check with Postgres service | P0 | Done | - | TASK-scaffold-api, TASK-scaffold-buyer-app | 2026-10-02 | Infrastructure (issue #5) |

<!-- Add one section per component (matching per-component directories in 3-code/). -->
<!-- Example: ### Backend, ### Frontend, etc. -->

### API

| ID | Task | Priority | Status | Req | Dependencies | Updated | Notes |
|----|------|----------|--------|-----|--------------|---------|-------|

<!-- ### Buyer App -->

### Deploy & Operations

| ID | Task | Priority | Status | Req | Dependencies | Updated | Notes |
|----|------|----------|--------|-----|--------------|---------|-------|

---

## Execution Plan

Defines the order in which tasks should be executed. Tasks are grouped into phases; complete all tasks in a phase before moving to the next. Within a phase, execute tasks in the listed order. Each phase ends with a deployable or testable system.

<!-- Update this section whenever tasks are created, reordered, or cancelled. -->

### Phase 1: Repo Scaffold

**Capabilities delivered:**
- Two component codebases (`api`, `buyer-app`) that type-check, lint, test, and build independently.
- A committed, versioned schema-migration mechanism wired to PostgreSQL for the API.
- CI that runs the project's tests/lint on PR (GitHub issue #5 acceptance criteria).

**Tasks:**
1. TASK-scaffold-api
2. TASK-scaffold-buyer-app
3. TASK-ci-lint
