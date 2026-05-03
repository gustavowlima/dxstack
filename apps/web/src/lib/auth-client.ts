import { getAuthClient } from "@stack/auth/client";
import { env } from "./env";

export const authClient = getAuthClient(env.VITE_API_URL);

export const { signIn, signUp, useSession, signOut } = authClient;
