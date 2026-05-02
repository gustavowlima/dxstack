import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../features/auth/components/login-form";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
      <LoginForm />
    </div>
  );
}
