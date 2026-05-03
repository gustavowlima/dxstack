import { env } from "@stack/env"

import { RPCHandler } from "@orpc/server/fetch"
import { Hono } from "hono"
import { appRouter } from "./router"
import { apiCors, authMiddleware, type Variables } from "./middleware"
import { auth } from "./config/auth"
import { logger } from "hono/logger"
import { onError } from "@orpc/server"

const app = new Hono<{ Variables: Variables }>()

app.use(logger())

// 1. Apply CORS to everything
app.use("*", apiCors)

// 2. Apply Auth Middleware to everything so ctx.user/session is populated
app.use("*", authMiddleware)

// 3. Better Auth handler for its own endpoints
app.on(["POST", "GET"], "/api/auth/*", (ctx) => auth.handler(ctx.req.raw))

// 4. RPC Handler
const handler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
          console.error(error)
        }),
  ],
})
app.use("/rpc/*", async (ctx) => {
  const { matched, response } = await handler.handle(ctx.req.raw, {
    prefix: "/rpc",
    context: {
      user: ctx.get("user"),
      session: ctx.get("session"),
      headers: ctx.req.raw.headers
    },
  })

  if (matched) return response
  return ctx.notFound()
})

app.get("/health", (ctx) => ctx.json({ ok: true }))

export default {
  port: env.PORT,
  fetch: app.fetch,
}
