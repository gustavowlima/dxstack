import { createORPCClient, onError } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { AppRouterClient } from "@stack/api/router";
import { env } from "./env";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

const link = new RPCLink({
  url: `${env.VITE_API_URL}/rpc`,
  fetch: (input, init) => fetch(input, { ...init, credentials: "include" }),
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

export const serverApi = createORPCClient<AppRouterClient>(link);

export const orpc = createTanstackQueryUtils(serverApi);
