import 'dotenv/config'
import { randomUUID } from 'crypto'
import type { Environment } from 'vitest/environments'
import { execSync } from 'child_process'
import { prisma } from '@/lib/prisma'

// create a new database url with a random schema name
function gerenateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma-test-environment',
  transformMode: 'ssr',
  // This is the environment that will be used to run the tests
  async setup() {
    const schema = randomUUID()
    const databaseUrl = gerenateDatabaseUrl(schema)
    process.env.DATABASE_URL = databaseUrl
    execSync('npx prisma migrate deploy')
    return {
      // This is the function that will be called to drop database
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE;`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
