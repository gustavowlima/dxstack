// routes/_authed/route.tsx - Layout route for protected pages
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }

    return context;
  },
});
