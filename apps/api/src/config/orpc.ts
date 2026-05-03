import { os } from "@orpc/server"
import { ORPCError } from "@orpc/server"
import type { Auth } from "@stack/auth"

export type Context = {
  user: Auth["$Infer"]["Session"]["user"] | null
  session: Auth["$Infer"]["Session"]["session"] | null
  headers: Headers
}

const base = os.$context<Context>()

const authMiddleware = base.middleware(({ context, next }) => {
  if (!context.user || !context.session) {
    throw new ORPCError("UNAUTHORIZED")
  }
  return next({ context: { user: context.user, session: context.session } })
})

export const procedure = {
  public: base,
  authed: base.use(authMiddleware),
}
