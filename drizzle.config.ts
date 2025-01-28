import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env.local');
}

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  }
} satisfies Config; 