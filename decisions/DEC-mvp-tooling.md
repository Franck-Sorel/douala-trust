# DEC-mvp-tooling: Scaffolding Toolchain for MVP (Framework, ORM/Migrations, Tests, Workspace, CI)

**Status**: Active

**Category**: Convention

**Scope**: backend, frontend

**Source**: [DEC-mvp-stack](../decisions/DEC-mvp-stack.md), [architecture.md](../2-design/architecture.md)

**Last updated**: 2026-10-02

## Context

DEC-mvp-stack fixes Node LTS + TypeScript (strict) but deliberately leaves the concrete
scaffolding tools open: the web framework, the ORM/migration tool, the test runner, the
package manager/workspace layout, and the CI design. Without them, `3-code/` has no
build/lint/test/migration commands (violating DEC-mvp-stack's "Required checks: every
component builds and type-checks cleanly"). This decision records the approved concrete
toolchain so issue #5's scaffold and every subsequent code task follow one convention.

## Decision

The MVP scaffolding uses the following concrete tools, applied to both `api` and
`buyer-app` components:

- **Package manager / layout**: pnpm workspaces, root `package.json` with `api` and
  `buyer-app` workspaces; Node version pinned via `.nvmrc` (Node 26) with
  `packageManager` and a permissive `engines.node` (`>=24`) to tolerate the local Node 24.
- **Backend web framework**: Fastify (TypeScript-first).
- **ORM + migrations**: Drizzle ORM with the `node-postgres` driver, plus `drizzle-kit`
  for committed, versioned migrations under `3-code/api/db/migrations/`.
- **Test runner**: Vitest.
- **PWA build tooling**: Vite.
- **buyer-app** has no direct database; its migration story is "none — consumes the API".
- **CI**: a new `.github/workflows/ci.yml` on `pull_request` and `push` to `main` that
  installs with pnpm and runs per-workspace typecheck + lint + test, plus an API migration
  check backed by a PostgreSQL service container.

## Enforcement

### Trigger conditions

- **Specification phase**: no direct trigger.
- **Design phase**: design documents may reference the toolchain; treated as the
  implementation-level companion to DEC-mvp-stack.
- **Code phase**: scaffolding any component in `3-code/`; adding build/lint/test/migration
  commands; wiring DB tooling.
- **Deploy phase**: choosing runtimes/hosting for the Node services; CI for the repo.

### Required patterns

- pnpm workspace layout: `package.json` at repo root declaring `workspaces: ["api", "buyer-app"]`.
- Fastify for the API HTTP layer; strict `tsconfig.json` (`strict: true`).
- Drizzle + `drizzle-kit` for the API; every migration is committed and versioned in
  `3-code/api/db/migrations/`.
- Vitest for both components' test suites.
- Vite for the buyer-app frontend.
- `buyer-app` records "migration: none — consumes the API" in its `CLAUDE.md`.
- CI job (D5) per the decision — pnpm install, per-workspace typecheck/lint/test, and an
  API migration check with a PostgreSQL service container.

### Required checks

1. Every component type-checks, lints, tests, and builds cleanly with its scripts.
2. The API's migrations apply cleanly against a PostgreSQL instance.
3. CI runs the project's tests/lint on PR (AC of issue #5).

### Prohibited patterns

- Introducing a different package manager, test runner, or DB migration tool in MVP code
  without a new decision.
- Untyped JavaScript in component source (per DEC-mvp-stack).
- Wrapping component toolchains in a single root `package.json` that violates component
  isolation (`3-code/CLAUDE.code.md`).
