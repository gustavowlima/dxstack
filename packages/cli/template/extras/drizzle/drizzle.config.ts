import { join } from "node:path";
import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

// Manually load .env from workspace root if DATABASE_URL is missing
// This helps drizzle-kit when run via CLI
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: join(import.meta.dirname, "../../.env") });
}

export default defineConfig({
  schema: "./src/schema/index.ts",
  casing: "snake_case",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
});
