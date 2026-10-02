import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

/**
 * Scaffold-level table that proves the committed, versioned migration pipeline end to end.
 * The real domain entities (USER, VERIFIER, OFFER, VERIFICATION_REQUEST, REQUIREMENT,
 * INSPECTION, EVIDENCE, REQUIREMENT_RESULT, HISTORY_EVENT — see 2-design/data-model.md)
 * are introduced by their owning feature tasks; this placeholder is replaced then.
 */
export const appInfo = pgTable('app_info', {
  key: varchar('key', { length: 64 }).primaryKey(),
  value: varchar('value', { length: 255 }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
