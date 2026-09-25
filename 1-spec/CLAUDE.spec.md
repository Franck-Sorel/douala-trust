Phase-specific instructions for the **Specification** phase. Extends [../CLAUDE.md](../CLAUDE.md).

## Purpose

This phase defines **what** we're building and **why**. Focus on clarity, measurability, and alignment with stakeholder needs.

## Phase artifacts

| Artifact | Location | Purpose |
|----------|----------|---------|
| Stakeholders | [`stakeholders.md`](stakeholders.md) | Roles with interests and influence |
| Goals | [`goals/`](goals/) | High-level outcomes |
| User Stories | [`user-stories/`](user-stories/) | User-facing capabilities |
| Requirements | [`requirements/`](requirements/) | Testable system requirements |
| Assumptions | [`assumptions/`](assumptions/) | Beliefs taken as true but not verified |
| Constraints | [`constraints/`](constraints/) | Hard limits on design and implementation |

---

## AI Guidelines

**Status dates**: when an artifact's status changes, append the transition date to the new value — e.g., `Status: Approved (2026-08-19)`, `Status: Implemented (2026-09-02)`. Rules and gates that match on a status name ignore the date suffix.

### Per-artifact guidance

**Stakeholders**: ask who uses, funds, operates, or is affected by the system. Record influence level honestly — it drives conflict resolution. Add entries to [`stakeholders.md`](stakeholders.md).

**Goals**: decompose vague ideas into concrete, measurable outcomes. Use MoSCoW priority consistently.
Status lifecycle: `Draft → Approved → Achieved → Deprecated`. Only the user can approve or deprecate. When all linked requirements reach `Implemented`, the agent reviews the success criteria and proposes `Achieved` — set only after user confirmation (status-propagation step of `/SDLC-execute-task`).

**User Stories**: use "As a [role], I want [capability], so that [benefit]." The role is a plain role name (not an STK id); it must be traceable to existing stakeholders via the `Source stakeholder` field (one or more STK ids), with no fixed cardinality in either direction. Acceptance criteria at the story level are high-level; detailed criteria live in requirements.
Status lifecycle: `Draft → Approved → Implemented → Deprecated`. Only the user can approve or deprecate. The agent marks `Implemented` when all linked requirements reach `Implemented` (automated by the status-propagation step of `/SDLC-execute-task`).

**Requirements**: use clear, testable language (not "should be fast" — use "response time < 200ms at p95"). Choose the correct requirement class. Acceptance criteria carry stable `AC-kebab-name` IDs — naming rules in `CLAUDE.md`, change impact in the status-downgrade procedure of `/SDLC-elicit`.
Requirement classes: `REQ-F` Functional, `REQ-PERF` Performance, `REQ-SEC` Security, `REQ-REL` Reliability, `REQ-USA` Usability, `REQ-MNT` Maintainability, `REQ-PORT` Portability, `REQ-SCA` Scalability, `REQ-COMP` Compliance.
Status lifecycle: `Draft → Approved → Implemented → Deprecated`. Only the user can approve or deprecate. The agent marks `Implemented` when all linked tasks reach Done (automated by the status-propagation step of `/SDLC-execute-task`).

**Assumptions**: always record the risk level (what happens if wrong?) and a verification plan when possible.
Status lifecycle: `Unverified → Verified | Invalidated`. The agent marks `Verified` when the verification plan confirms the assumption. Only the user can mark `Invalidated` (triggers impact analysis on dependent artifacts).

**Constraints**: consider technical (platforms, dependencies), business (budget, timeline, team size), and operational (hosting, compliance) categories.
Status lifecycle: `Active → Lifted`. Only the user can lift a constraint.

### Conflict resolution

A conflict exists when two or more requirements cannot both be satisfied as stated.

**Never resolve a conflict silently.** Always surface it before acting.

1. **Identify**: note conflicting requirement IDs, source stakeholders, influence levels, and why they are incompatible.
2. **Ask the user**: present what makes them incompatible, stakeholders and influence levels, two or more resolution options, and a recommended option if one is clearly better.
3. **Wait for explicit approval** before modifying any file.
4. **Apply**: update affected requirement files and index rows. Update dependent user stories or goals if affected. Record a decision if the resolution imposes a recurring constraint.
5. **Verify**: no artifacts remain in a conflicting state after resolution.

### Assumption invalidation

When an assumption is found to be wrong or no longer holds:

1. **Identify impact**: list all artifacts (requirements, user stories, decisions) that depend on the invalidated assumption.
2. **Ask the user**: present the invalidated assumption, the affected artifacts, and proposed adjustments or alternatives.
3. **Wait for explicit approval** before modifying any file.
4. **Apply**: change the assumption's Status to `Invalidated`. Update or flag all dependent artifacts as directed.
5. **Verify**: no artifacts remain based on the invalidated assumption without acknowledgment.

### Artifact deprecation

When an artifact (goal, user story, requirement) is no longer relevant:

1. Propose deprecation to the user with rationale and downstream impact.
2. Wait for explicit approval.
3. Change Status to `Deprecated` in the artifact file. Update its index row.
4. Check for dependent artifacts — flag any that reference the deprecated item. For requirements, this includes verification links: tests carrying `Verifies:` markers and rows in the verification indexes (`3-code/verification.md`, `3-code/<component>/verification.md`) that reference the deprecated requirement. Their cleanup happens in the Code phase (`/SDLC-fix`); this procedure only surfaces them.

---

## Decisions Relevant to This Phase

| File | Title | Trigger |
|------|-------|---------|
| [DEC-mvp-scope](../decisions/DEC-mvp-scope.md) | MVP is one verification transaction, not the platform | Defining MVP requirements/scope |
| [DEC-verifier-independent-evidence](../decisions/DEC-verifier-independent-evidence.md) | Verifier is an independent evidence producer | Defining roles/separation |
| [DEC-verification-not-certification](../decisions/DEC-verification-not-certification.md) | Verified ≠ certified; integrity ≠ truth | Wording any "verified" claim |
| [DEC-product-identity](../decisions/DEC-product-identity.md) | Identity established before inspection; mismatch blocks | Requirements on inspection flow |
| [DEC-requirements-first-class](../decisions/DEC-requirements-first-class.md) | Requirements are structured and frozen | Requirements modeling |
| [DEC-outcome-semantics](../decisions/DEC-outcome-semantics.md) | PASS/FAIL/INCONCLUSIVE/NOT_TESTED distinct | Inspection result modeling |
| [DEC-inspection-state-separation](../decisions/DEC-inspection-state-separation.md) | Transaction/inspection/decision are independent states | Lifecycle requirements |
| [DEC-evidence-immutable-append-only](../decisions/DEC-evidence-immutable-append-only.md) | Evidence history is immutable | Evidence capture requirements |
| [DEC-evidence-access-control](../decisions/DEC-evidence-access-control.md) | Evidence access role-based, least-privilege | Security requirements |

---

## Linking to Other Phases

- Goals, user stories, constraints, assumptions, and requirements are referenced in design documents (`2-design/`)
- Requirements determine the development tasks in `3-code/tasks.md`; each task references the requirements it fulfills
- Acceptance criteria are verified by tests: tests reference them by `REQ-CLASS-name/AC-name` address, and the mapping is recorded in the verification indexes (see Testing Conventions in `3-code/CLAUDE.code.md`)

---

## Goals Index

| File | Stakeholder | Priority | Status | Summary |
|------|-------------|----------|--------|---------|
| [GOAL-mvp-trust-transaction](goals/GOAL-mvp-trust-transaction.md) | STK-platform, STK-buyer | Must-have | Draft | Prove a remote (Yaoundé) buyer acts on a Douala verifier's evidence |

---

## User Stories Index

| File | Role | Goal | Priority | Status | Summary |
|------|------|------|----------|--------|---------|
| [US-request-verification](user-stories/US-request-verification.md) | buyer | GOAL-mvp-trust-transaction | Must-have | Draft | Buyer creates a Douala verification request with requirements |
| [US-perform-inspection](user-stories/US-perform-inspection.md) | verifier | GOAL-mvp-trust-transaction | Must-have | Draft | Verifier inspects, confirms identity, captures evidence |
| [US-review-evidence](user-stories/US-review-evidence.md) | buyer | GOAL-mvp-trust-transaction | Must-have | Draft | Buyer reviews the evidence package and decides |

---

## Requirements Index

| File | Type | Source | Priority | Status | Summary |
|------|------|--------|----------|--------|---------|
| [REQ-F-create-verification-request](requirements/REQ-F-create-verification-request.md) | Functional | US-request-verification | Must-have | Approved | Buyer creates a verification request |
| [REQ-F-requirements-first-class](requirements/REQ-F-requirements-first-class.md) | Functional | US-request-verification | Must-have | Approved | Requirements are structured, frozen, versioned |
| [REQ-F-product-identity](requirements/REQ-F-product-identity.md) | Functional | US-perform-inspection | Must-have | Approved | Identity established; mismatch blocks |
| [REQ-F-capture-evidence](requirements/REQ-F-capture-evidence.md) | Functional | US-perform-inspection | Must-have | Approved | Append-only, provenanced, integrity-checked evidence |
| [REQ-F-inspection-results](requirements/REQ-F-inspection-results.md) | Functional | US-perform-inspection | Must-have | Approved | Explicit PASS/FAIL/INCONCLUSIVE/NOT_TESTED outcomes |
| [REQ-F-review-evidence](requirements/REQ-F-review-evidence.md) | Functional | US-review-evidence | Must-have | Approved | Buyer reviews package and records a separate decision |
| [REQ-SEC-evidence-access](requirements/REQ-SEC-evidence-access.md) | Security | US-review-evidence | Must-have | Draft | Role-based, least-privilege, no public URLs |
| [REQ-USA-mobile-verifier](requirements/REQ-USA-mobile-verifier.md) | Usability | US-perform-inspection | Should-have | Draft | Guided, low-friction mobile verifier workflow |

---

## Assumptions Index

| File | Category | Status | Risk | Summary |
|------|----------|--------|------|---------|
| [ASM-yaounde-douala-market](assumptions/ASM-yaounde-douala-market.md) | Business | Unverified | High | First market is domestic Yaoundé buyers of Douala products |
| [ASM-cameroon-mobile-android](assumptions/ASM-cameroon-mobile-android.md) | Environment | Unverified | Medium | Users on Cameroonian mobile data and Android |
| [ASM-mobile-money](assumptions/ASM-mobile-money.md) | Business | Unverified | Medium | Value settlement later via Mobile Money (FCFA) |

---

## Constraints Index

| File | Category | Status | Summary |
|------|----------|--------|---------|
| [CON-mvp-scope](constraints/CON-mvp-scope.md) | Business | Active | MVP verifies one transaction, not the platform |
| [CON-verification-not-certification](constraints/CON-verification-not-certification.md) | Business | Active | Platform verification is not professional certification |
| [CON-separate-responsibilities](constraints/CON-separate-responsibilities.md) | Business | Active | No single actor controls the whole transaction |
