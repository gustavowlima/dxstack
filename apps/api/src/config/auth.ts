
import { initAuth } from "@stack/auth"
import { env } from "@stack/env"
import { tanstackStartCookies } from "better-auth/tanstack-start"

export const auth = initAuth({
  baseUrl: env.VITE_API_URL,
  webURL: env.VITE_WEB_URL,
  secret: env.BETTER_AUTH_SECRET,
  googleClientId: env.GOOGLE_CLIENT_ID,
  googleClientSecret: env.GOOGLE_CLIENT_SECRET,
  extraPlugins: [tanstackStartCookies()],
})
