import { createServerFn } from "@tanstack/react-start";
import { getApi } from "@/lib/orpc";

export const fetchSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const api = getApi();
    const session = await api.auth.getSession();
    return session;
  },
);
