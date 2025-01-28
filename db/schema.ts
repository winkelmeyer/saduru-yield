import { pgTable, uuid, text, timestamp, decimal, sql, uniqueIndex } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  referralCode: text('referral_code'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (table) => {
  return {
    emailIdx: uniqueIndex('email_idx').on(table.email),
    referralCodeIdx: uniqueIndex('referral_code_idx').on(table.referralCode)
  };
});

export const referrals = pgTable('referrals', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  email: text('email').notNull(),
  status: text('status', { enum: ['pending', 'completed'] }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  referralCode: text('referral_code').notNull().unique()
});

export const transactions = pgTable('transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  type: text('type', { enum: ['deposit', 'withdrawal', 'interest'] }).notNull(),
  status: text('status', { enum: ['pending', 'completed', 'failed'] }).notNull(),
  paymentMethod: text('payment_method'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true })
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert; 