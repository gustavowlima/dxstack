import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    PORT: z.string().optional().transform((v) => (v ? parseInt(v) : 3001)),
  },
  clientPrefix: "VITE_",
  client: {
    VITE_API_URL: z.string().url().optional(),
  },
  // In Vite, environment variables are in import.meta.env
  // In Node/Bun, they are in process.env
  runtimeEnv: typeof process !== "undefined" ? process.env : (import.meta as any).env,
  emptyStringAsUndefined: true,
});
