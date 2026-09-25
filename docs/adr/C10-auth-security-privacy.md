# C10 — Authorization, Security & Privacy

Canonical ADRs: **032 (includes 090), 033, 089, 091, 092**.

These decisions control *who* can see *what*, and how the platform avoids over-exposing
sensitive evidence.

---

## ADR-031 — Privacy Is Part of Evidence Design

**Status:** LOCKED

### Decision
Evidence collection should avoid unnecessarily exposing personal information.

### Example risks
Photographs may inadvertently capture people; addresses; documents; phone numbers;
financial info; private conversations; other products.

### Support
evidence guidance; redaction where appropriate; restricted access; retention policies;
role-based permissions.

The verifier needs enough evidence to prove the inspection occurred, but not unlimited
access to unrelated information.

---

## ADR-032 / ADR-090 — Evidence Access Should Be Role-Based (Least-Privilege)

**Status:** LOCKED (ADR-090 folded into 032)

### Decision
Not every participant automatically sees every piece of evidence; users access only what
their role and transaction context require (least-privilege).

### Example
- **Buyer:** full transaction evidence.
- **Seller:** relevant inspection evidence.
- **Verifier:** evidence required for their job.
- **Transporter:** package/custody info necessary for transport.
- **Dispute reviewer:** relevant evidence package.
- **Administrator:** access per operational/security policy.

Reduces unnecessary exposure of sensitive information.

---

## ADR-033 — Location Evidence Should Be Proportional

**Status:** LOCKED

### Decision
Establish that an inspection occurred where expected without exposing exact verifier
location to everyone.

### Possible evidence
coarse location; inspection address confirmation; geofence event; timestamp; device
metadata where legally/operationally appropriate.

### Goal
"The inspection occurred at the expected place" — not "everyone can continuously track the
verifier."

---

## ADR-089 — Authorization Should Be Evaluated at the Time of Action

**Status:** LOCKED

### Decision
Evaluate authorization when the operation occurs, not just at assignment time.

### Example
Verifier authorized at 10:00, revoked at 12:00, inspection submitted at 13:00. The platform
must not rely solely on the authorization existing at assignment time.

### Reason
Authorization can change during a transaction lifecycle.

---

## ADR-091 — Evidence Access Should Be Auditable

**Status:** LOCKED

### Decision
Access to sensitive evidence is itself recorded.

### Example
```
Actor:   Buyer U-912
Action:  VIEW_EVIDENCE
Evidence: EVIDENCE-18291
Timestamp: 2026-09-23T15:21Z
```
For sensitive evidence, knowing who accessed an artifact can be as important as knowing
who created it.

---

## ADR-092 — Evidence URLs Should Not Be Permanent Public Links

**Status:** LOCKED

### Decision
Evidence should not normally be exposed via permanently accessible public URLs.

### Use instead
short-lived signed URLs; authenticated download endpoints; access-controlled media
services.

### Reason
Evidence may be sensitive and must remain subject to authorization.

### Trade-off
Short-lived links make sharing less convenient.

### Mitigation
Seamless reauthorization for legitimate users.
