import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { createClient } from "@stack/db";
import * as schema from "@stack/db/schema";
import { env } from "@stack/env";

const db = createClient(env.DATABASE_URL);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  // Use VITE_API_URL as the base (server's own URL)
  baseURL: env.VITE_API_URL,
  // Use VITE_WEB_URL for trusted origins (the frontend)
  trustedOrigins: [env.VITE_WEB_URL],
  secret: env.BETTER_AUTH_SECRET,
});
