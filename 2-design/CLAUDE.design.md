Phase-specific instructions for the **Design** phase. Extends [../CLAUDE.md](../CLAUDE.md).

## Purpose

This phase defines **how** we're building the system. Focus on the architecture, the project's design concerns (data, interfaces, UX, security, performance, …), and key technical decisions.

## Design Documents Index

The design surface is project-defined: `architecture.md` is mandatory and always present; every other document is selected and created during design work (see `/SDLC-design`), from [`_template.md`](_template.md). This index is the single source of truth for which design documents the project maintains.

| File | Purpose | Status |
|------|---------|--------|
| [`architecture.md`](architecture.md) | System architecture: components, responsibilities, interactions | Draft |
| [`data-model.md`](data-model.md) | Persistence entities, frozen requirements, separated evidence, history | Draft |
| [`inspection-state.md`](inspection-state.md) | State machines, outcome semantics, transition validation | Draft |
| [`evidence-security.md`](evidence-security.md) | Evidence storage separation, integrity, access control, retention | Draft |
| [`api.md`](api.md) | API/interface design: endpoints, payloads, error semantics, offer/claim | Draft |
<!-- Add a row for each design document created, in the same operation as the document change. If a listed document turns out not to be needed, remove its row and delete the file — a design change that follows the /SDLC-design procedures. -->

Each document carries a `**Status**:` field — `Stub` (placeholder) | `Draft` (content in progress) | `Approved (YYYY-MM-DD)` — maintained through the `/SDLC-design` procedures together with its index row; modifying an `Approved` document reverts it to `Draft`.

## Document Granularity

Keep each document focused on a single concern and reasonably small — documents are loaded selectively, and small focused documents cost fewer tokens. When a document outgrows its high-level scope, split it: the parent keeps the high-level view and links to sub-documents (e.g., `architecture.md` stays high-level while `architecture-<component>.md` details one component's internals; the same applies to data models, interface designs, and any other concern). Every sub-document gets its own index row and `**Status**:` field.

---

## Decisions Relevant to This Phase

| File | Title | Trigger |
|------|-------|---------|
| [DEC-mvp-scope](../decisions/DEC-mvp-scope.md) | MVP is one verification transaction, not the platform | Scoping components/tech |
| [DEC-verifier-independent-evidence](../decisions/DEC-verifier-independent-evidence.md) | Verifier is an independent evidence producer | Component/actor model |
| [DEC-evidence-over-verdicts](../decisions/DEC-evidence-over-verdicts.md) | Report observations, not verdicts | Result data model |
| [DEC-verification-not-certification](../decisions/DEC-verification-not-certification.md) | Verified ≠ certified; integrity ≠ truth | Wording/claims, hash usage |
| [DEC-product-identity](../decisions/DEC-product-identity.md) | Identity before inspection; mismatch blocks | Inspection flow |
| [DEC-requirements-first-class](../decisions/DEC-requirements-first-class.md) | Requirements structured and frozen | Data model |
| [DEC-outcome-semantics](../decisions/DEC-outcome-semantics.md) | PASS/FAIL/INCONCLUSIVE/NOT_TESTED distinct | Result enum + report |
| [DEC-inspection-state-separation](../decisions/DEC-inspection-state-separation.md) | Independent state machines | State model |
| [DEC-buyer-verifier-communication](../decisions/DEC-buyer-verifier-communication.md) | Direct buyer–verifier communication | Messaging channel |
| [DEC-evidence-immutable-append-only](../decisions/DEC-evidence-immutable-append-only.md) | Evidence history is immutable | Append-only events |
| [DEC-evidence-storage-separated](../decisions/DEC-evidence-storage-separated.md) | Binaries outside the transactional DB | Storage topology |
| [DEC-evidence-access-control](../decisions/DEC-evidence-access-control.md) | Role-based, least-privilege access | Authorization, signed URLs |
| [DEC-state-transition-validation](../decisions/DEC-state-transition-validation.md) | State changes validated, atomic, versioned | Command handling |
| [DEC-idempotency](../decisions/DEC-idempotency.md) | Critical writes idempotent with validation | API design |
| [DEC-time-semantics](../decisions/DEC-time-semantics.md) | Typed timestamps, server UTC time | Data model |
| [DEC-authoritative-single-source](../decisions/DEC-authoritative-single-source.md) | Authoritative state is single source of truth | Storage/reads |
| [DEC-mvp-stack](../decisions/DEC-mvp-stack.md) | MVP backend and apps use Node + TypeScript | Choosing components/tech |
| [DEC-verifier-selection](../decisions/DEC-verifier-selection.md) | Buyer selects verifiers; first responder claims | Assignment/data model/API |
| [DEC-deferred-buyer-identity](../decisions/DEC-deferred-buyer-identity.md) | Guest drafting; identity at request step | Request lifecycle/identity |
---

## Linking to Other Phases

- Reference requirements from `1-spec/` to justify design choices
- Design documents guide implementation in `3-code/`
- Infrastructure design informs deployment in `4-deploy/`
