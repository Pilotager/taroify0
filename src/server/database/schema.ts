import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { primaryKey } from 'drizzle-orm/pg-core';
import { join } from 'pathe';
import { init } from '@paralleldrive/cuid2';

const createId = init({
  length: 12,
});

const betterSqlite = new Database(join(process.cwd(), './db.sqlite'));
export const db = drizzle(betterSqlite);

export const users = sqliteTable('users', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image'),
});

export const accounts = sqliteTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    // @ts-ignore
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = sqliteTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
});

export const verificationTokens = sqliteTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
  },
  (vt) => ({
    // @ts-ignore
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const components = sqliteTable('components', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  slug: text('slug').$defaultFn(() => createId()),
  description: text('description').notNull(),
  code: text('code'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).$default(
    () => new Date(),
  ),
  userId: text('user_id').references(() => users.id),
  metadata: text('metadata', { mode: 'json' }),
  completed: integer('completed', { mode: 'boolean' }),
});
