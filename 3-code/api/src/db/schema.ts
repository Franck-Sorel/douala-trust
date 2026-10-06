import { integer, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

/**
 * Epic 1 persistence schema (issue #6) — authoritative source: 2-design/data-model.md,
 * with closed value sets from 2-design/inspection-state.md and
 * decisions/DEC-verifier-selection.md.
 *
 * Conventions (frozen): opaque uuid PKs (api.md), snake_case names, Postgres enums for
 * closed value sets, unrestricted `text` for free-form strings, `integer DEFAULT 1`
 * optimistic-concurrency versions, `ON DELETE RESTRICT` foreign keys, no `updated_at`.
 */

export const roleEnum = pgEnum('role', ['buyer', 'verifier', 'platform']);

export const availabilityStatusEnum = pgEnum('availability_status', [
  'AVAILABLE',
  'BUSY',
  'SNOOZED',
  'BANNED',
]);

export const offerStatusEnum = pgEnum('offer_status', [
  'PENDING',
  'CLAIMED',
  'DECLINED',
  'EXPIRED',
]);

export const requestStateEnum = pgEnum('request_state', [
  'CREATED',
  'REQUIREMENTS_SET',
  'VERIFIER_OFFERING',
  'ASSIGNED',
  'INSPECTION',
  'REVIEW',
  'DECISION_RECORDED',
]);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  role: roleEnum('role').notNull(),
  phone: text('phone').notNull(),
  kycStatus: text('kyc_status'),
  capabilities: text('capabilities').array(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const verifiers = pgTable('verifiers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'restrict' }),
  availabilityStatus: availabilityStatusEnum('availability_status')
    .notNull()
    .default('AVAILABLE'),
  version: integer('version').notNull().default(1),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const verificationRequests = pgTable('verification_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  buyerId: uuid('buyer_id')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict' }),
  productDescription: text('product_description').notNull(),
  location: text('location').notNull(),
  expectedIdentity: text('expected_identity').array(),
  state: requestStateEnum('state').notNull().default('CREATED'),
  requirementSetVersion: integer('requirement_set_version').notNull().default(1),
  version: integer('version').notNull().default(1),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const offers = pgTable('offers', {
  id: uuid('id').primaryKey().defaultRandom(),
  requestId: uuid('request_id')
    .notNull()
    .references(() => verificationRequests.id, { onDelete: 'restrict' }),
  verifierId: uuid('verifier_id')
    .notNull()
    .references(() => verifiers.id, { onDelete: 'restrict' }),
  status: offerStatusEnum('status').notNull().default('PENDING'),
  version: integer('version').notNull().default(1),
  claimedAt: timestamp('claimed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const requirements = pgTable('requirements', {
  id: uuid('id').primaryKey().defaultRandom(),
  requestId: uuid('request_id')
    .notNull()
    .references(() => verificationRequests.id, { onDelete: 'restrict' }),
  text: text('text').notNull(),
  expectedResult: text('expected_result').notNull(),
  testMethod: text('test_method').notNull(),
  requiredEvidence: text('required_evidence').array().notNull().default([]),
  priority: text('priority'),
  version: integer('version').notNull().default(1),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
