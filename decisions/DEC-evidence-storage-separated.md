# DEC-evidence-storage-separated: Binary Evidence Lives Outside the Transactional DB

**Status**: Active

**Category**: Data

**Scope**: system-wide

**Source**: [REQ-F-capture-evidence](../1-spec/requirements/REQ-F-capture-evidence.md)

**Last updated**: 2026-09-23

## Context

Photos/videos/attachments are large binary objects. Embedding them in the transactional
model bloats it and couples scaling to the DB (ADR-038). Evidence must also carry provenance
and integrity (ADR-095, ADR-097) and be retained under explicit policy (ADR-039).

## Decision

Binary evidence is stored in object storage; the transactional database stores references
(storage_reference, content_hash, provenance, relation). Evidence is durable, replicated,
and retained per an explicit, dispute-aware policy (ADR-038, ADR-039).

## Enforcement

### Trigger conditions

- **Design phase**: data model separates an `Evidence` metadata row from the stored artifact.
- **Code phase**: uploads go to object storage; DB rows reference them; hashes computed and
  stored.
- **Deploy phase**: object storage with backup/replication; retention policies configurable.

### Required patterns

- Evidence row: evidence_id, transaction/inspection/requirement refs, type,
  storage_reference, content_hash, created_at, created_by (ADR-038).
- Provenance captured (ADR-097), retention policy explicit and extended on dispute/hold
  (ADR-039/040).

### Required checks

1. No binary blob persisted inside the transactional DB row.
2. Evidence hash is computed at ingest and used for verification (ADR-095).

### Prohibited patterns

- Storing media inline in the relational DB.
- Serving evidence via permanent public URLs (see DEC-evidence-access-control, ADR-092).
