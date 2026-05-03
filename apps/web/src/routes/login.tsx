import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "../features/auth/components/login-form";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();
    if (session) {
      throw redirect({ to: "/" });
    }
  },
  component: Login,
});

function Login() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
      <LoginForm />
    </div>
  );
}
