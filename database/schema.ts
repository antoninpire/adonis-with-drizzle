import { createId } from '@paralleldrive/cuid2'
import { InferSelectModel } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const Users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  fullName: text('full_name'),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),

  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export type User = InferSelectModel<typeof Users>
