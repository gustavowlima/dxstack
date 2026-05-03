import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url().default("http://localhost:3001"),
  VITE_WEB_URL: z.string().url().default("http://localhost:3000"),
});

export const env = envSchema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_WEB_URL: import.meta.env.VITE_WEB_URL,
});
