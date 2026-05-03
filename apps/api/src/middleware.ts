
import { env } from "@stack/env"
import { logger as pino } from "@stack/logger"
import { createMiddleware } from "hono/factory"
import { cors } from "hono/cors"
import { auth } from "./config/auth"

export type Variables = {
  user: typeof auth.$Infer.Session.user | null
  session: typeof auth.$Infer.Session.session | null
}

type HonoEnv = { Variables: Variables }

export const loggerMiddleware = createMiddleware(async (ctx, next) => {
  console.log("🚀 ctx ~ :", ctx);
  const start = Date.now()
  await next()
  pino.info({
    method: ctx.req.method,
    path: ctx.req.path,
    status: ctx.res.status,
    duration: `${Date.now() - start}ms`,
  })
})

export const apiCors = cors({
  origin: [env.VITE_WEB_URL],
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true,
})

export const authMiddleware = createMiddleware<HonoEnv>(async (ctx, next) => {
  const session = await auth.api.getSession({
    headers: ctx.req.raw.headers,
  })

  if (!session) {
    ctx.set("user", null)
    ctx.set("session", null)
    return next()
  }

  ctx.set("user", session.user)
  ctx.set("session", session.session)
  return next()
})
