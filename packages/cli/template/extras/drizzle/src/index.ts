import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export * from 'drizzle-orm';
export * from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL');
}

const connectionString = process.env.DATABASE_URL;

const createDrizzleClient = () => {
  const queryClient = postgres(connectionString);
  return drizzle(queryClient, { schema });
};

const globalForDrizzle = globalThis as unknown as {
  db: ReturnType<typeof createDrizzleClient> | undefined;
};

export const db = globalForDrizzle.db ?? createDrizzleClient();

if (process.env.NODE_ENV !== 'production') globalForDrizzle.db = db;

export type DB = typeof db;
