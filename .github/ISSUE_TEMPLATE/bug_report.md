---
name: Bug report
about: Report a defect so it can be traced to a requirement, reproduced, and fixed with a regression test.
title: "bug: "
labels: ["bug", "needs-triage"]
assignees: ""
---

<!--
  Thank you for reporting a bug. Every field helps a human triage fast AND lets an
  automated agent locate the root cause, the requirement it violates, and the test that
  must cover the fix. Fill in as much as you can; "I don't know" for an ID is fine —
  leave it blank rather than guessing.
-->

## Summary
<!-- One or two sentences. What is broken, at a glance. This becomes the first search
     query an agent runs, so be concrete (component, action, symptom). -->

## Expected behavior
<!-- What SHOULD happen. If you know the requirement/AC it violates, say so: the correct
     behavior is defined there, not by you or the implementer. -->

## Actual behavior
<!-- What actually happens instead, including any error messages. -->

## Steps to reproduce
<!-- Numbered, deterministic steps. An agent must be able to replay them exactly. -->
1. 
2. 
3. 

## Environment
- **Component:** <!-- Must match a directory in 3-code/ (buyer-app | verifier-app | api | ...) -->
- **Device / platform:** <!-- e.g. Android on Cameroonian mobile data — this project targets it -->
- **Browser / app version:** 
- **Environment (dev / staging / prod):** 

## Traceability (SDLC)
<!-- The links that let an agent resolve this bug to the correct code, requirement, and test. -->
- **Requirement violated:** <!-- e.g. REQ-F-capture-evidence/AC-evidence-integrity -->
- **User story / goal:** <!-- e.g. US-perform-inspection -->
- **Design doc:** <!-- e.g. 2-design/inspection-state.md -->
- **Related task/fix:** <!-- TASK-... or FIX-... if known -->

## Impact
- **Severity:** <!-- Critical / High / Medium / Low -->
- **Who is affected and how:** 

## Proposed fix
<!-- Optional. Describe your hypothesis for the fix — don't implement it here. -->

## Suggested verification
<!-- What test / Verifies: marker should cover this once fixed, e.g.
     Verifies: REQ-F-capture-evidence/AC-evidence-integrity -->
