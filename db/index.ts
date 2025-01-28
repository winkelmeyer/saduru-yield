import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { createClient } from '@supabase/supabase-js';
import * as schema from './schema';

// Create the database client with pooling and schema
export const db = drizzle(sql, { schema });

// Also export supabase client for auth
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
); 