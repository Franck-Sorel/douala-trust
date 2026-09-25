# ASM-cameroon-mobile-android: Users Are On Cameroonian Mobile Data and Android

**Category**: Environment

**Status**: Unverified

**Risk if wrong**: Medium — if verifiers/buyers have reliable high-bandwidth connections or
use iOS, media handling and compression choices are over-conservative but not fatal.

## Statement

Buyers and verifiers access the platform primarily via mobile devices on Cameroonian mobile
networks (MTN / Orange Cameroon / CAMTEL / NEXTtel), largely Android, often older/lower-RAM
devices with modest and variable data connectivity.

## Rationale

The verifier workflow is camera-heavy (photo/video evidence capture, ADR-038). Uploading
large media from Douala over limited mobile data is the main operational cost.

## Verification Plan

In the pilot, assess device types, connection reliability and acceptable upload sizes in
Douala; adjust media compression (resize/compress before upload) accordingly.

## Related Artifacts

- [REQ-F-capture-evidence](../requirements/REQ-F-capture-evidence.md)
