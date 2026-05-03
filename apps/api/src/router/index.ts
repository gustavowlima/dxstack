import { implement } from "@orpc/server"
import { router } from "@stack/shared/contracts"
import type { Auth } from "@stack/auth"

type Context = {
  user: Auth["$Infer"]["Session"]["user"] | null
  session: Auth["$Infer"]["Session"]["session"] | null
}

const i = implement(router).$context<Context>()

// Example of a protected middleware
// const authed = i.middleware(({ context, next }) => {
//   if (!context.user) {
//     throw new Error("Unauthorized")
//   }
//   return next({
//     context: {
//       user: context.user,
//       session: context.session,
//     },
//   })
// })

export const appRouter = i.router({
  ping: i.ping.handler(() => ({ timestamp: Date.now() })),
  hello: i.hello.handler(({ input }) => ({ message: `Hello, ${input.name} from @stack/api!` })),

  // Example of how to use the middleware:
  // me: i.me.use(authed).handler(({ context }) => context.user),
})
export type AppRouter = typeof appRouter
