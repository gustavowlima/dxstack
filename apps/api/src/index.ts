import { RPCHandler } from "@orpc/server/fetch"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { appRouter } from "./router"

const app = new Hono()

app.use("*", logger())
app.use("/rpc/*", cors())

const handler = new RPCHandler(appRouter)

app.use("/rpc/*", async (c) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/rpc",
    context: {},
  })

  if (matched) return response
  return c.notFound()
})

app.get("/health", (c) => c.json({ ok: true }))

export default {
  port: 3001,
  fetch: app.fetch,
}
