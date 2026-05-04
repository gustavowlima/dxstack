import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export * from 'drizzle-orm';
export * from './schema';

export function createClient(url: string) {
  const queryClient = postgres(url);
  return drizzle(queryClient, { schema });
}

export type DB = ReturnType<typeof createClient>;
