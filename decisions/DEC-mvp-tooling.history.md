# DEC-mvp-tooling: Trail

> Companion to `DEC-mvp-tooling.md`.
> AI agents read this only when evaluating whether the decision is still
> valid or when proposing a change or supersession.

## Alternatives considered

### Option A: npm workspaces + Express + Prisma + Jest
- Pros: all extremely widely adopted, low onboarding risk.
- Cons: Express validation is manual; Prisma adds a schema DSL + codegen layer that is
  harder to audit; Jest has ESM/TS config friction.

### Option B: pnpm workspaces + Fastify + Drizzle + Vitest (chosen)
- Pros: single language, TS-first tooling end to end; Fastify has built-in JSON-Schema
  validation; Drizzle is SQL-close with committed drizzle-kit migrations and no codegen;
  Vitest is fast and ESM/TS native; pnpm workspaces are strict with disk-efficient store.
- Cons: smaller-than-maximum ecosystems relative to Express/Prisma/Jest (still very much
  backed by the Node community).

### Option C: pnpm workspaces + Hono + node-postgres + node:test
- Pros: minimal dependencies, edge-friendly Hono, zero extra test framework.
- Cons: Hono's ecosystem is smaller for a stateful Postgres API; node:test has sparser
  assertion/coverage ergonomics.

## Reasoning

The repository already committed to Node + TypeScript (strict) via DEC-mvp-stack. The
chosen set keeps every layer TS-first and strict (Fastify + Drizzle + Vitest), avoids
codegen/DSL indirection (Drizzle over Prisma), and gives predictable, committed migrations
backed by a real PostgreSQL. pnpm workspaces preserve per-component isolation as required
by `3-code/CLAUDE.code.md`.

Trade-offs accepted: not the largest-ecosystem option for each tool (Express/Prisma/Jest),
and pnpm adds one tool dependency vs. plain npm. Invalidated if the team decides a
schema-DSL ORM or the all-Jest ecosystem is more valuable than strictness/simplicity.

## User involvement

**Type**: ai-proposed/user-approved

**Notes**: Approvals captured from the parent agent for issue #5: D1 Fastify, D2 Drizzle +
drizzle-kit, D3 Vitest, D4 pnpm workspaces, D5 CI design, PWA build tooling Vite, Node 26
pin (engines `>=24`), buyer-app migration "none".

## Changelog

| Date | Change | Involvement |
|------|--------|-------------|
| 2026-10-02 | Initial decision | ai-proposed/user-approved |
