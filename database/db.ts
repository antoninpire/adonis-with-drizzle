import env from '#start/env'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema.js'

const client = createClient({
  url: env.get('DATABASE_URL'),
  authToken: env.get('DATABASE_AUTH_TOKEN'),
})
export const db = drizzle(client, { schema })
