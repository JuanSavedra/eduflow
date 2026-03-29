import { boolean, integer, pgTable, real, text, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const subjects = pgTable('subjects', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  teacher: text('teacher'),
  semester: text('semester'),
  grades: real('grades').array().notNull().default([]),
  absences: integer('absences').notNull().default(0),
  schedules: jsonb('schedules').notNull().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const occurrences = pgTable('occurrences', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  subjectId: uuid('subject_id').references(() => subjects.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  date: timestamp('date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const assignments = pgTable('assignments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  subjectId: uuid('subject_id').references(() => subjects.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  dueDate: timestamp('due_date').notNull(),
  status: text('status').notNull().default('pending'), // 'pending' or 'completed'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const resources = pgTable('resources', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  subjectId: uuid('subject_id').references(() => subjects.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  url: text('url').notNull(),
  isFavorite: boolean('is_favorite').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  subjects: many(subjects),
  occurrences: many(occurrences),
  assignments: many(assignments),
  resources: many(resources),
}));

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  user: one(users, {
    fields: [subjects.userId],
    references: [users.id],
  }),
  occurrences: many(occurrences),
  assignments: many(assignments),
  resources: many(resources),
}));

export const occurrencesRelations = relations(occurrences, ({ one }) => ({
  user: one(users, {
    fields: [occurrences.userId],
    references: [users.id],
  }),
  subject: one(subjects, {
    fields: [occurrences.subjectId],
    references: [subjects.id],
  }),
}));

export const assignmentsRelations = relations(assignments, ({ one }) => ({
  user: one(users, {
    fields: [assignments.userId],
    references: [users.id],
  }),
  subject: one(subjects, {
    fields: [assignments.subjectId],
    references: [subjects.id],
  }),
}));

export const resourcesRelations = relations(resources, ({ one }) => ({
  user: one(users, {
    fields: [resources.userId],
    references: [users.id],
  }),
  subject: one(subjects, {
    fields: [resources.subjectId],
    references: [subjects.id],
  }),
}));

