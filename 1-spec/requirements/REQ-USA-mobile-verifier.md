# REQ-USA-mobile-verifier: Guided, Low-Friction Mobile Inspection Workflow

**Type**: Usability

**Status**: Draft

**Priority**: Should-have

**Source**: [US-perform-inspection](../user-stories/US-perform-inspection.md)

**Source stakeholder**: [STK-verifier](../stakeholders.md)

## Description

The verifier workflow is mobile-first, guided and works under modest, variable data
connectivity in Douala: deterministic instructions, media compressed before upload, and the
ability to refuse unsafe/inconclusive tasks (ADR-006, ADR-027, ADR-029, ADR-046;
compression per ASM-cameroon-mobile-android).

## Acceptance Criteria

- **AC-guided-flow**: Given an assigned inspection, when the verifier proceeds, then the app
  provides deterministic, step-by-step instructions per requirement (ADR-006/046).
- **AC-media-efficient**: Given media capture, when uploaded, then files are compressed to
  sizes viable on Cameroonian mobile data (ASM-cameroon-mobile-android).
- **AC-can-refuse**: Given an unsafe or unanswerable task, when the verifier encounters it,
  then they can stop or mark it without penalty, using STOP / ESCALATE / INCONCLUSIVE
  (ADR-029/053).

## Related Assumptions

- [ASM-cameroon-mobile-android](../../1-spec/assumptions/ASM-cameroon-mobile-android.md)
