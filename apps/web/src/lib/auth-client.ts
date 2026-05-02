import { createAuthClient } from "better-auth/react";
import { env } from "@stack/env";

export const authClient = createAuthClient({
  baseURL: env.VITE_API_URL || "http://localhost:3001",
});

export const { signIn, signUp, useSession, signOut } = authClient;
