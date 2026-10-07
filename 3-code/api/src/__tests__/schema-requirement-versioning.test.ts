import { getTableColumns, getTableName } from 'drizzle-orm';
import { describe, expect, it } from 'vitest';
import { requirements, verificationRequests } from '../db/schema.js';

describe('Epic 1 schema versioning', () => {
  // Verifies: REQ-F-requirements-first-class/AC-req-versioned
  it('exposes version columns on requirements and verification_requests', () => {
    expect(getTableName(requirements)).toBe('requirements');
    const requirementColumns = getTableColumns(requirements);
    expect(requirementColumns).toHaveProperty('version');
    expect(requirementColumns.version.name).toBe('version');

    expect(getTableName(verificationRequests)).toBe('verification_requests');
    const requestColumns = getTableColumns(verificationRequests);
    expect(requestColumns).toHaveProperty('requirementSetVersion');
    expect(requestColumns.requirementSetVersion.name).toBe('requirement_set_version');
    expect(requestColumns).toHaveProperty('state');
    expect(requestColumns.state.name).toBe('state');
    expect(requestColumns).toHaveProperty('version');
    expect(requestColumns.version.name).toBe('version');
  });
});
