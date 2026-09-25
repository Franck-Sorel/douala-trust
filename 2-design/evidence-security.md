# Evidence & Access Security

**Status**: Draft

**Purpose**: How evidence is stored, integrity-protected, and access-controlled — grounded
in the evidence storage/access ADRs. The buyer-facing evidence package rules are in
`data-model.md` (REQUIREMENT_RESULT) and `architecture.md`.

## Storage separation (ADR-038)

Binaries (photos/videos) live in private object storage; the relational DB stores metadata
and references — never inline blobs
([DEC-evidence-storage-separated](../decisions/DEC-evidence-storage-separated.md)).

```
Photo  →  Object storage (R2/S3, private)
              ↑ signed URL
Evidence row (Postgres): storage_reference, content_hash, provenance, relations
```

## Integrity (ADR-095/096)

- Every artifact gets a SHA-256 `content_hash` at ingest; re-hashing the stored object must
  match, or the system flags alteration (ADR-095).
- A hash proves file consistency, **not** that the observation is truthful
  (ADR-096). User-facing copy never presents a hash as proof of authenticity/truth
  ([DEC-verification-not-certification](../decisions/DEC-verification-not-certification.md)).

## Provenance (ADR-097, ADR-034)

Each evidence item records `created_by`, `created_at`, `capture_device`, `source`,
`upload_method`, and links (transaction / inspection / requirement), so the platform can
answer *who, when, for what, during which inspection*.

## Access control (ADR-031/032, ADR-090/092)

- Role-based, least-privilege
  ([DEC-evidence-access-control](../decisions/DEC-evidence-access-control.md)):

| Role | Evidence access |
|------|-----------------|
| Buyer | Their transaction's evidence |
| Verifier | Evidence for assigned inspections |
| Platform/Support | Per support policy |
| Admin | Privileged, audited access |

- Evidence is served via **short-lived signed URLs / authenticated endpoints**, never
  permanent public links (ADR-092).
- Access to sensitive evidence is auditable (ADR-091).
- PII minimized at capture; redaction supported where needed (ADR-093/094).

## Retention & deletion (ADR-039/040)

- Configurable retention per category; extended automatically while a dispute/legal hold
  exists (ADR-039).
- Deletions are themselves auditable — the system records that evidence existed and was
  deleted, it does not pretend it never existed (ADR-040).

## Related requirements

- [REQ-SEC-evidence-access](../1-spec/requirements/REQ-SEC-evidence-access.md)
- [REQ-F-capture-evidence](../1-spec/requirements/REQ-F-capture-evidence.md)
