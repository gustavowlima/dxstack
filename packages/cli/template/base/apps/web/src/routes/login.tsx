import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "../features/auth/components/login-form";

export const Route = createFileRoute("/login")({
  beforeLoad: async ({ context }) => {
    if (context.auth) {
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
