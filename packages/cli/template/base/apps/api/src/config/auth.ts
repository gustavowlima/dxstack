import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "@stack/db";
import { env } from "@stack/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  baseURL: env.VITE_API_URL,
  secret: env.BETTER_AUTH_SECRET,
  plugins: [tanstackStartCookies()],
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // renews every 1 day
    cookieOptions: {
      sameSite: "lax",
      secure: false,
    },
  },
  advanced: {
    disableCSRFCheck: true,
  },
  trustedOrigins: [env.VITE_WEB_URL],
  onAPIError: {
    onError(error, ctx) {
      console.error("BETTER AUTH API ERROR", error, ctx);
    },
  },
});

export type Auth = typeof auth;
export type Session = Auth["$Infer"]["Session"];
