import { UserCard } from "@/features/auth/components/user-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
      <UserCard />
    </div>
  );
}
