---
name: Feature request
about: Propose a new capability, mapped to a user story and a testable requirement.
title: "feat: "
labels: ["enhancement"]
assignees: ""
---

<!--
  This project follows an AI-first SDLC: goals → user stories → requirements →
  design → tasks → code → tests. A feature request is the entry point of that chain.
  Fill in the traceability block so an agent (and a human) knows whether you are
  proposing a NEW artifact or a CHANGE to an existing one, and which decisions constrain it.
  A feature is not "done" until it maps to an Approved requirement the agents can test against.
-->

## Problem / Opportunity
<!-- The need, not a prescribed solution. Who is affected, and why it matters.
     Keep this separate from any proposed implementation. -->

## User story
<!-- Match the repo's spec format so it can become a US-* file directly. -->
As a <!-- role or STK-buyer / STK-verifier / STK-seller / STK-platform -->,
I want to <!-- capability -->,
so that <!-- benefit -->.

## Acceptance criteria
<!-- Concrete, checkable outcomes, phrased in the repo's AC-* style
     (Given ... when ... then ...). Agents turn these into tests with Verifies: markers. -->
- [ ] Given ..., when ..., then ...
- [ ] Given ..., when ..., then ...

## Traceability (SDLC)
- **Goal:** <!-- GOAL-... if it serves an existing goal -->
- **User story:** <!-- US-... existing, or "new" -->
- **Requirement:** <!-- REQ-... existing, or "new" — note: new features need an Approved requirement before design -->
- **Constraint check:** <!-- Does this respect CON-mvp-scope, CON-verification-not-certification, CON-separate-responsibilities? -->
- **Decisions / ADRs that apply:** <!-- DEC-... / ADR-... -->

## Out of scope
<!-- Explicitly list what this does NOT include, to keep the MVP lean per CON-mvp-scope. -->

## Open questions
<!-- Anything ambiguous that a human or an agent must clarify before work starts. -->
