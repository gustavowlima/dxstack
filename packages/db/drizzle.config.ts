import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import { join } from "node:path";

// Manually load .env from workspace root if DATABASE_URL is missing
// This helps drizzle-kit when run via CLI
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: join(__dirname, "../../.env") });
}

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
