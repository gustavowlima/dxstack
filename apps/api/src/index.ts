import { RPCHandler } from "@orpc/server/fetch"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { auth } from "./lib/auth"
import { appRouter } from "./router"

type Variables = {
  user: typeof auth.$Infer.Session.user | null
  session: typeof auth.$Infer.Session.session | null
}

const app = new Hono<{ Variables: Variables }>()

app.use("*", logger())

// Better Auth requires specific CORS configuration
app.use(
  "/api/auth/*",
  cors({
    origin: ["http://localhost:3000"], // Web frontend
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
)

app.use("/rpc/*", cors())

// Middleware to inject session into Hono context
app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    c.set("user", null)
    c.set("session", null)
    return next()
  }

  c.set("user", session.user)
  c.set("session", session.session)
  return next()
})

const handler = new RPCHandler(appRouter)

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))

app.use("/rpc/*", async (c) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/rpc",
    context: {
      user: c.get("user"),
      session: c.get("session"),
    },
  })

  if (matched) return response
  return c.notFound()
})

app.get("/health", (c) => c.json({ ok: true }))

import { env } from "@stack/env"

export default {
  port: env.PORT,
  fetch: app.fetch,
}
