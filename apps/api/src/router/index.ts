import { implement } from "@orpc/server"
import { contracts } from "@stack/shared/contracts"
import type { Auth } from "@stack/auth"

type Context = {
  user: Auth["$Infer"]["Session"]["user"] | null
  session: Auth["$Infer"]["Session"]["session"] | null
}

const router = implement(contracts).$context<Context>()

export const appRouter = router.router({
  ping: router.ping.handler(() => ({ timestamp: Date.now() })),
  hello: router.hello.handler(({ input }) => ({ message: `Hello, ${input.name} from @stack/api!` })),
})
export type AppRouter = typeof appRouter
