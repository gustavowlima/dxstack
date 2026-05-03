import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { AppRouterClient } from "@stack/api/router";
import { env } from "./env";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

export const getApi = createIsomorphicFn()
  .client(() => {
    const link = new RPCLink({
      url: `${env.VITE_API_URL}/rpc`,
      fetch: (input, init) => fetch(input, { ...init, credentials: "include" }),
    });

    return createORPCClient<AppRouterClient>(link);
  })
  .server(() => {
    const headers = getRequestHeaders();

    const link = new RPCLink({
      url: `${env.VITE_API_URL}/rpc`,

      fetch: (input, init) => {
        const h = new Headers((init as RequestInit)?.headers);

        const cookie = headers.get("cookie");
        if (cookie) {
          h.set("cookie", cookie);
        }

        return fetch(input, {
          ...init,
          headers: h,
          credentials: "include",
        });
      },
    });

    return createORPCClient<AppRouterClient>(link);
  });

export const orpc = createTanstackQueryUtils({
  client: getApi(),
});
