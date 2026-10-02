# Buyer App

**Responsibility**: Mobile-first PWA for the buyer (Yaoundé): create a verification request
+ requirements, communicate, review the evidence package, record a decision
([architecture.md](../../2-design/architecture.md)).

**Technology**: Node.js (LTS) + TypeScript (strict), **Vite** build tooling, **Vitest**.
See [DEC-mvp-stack](../../decisions/DEC-mvp-stack.md) and
[DEC-mvp-tooling](../../decisions/DEC-mvp-tooling.md).

- **ORM / migration tool**: **none — consumes the API** (no direct database).
- **Test runner**: Vitest.

## Interfaces

- HTTP/JSON to the **API**: create request, list requests, discover verifiers, shortlist
  offers, review evidence, record decision ([api.md](../../2-design/api.md)).

## Requirements Addressed

| File | Type | Priority | Summary |
|------|------|----------|---------|
| [REQ-F-create-verification-request](../../1-spec/requirements/REQ-F-create-verification-request.md) | Functional | - | Buyer creates/commits a verification request |
| [REQ-F-review-evidence](../../1-spec/requirements/REQ-F-review-evidence.md) | Functional | - | Buyer reviews evidence package and decides |

## Relevant Decisions

| File | Title | Trigger |
|------|-------|---------|
| [DEC-mvp-stack](../../decisions/DEC-mvp-stack.md) | MVP backend and apps use Node + TypeScript | All new code in this component |
| [DEC-mvp-tooling](../../decisions/DEC-mvp-tooling.md) | Scaffolding toolchain (Vite, Vitest, pnpm) | Scaffolding / build / lint / test commands |
| [DEC-deferred-buyer-identity](../../decisions/DEC-deferred-buyer-identity.md) | Guest drafting; identity at request step | Request lifecycle / identity capture |
| [DEC-buyer-verifier-communication](../../decisions/DEC-buyer-verifier-communication.md) | Direct buyer–verifier communication | Messaging channel (deferred in MVP) |
