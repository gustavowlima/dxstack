import { Button } from "@stack/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@stack/ui/components/card";
import { IconLoader2, IconShieldLock } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/use-auth";

export function UserCard() {
  const navigate = useNavigate();
  const { session, logout, isLoading: isAuthLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login" });
  };

  if (!session) return null;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center text-center">
        <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <IconShieldLock className="size-6" />
        </div>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Signed in as{" "}
          <span className="font-medium text-foreground">
            {session.user.name}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background font-semibold text-primary shadow-sm">
            {session.user.name?.[0]?.toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{session.user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleLogout}
          disabled={isAuthLoading}
        >
          {isAuthLoading && (
            <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign out
        </Button>
      </CardFooter>
    </Card>
  );
}
