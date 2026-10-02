# API

**Responsibility**: Single backend for the MVP: request create/commit, verifier
discovery/shortlist/claim, state-transition validation, idempotency, evidence access
control ([architecture.md](../../2-design/architecture.md), [api.md](../../2-design/api.md)).

**Technology**: Node.js (LTS) + TypeScript (strict), **Fastify**, **Drizzle ORM** +
`drizzle-kit` on **PostgreSQL** (node-postgres driver), **Vitest**. See
[DEC-mvp-stack](../../decisions/DEC-mvp-stack.md) and
[DEC-mvp-tooling](../../decisions/DEC-mvp-tooling.md).

- **ORM / migration tool**: Drizzle + drizzle-kit, committed/versioned migrations in
  `db/migrations/`.
- **Test runner**: Vitest.

## Interfaces

- HTTP/JSON with **buyer-app** (PWA): create request, list, discover verifiers, shortlist
  offers, claim, review evidence/record decision ([api.md](../../2-design/api.md)).
- PostgreSQL: authoritative state + append-only history (single source of truth,
  [DEC-authoritative-single-source](../../decisions/DEC-authoritative-single-source.md)).
- Object storage (evidence binaries) — deferred to the evidence/capture scope.

## Requirements Addressed

| File | Type | Priority | Summary |
|------|------|----------|---------|
| [REQ-F-create-verification-request](../../1-spec/requirements/REQ-F-create-verification-request.md) | Functional | - | Buyer creates/commits a verification request |
| [REQ-F-requirements-first-class](../../1-spec/requirements/REQ-F-requirements-first-class.md) | Functional | - | Requirements are structured, versioned data |
| [REQ-F-inspection-results](../../1-spec/requirements/REQ-F-inspection-results.md) | Functional | - | Explicit outcome semantics per requirement |
| [REQ-F-product-identity](../../1-spec/requirements/REQ-F-product-identity.md) | Functional | - | Product identity established and verified |
| [REQ-F-capture-evidence](../../1-spec/requirements/REQ-F-capture-evidence.md) | Functional | - | Evidence capture append-only and provenanced |
| [REQ-SEC-evidence-access](../../1-spec/requirements/REQ-SEC-evidence-access.md) | Security | - | Evidence access role-based, least-privilege |

## Relevant Decisions

| File | Title | Trigger |
|------|-------|---------|
| [DEC-mvp-stack](../../decisions/DEC-mvp-stack.md) | MVP backend and apps use Node + TypeScript | All new code in this component |
| [DEC-mvp-tooling](../../decisions/DEC-mvp-tooling.md) | Scaffolding toolchain (Fastify, Drizzle, Vitest, pnpm) | Scaffolding / build / lint / test / migration commands |
| [DEC-authoritative-single-source](../../decisions/DEC-authoritative-single-source.md) | Authoritative state is single source of truth | Storage / reads |
| [DEC-idempotency](../../decisions/DEC-idempotency.md) | Critical writes idempotent with validation | Write endpoints |
| [DEC-state-transition-validation](../../decisions/DEC-state-transition-validation.md) | State changes validated, atomic, versioned | State-changing commands |
| [DEC-verifier-selection](../../decisions/DEC-verifier-selection.md) | Buyer selects verifiers; first responder claims | Assignment / offer/claim handling |
| [DEC-deferred-buyer-identity](../../decisions/DEC-deferred-buyer-identity.md) | Guest drafting; identity at request step | Request lifecycle |
| [DEC-evidence-access-control](../../decisions/DEC-evidence-access-control.md) | Evidence access role-based, least-privilege | Authorization |
