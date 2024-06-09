import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: 'database/schema.ts',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
  out: 'database/migrations',
  breakpoints: false,
  dialect: 'sqlite',
})
