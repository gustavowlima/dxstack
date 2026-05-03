import { env } from "@stack/env"

import { RPCHandler } from "@orpc/server/fetch"
import { Hono } from "hono"
import { appRouter } from "./router"
import { apiCors, loggerMiddleware, authMiddleware, type Variables } from "./middleware"
import { auth } from "./config/auth"

const app = new Hono<{ Variables: Variables }>()

app.use("*", loggerMiddleware)
app.use("/api/auth/*", apiCors)
app.use("/rpc/*", apiCors)
app.use("*", authMiddleware)

const handler = new RPCHandler(appRouter)

app.on(["POST", "GET"], "/api/auth/*", (ctx) => auth.handler(ctx.req.raw))

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
