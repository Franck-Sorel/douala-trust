---
title: "Schema + migrations: USER, VERIFIER, VERIFICATION_REQUEST, OFFER, REQUIREMENT"
issue: 6
---

# Schema + migrations: USER, VERIFIER, VERIFICATION_REQUEST, OFFER, REQUIREMENT

## Context

Epic **#1 — Verification Request** (issue #1), issue **#6**. This is the persistence
foundation every later Epic 1 ticket builds on (#7 create request, #9 availability,
#10 offer/claim). All decisions below were made and approved locally before this run.

Read these artifacts first — they are authoritative:

- `2-design/data-model.md` — entity and field definitions (**schema authority**).
- `2-design/inspection-state.md` — the request state machine values.
- `2-design/api.md` — the JSON contract (API field names differ from column names in
  places; that mapping belongs to issue #7, not here).
- `decisions/DEC-verifier-selection.md`, `decisions/DEC-requirements-first-class.md`,
  `decisions/DEC-mvp-tooling.md`, `decisions/DEC-deferred-buyer-identity.md`.
- `3-code/CLAUDE.code.md` (Testing Conventions: `Verifies:` markers + verification index)
  and `3-code/api/CLAUDE.md` (component decisions).

The scaffold (issue #5 / PR #13) is already present on this branch: pnpm workspace,
Drizzle + drizzle-kit wired via `3-code/api/drizzle.config.ts` (schema `./src/db/schema.ts`,
migrations out `./db/migrations`), scripts `db:generate` / `db:migrate` / `db:check`, and a
**placeholder** `app_info` table with migration `0000_adorable_cerise.sql` that this task
replaces.

## Goal

Replace the scaffold placeholder with the authoritative Epic 1 schema (five tables) and a
committed, versioned migration that applies cleanly from an empty database.

## Exact task

1. **Rewrite `3-code/api/src/db/schema.ts`** (single file — splitting into per-table files
   is out of scope) with the five tables and four enums defined below. The `app_info`
   placeholder is deleted, not kept ("real domain entities are introduced by their owning
   feature tasks; this placeholder is replaced then").
2. **Replace the placeholder migration**: delete everything under
   `3-code/api/db/migrations/` (the `0000_adorable_cerise.sql` file *and* `meta/`), then
   regenerate ONE initial migration with `pnpm --filter @douala-trust/api db:generate`.
   Nothing is deployed and PR #13 is not merged, so rewriting the initial migration is
   safe (frozen decision D6).
3. **Add one Vitest test** (`3-code/api/src/__tests__/schema-requirement-versioning.test.ts`)
   asserting the version-aware requirement model: the `requirements` table exposes
   `version`, and `verification_requests` exposes `requirement_set_version`, `state` and
   `version` columns. It must carry the marker
   `Verifies: REQ-F-requirements-first-class/AC-req-versioned` and a matching row in
   `3-code/api/verification.md`, added **in the same operation** (Testing Conventions).
4. **Run every verification command** below and record the results in your final message.
5. Leave **all changes uncommitted** — the workflow commits and opens the PR.

### Conventions (frozen)

- All identifiers are `uuid` primary keys with `DEFAULT gen_random_uuid()`
  (api.md: identifiers are opaque keys). Postgres 16 provides `gen_random_uuid()` natively.
- Table/column names are snake_case, following `2-design/data-model.md` (D2/D3).
- Closed value sets are PostgreSQL enums via drizzle `pgEnum` (D4).
- Free-form strings are `text` with **no length limits** — sizes are unspecified in the
  artifacts, so do not invent them (D5).
- Every `version` column is `integer NOT NULL DEFAULT 1` (optimistic concurrency, D7).
- All foreign keys use `ON DELETE RESTRICT` — no cascading deletes (D8).
- Timestamps: `created_at` on all five tables plus `claimed_at` on `offers`, all
  `timestamptz NOT NULL DEFAULT now()` (UTC). No `updated_at` — it is not specified (D9).

### Enums

| Enum name | Values |
|-----------|--------|
| `role` | `buyer`, `verifier`, `platform` |
| `availability_status` | `AVAILABLE`, `BUSY`, `SNOOZED`, `BANNED` |
| `offer_status` | `PENDING`, `CLAIMED`, `DECLINED`, `EXPIRED` |
| `request_state` | `CREATED`, `REQUIREMENTS_SET`, `VERIFIER_OFFERING`, `ASSIGNED`, `INSPECTION`, `REVIEW`, `DECISION_RECORDED` |

### Tables

**`users`**

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | uuid | PK, `DEFAULT gen_random_uuid()` |
| `role` | `role` enum | NOT NULL |
| `phone` | text | NOT NULL (no UNIQUE — not specified) |
| `kyc_status` | text | NULL — see D10 |
| `capabilities` | text[] | NULL (verifier-only field, ADR-027) |
| `created_at` | timestamptz | NOT NULL, `DEFAULT now()` |

**`verifiers`**

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | uuid | PK, `DEFAULT gen_random_uuid()` |
| `user_id` | uuid | NOT NULL, FK → `users.id` RESTRICT, **UNIQUE** (D12) |
| `availability_status` | `availability_status` enum | NOT NULL, `DEFAULT 'AVAILABLE'` |
| `version` | integer | NOT NULL, `DEFAULT 1` |
| `created_at` | timestamptz | NOT NULL, `DEFAULT now()` |

**`verification_requests`**

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | uuid | PK, `DEFAULT gen_random_uuid()` |
| `buyer_id` | uuid | NOT NULL, FK → `users.id` RESTRICT |
| `product_description` | text | NOT NULL |
| `location` | text | NOT NULL |
| `expected_identity` | text[] | NULL (optional identifiers, ADR-005/041) |
| `state` | `request_state` enum | NOT NULL, `DEFAULT 'CREATED'` |
| `requirement_set_version` | integer | NOT NULL, `DEFAULT 1` (D11) |
| `version` | integer | NOT NULL, `DEFAULT 1` |
| `created_at` | timestamptz | NOT NULL, `DEFAULT now()` |

**`offers`**

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | uuid | PK, `DEFAULT gen_random_uuid()` |
| `request_id` | uuid | NOT NULL, FK → `verification_requests.id` RESTRICT |
| `verifier_id` | uuid | NOT NULL, FK → `verifiers.id` RESTRICT |
| `status` | `offer_status` enum | NOT NULL, `DEFAULT 'PENDING'` |
| `version` | integer | NOT NULL, `DEFAULT 1` |
| `claimed_at` | timestamptz | NULL |
| `created_at` | timestamptz | NOT NULL, `DEFAULT now()` |

**`requirements`**

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | uuid | PK, `DEFAULT gen_random_uuid()` |
| `request_id` | uuid | NOT NULL, FK → `verification_requests.id` RESTRICT |
| `text` | text | NOT NULL — the requirement description (D3: API field `description` maps here in issue #7) |
| `expected_result` | text | NOT NULL |
| `test_method` | text | NOT NULL |
| `required_evidence` | text[] | NOT NULL, `DEFAULT '{}'` |
| `priority` | text | NULL — see D10 |
| `version` | integer | NOT NULL, `DEFAULT 1` |
| `created_at` | timestamptz | NOT NULL, `DEFAULT now()` |

## Frozen decisions (DO NOT CHANGE)

| # | Decision | Value |
|---|----------|-------|
| D1 | Primary keys | `uuid PK DEFAULT gen_random_uuid()` — opaque identifiers (api.md Conventions) |
| D2 | Table names | snake_case plural: `users`, `verifiers`, `verification_requests`, `offers`, `requirements` (avoids the reserved word `user`) |
| D3 | Column naming authority | `2-design/data-model.md` wins. API JSON field names (`description` vs column `text`) are issue #7's mapping, not this ticket |
| D4 | Closed value sets | Postgres `pgEnum` for `role`, `availability_status`, `offer_status`, `request_state` with exactly the values listed above |
| D5 | Free-form strings | `text`, no length limits (sizes unspecified in artifacts — do not invent any) |
| D6 | Migration strategy | Wipe `db/migrations/` (placeholder `0000_*` + `meta/`) and regenerate a single initial migration; nothing is deployed yet |
| D7 | Optimistic concurrency | every `version` column: `integer NOT NULL DEFAULT 1` (ADR-138/139) |
| D8 | Deletion policy | all FKs `ON DELETE RESTRICT` — no cascade |
| D9 | Timestamps | `timestamptz NOT NULL DEFAULT now()` for `created_at` (all tables) and `claimed_at` (`offers`, nullable); no `updated_at` |
| D10 | Unspecified value sets | `kyc_status` and `priority` are plain nullable `text` — no enum, no CHECK: the artifacts never define their values, and inventing them is forbidden |
| D11 | `requirement_set_version` | `integer NOT NULL DEFAULT 1` on `verification_requests`: a committed request carries set v1; Epic 2's freeze (inspection start) bumps it |
| D12 | Verifier↔user cardinality | `verifiers.user_id UNIQUE` (data-model ER: USER → zero-or-one VERIFIER) |
| D13 | Indexes | PKs and the UNIQUE from D12 only — no additional indexes (not specified) |
| D14 | Test scope | one Vitest test asserting the requirement-version columns exist, marker `Verifies: REQ-F-requirements-first-class/AC-req-versioned`, plus the matching `verification.md` row in the same operation |
| D15 | DB-backed verification | apply the migration from clean against the job's `DATABASE_URL` (Postgres 16 service), and keep `db:check` green |

## Out of scope

- Tables `INSPECTION`, `EVIDENCE`, `REQUIREMENT_RESULT`, `HISTORY_EVENT` (Epic 2) and any
  Epic 2 state/identity/evidence logic.
- Any HTTP endpoints or routes — create request (#7), availability listing (#9),
  offer/claim (#10). This ticket is schema + migration only.
- Requirement **freeze trigger** and version-bump behavior (Epic 2; issue #8 keeps the
  version-aware model only — no editing endpoints exist in Epic 1).
- Draft request persistence: drafts are ephemeral by decision
  (DEC-deferred-buyer-identity); only committed requests are stored.
- Seed data, extra indexes (D13), any rating/ranking field (prohibited by
  DEC-verifier-selection), `updated_at` columns.
- SDLC bookkeeping: do **not** modify `3-code/tasks.md`, requirement statuses, `decisions/`,
  or create `implementation-log/` entries — the human handles those after review.
- Anything inside `3-code/buyer-app/`.
- `git add` / `git commit` / `git push` (the workflow performs the commit and opens the PR).

## Acceptance criteria

From issue #6:

- [ ] `VERIFIER.availability_status` (AVAILABLE | BUSY | SNOOZED | BANNED) with `version`
      for optimistic concurrency. (Table `verifiers`.)
- [ ] `VERIFICATION_REQUEST` (buyer_id, product fields, optional expected_identity, state,
      version) as the authoritative owner. (Table `verification_requests`.)
- [ ] `OFFER` (request_id, verifier_id, status PENDING/CLAIMED/DECLINED/EXPIRED, version).
      (Table `offers`.)
- [ ] `REQUIREMENT` versioned (description, expected_result, test_method, required_evidence,
      priority; version); request carries `requirement_set_version`. (Table `requirements` +
      D11.)
- [ ] Migrations are committed, versioned, and runnable from clean.
- [ ] The version-aware model test exists with its `Verifies:` marker and verification-index
      row (maps REQ-F-requirements-first-class/AC-req-versioned → test).

## Verification commands

Run in order and report the outcome of each:

```bash
pnpm install --frozen-lockfile                        # skip if node_modules already present
pnpm --filter @douala-trust/api db:generate           # produces the new initial migration (after wiping db/migrations/)
pnpm --filter @douala-trust/api db:check
pnpm --filter @douala-trust/api db:migrate            # applies from clean using DATABASE_URL
pnpm --filter "@douala-trust/api" typecheck
pnpm --filter "@douala-trust/api" lint
pnpm --filter "@douala-trust/api" test
pnpm --filter "@douala-trust/api" build
pnpm typecheck && pnpm lint && pnpm test && pnpm build # whole workspace stays green (DEC-mvp-tooling check 1)
```

## Do not assume

> If any decision needed to complete this task is genuinely missing or ambiguous, implement
> only what is unambiguous, do NOT invent a choice, and report the open decision clearly in
> the agent's final message and in the PR body.
