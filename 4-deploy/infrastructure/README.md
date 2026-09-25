# Infrastructure

Infrastructure-as-code for the project (Terraform modules, SAM/CloudFormation templates, Dockerfiles, Kubernetes manifests, …), created during Code-phase tasks that touch deployment (see [`../CLAUDE.deploy.md`](../CLAUDE.deploy.md)).

Document resource dependencies here, or in comments within the IaC files, as resources are added.

## MVP hosting decision (from 2-design/architecture.md)

Managed cloud, chosen for the Yaoundé ↔ Douala audience (Cameroonian mobile data, Android):

- **API**: single backend on a managed PaaS (Render/Railway/Fly) or a small regional VPS.
- **Authoritative state**: managed **PostgreSQL** (single source of truth — DEC-authoritative-single-source); append-only history table for evidence/inspection events.
- **Evidence binaries**: private **object storage** (Cloudflare R2 / S3), referenced by the DB, served via short-lived signed URLs (DEC-evidence-storage-separated, DEC-evidence-access-control, ADR-092).
- **Apps**: mobile-first **PWA** (buyer + verifier) served via Cloudflare for reach toward Cameroonian networks; verifier workflow optimized for low data (media compressed before upload — ASM-cameroon-mobile-android).
- **No broker/stream infra in the MVP** (defer ADR-113 outbox / ADR-132 projections / ADR-116 dead-letter).

Out of MVP (deferred): payments automation (Mobile Money — ASM-mobile-money), dispute engine, custody/logistics network, AI.

