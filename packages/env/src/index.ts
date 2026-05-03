import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    VITE_API_URL: z.url(), // Shared with frontend
    VITE_WEB_URL: z.url(), // Shared with frontend
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    PORT: z.string().optional().transform((v) => (v ? parseInt(v) : 3001)),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  // Skip validation if requested (useful for CLI tools/schema generation)
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  });

  skipValidation: process.env.SKIP_ENV_VALIDATION === "true"
});
