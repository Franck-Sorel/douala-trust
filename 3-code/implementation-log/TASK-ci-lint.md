# TASK-ci-lint — Implementation Log

- **Task:** [TASK-ci-lint](../tasks.md)
- **Started:** 2026-10-02

---

## Understanding

### Synthesized scope

Add a new `.github/workflows/ci.yml` (D5) that triggers on `pull_request` and `push` to
`main`, installing with pnpm and running per-workspace `typecheck` + `lint` + `test` (+
`build`), plus an API migration check backed by a PostgreSQL service container. Satisfies
issue #5 AC "CI runs the project tests/lint on PR". Also uncomment `node_modules/` and
`dist/` in the Seeded `.gitignore` (project-facing ignore entries; flagged in the PR).

### Linked requirements

None (`-`). Infrastructure task.

### Relevant design artifacts / decisions

- [DEC-mvp-tooling](../../decisions/DEC-mvp-tooling.md) — CI job design (D5).
- Existing `.github/workflows/ai-*.yml` — repo dispatch-workflow style (not copied).

### Downstream tasks that depend on this

None — end of Phase 1.

---

## Execution log

### 2026-10-02 — [WRITE] CI workflow

Created `.github/workflows/ci.yml`: a `test` job with a matrix over `[api, buyer-app]`
(checkout → pnpm/action-setup → setup-node@26 (cache pnpm) → `pnpm install --frozen-lockfile`
→ per-workspace typecheck/lint/test/build) and a `migrations` job with a `postgres:16`
service container running `pnpm --filter @douala-trust/api db:migrate` (DATABASE_URL
postgres://postgres:postgres@localhost:5432/douala_trust).

### 2026-10-02 — [WRITE] .gitignore

Uncommented `node_modules/` and `dist/` build-output entries.

### 2026-10-02 — [TEST] CI parity

`pnpm install --frozen-lockfile` passes locally; all per-workspace commands pass.

### 2026-10-02 — [CONCLUSION]

Done. PR/push CI added covering per-workspace typecheck/lint/test/build and a Postgres-backed
API migration check. `.gitignore` updated (Seeded file — project-facing ignore entries).

