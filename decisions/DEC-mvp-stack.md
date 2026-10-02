# DEC-mvp-stack: MVP Backend and Apps Use Node + TypeScript

**Status**: Active

**Category**: Architecture

**Scope**: system-wide

**Source**: determined during MVP planning; grounded in [architecture.md](../2-design/architecture.md)

**Last updated**: 2026-10-02

## Context

The MVP design names a single backend API plus a mobile-first PWA for the buyer app
(`2-design/architecture.md`), but no language, runtime, or tooling was chosen, and no
decision recorded one. Without a stack decision the first code tickets cannot define their
build/test/migration commands, and every subsequent task would carry an unresolved choice.
This is a first-time decision that sets the precedent for all MVP code.

## Decision

The MVP is built on **Node.js (LTS) with TypeScript**, applied consistently across the API
and the frontend applications (buyer-app, and later verifier-app). One language across
backend and frontend minimizes context-switching for both humans and AI agents and gives a
single test/type/story for CI.

## Enforcement

### Trigger conditions

- **Design phase**: interface/architecture documents describe the API and apps as TypeScript.
- **Code phase**: all new code in `3-code/<component>/` is TypeScript; the chosen framework,
  ORM/migration tool, and test runner are recorded in the component's `CLAUDE.md` at the
  scaffold task.
- **Deploy phase**: deployments target a Node runtime (managed PaaS or small VPS).

### Required patterns

- TypeScript (strict) for all component source.
- Schema migrations are a committed, versioned mechanism (tool selected at the scaffold
  task and recorded in the component `CLAUDE.md`).
- Tests follow the repo's Testing Conventions (`Verifies:` markers, verification indexes in
  `3-code/CLAUDE.code.md`).

### Required checks

1. Every component builds and type-checks cleanly with the project's lint/type commands.
2. No second backend language is introduced for the MVP.

### Prohibited patterns

- Introducing untyped JavaScript into the API/component source.
- Adopting a different backend language without a new decision.
