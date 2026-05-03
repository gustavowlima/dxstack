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
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
  },
  clientPrefix: "VITE_",
  client: {
    VITE_API_URL: z.string().url().optional(),
  },
  // Determine if we are running on the server
  isServer: typeof process !== "undefined" && !!process.versions?.node,
  // In Vite, client-side vars are in import.meta.env
  // In Node/Bun, server-side vars are in process.env
  runtimeEnv: typeof process !== "undefined"
    ? process.env
    : (import.meta as any).env,
  emptyStringAsUndefined: true,
  // This is critical: skip validation for server-side variables when on the client
  // to avoid errors in the browser where these variables are missing for security.
  skipValidation: typeof process === "undefined" || !process.versions?.node,
  });
