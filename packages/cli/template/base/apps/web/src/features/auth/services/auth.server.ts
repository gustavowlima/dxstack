import { createServerFn } from "@tanstack/react-start";
import { serverApi } from "@/lib/orpc";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const fetchSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders();

    return serverApi.auth.getSession(undefined, {
      headers: {
        cookie: headers.cookie || "",
      },
    });
  },
);
