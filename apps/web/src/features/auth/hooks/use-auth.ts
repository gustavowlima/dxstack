import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { env } from "@/lib/env";

export function useAuth() {
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${env.VITE_WEB_URL}/home`,
      });
      return result;
    } catch (err: any) {
      setError(err.message || "Failed to login with Google");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });
      return result;
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    name: string,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });
      return result;
    } catch (err: any) {
      setError(err.message || "Failed to create account");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authClient.signOut();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    session,
    isSessionLoading,
    isLoading,
    error,
    handleGoogleLogin,
    loginWithEmail,
    signUpWithEmail,
    logout,
  };
}
