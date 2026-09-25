# DEC-authoritative-single-source: Authoritative State Is the Single Source of Truth

**Status**: Active

**Category**: Architecture

**Scope**: system-wide

**Source**: n/a (determined during MVP design; grounded in ADR-130/131/134)

**Last updated**: 2026-09-23

## Context

Caches, search indexes and projections can lag or become stale; critical decisions must use
authoritative state (ADR-134). Derived state must remain reconstructable from authoritative
data (ADR-130) and must never become the sole source of truth (ADR-131).

## Decision

The relational database holds the authoritative transactional state and append-only history;
any derived view is rebuildable from it. MVP uses a single modest database (no asynchronous
projections yet — ADR-037 permits a conventional DB with append-only events). Where a later
projection exists, critical decision paths read authoritative state, never the derived copy.

## Enforcement

### Trigger conditions

- **Design phase**: architecture marks the postgres store as authoritative and derived views
  as rebuildable.
- **Code phase**: critical reads (inspection state, decision conditions) hit authoritative
  data, not caches.
- **Deploy phase**: backups of the authoritative store enable reconstruction.

### Required patterns

- Authoritative: transactions/events; derived: any search/report view (ADR-132).
- Projections retain the ability to be rebuilt from events (ADR-132/133) and lag is explicit
  if ever introduced (ADR-133).

### Required checks

1. No critical decision path depends exclusively on a derived/cached value (ADR-134).
2. Derived views can be reconstructed from authoritative records (ADR-130, ADR-131).

### Prohibited patterns

- Treating a search index or cache as authoritative for transactional facts.
- Deferring the MVP's decision logic onto a possibly-stale projection.
