import { RPCHandler } from "@orpc/server/fetch"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { auth } from "@stack/auth"
import { appRouter } from "./router"
import { logger as pino } from "@stack/logger"

type Variables = {
  user: typeof auth.$Infer.Session.user | null
  session: typeof auth.$Infer.Session.session | null
}

const app = new Hono<{ Variables: Variables }>()

// Pino logger middleware for Hono
app.use("*", async (c, next) => {
  const start = Date.now()
  await next()
  const duration = Date.now() - start
  pino.info({
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    duration: `${duration}ms`,
  })
})

// Better Auth requires specific CORS configuration
app.use(
  "/api/auth/*",
  cors({
    origin: [env.VITE_WEB_URL], // Web frontend
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
