import { implement } from "@orpc/server"
import { router } from "@stack/shared/contracts"

const i = implement(router)

export const appRouter = i.router({
  ping: i.ping.handler(() => ({ timestamp: Date.now() })),
  hello: i.hello.handler(({ input }) => ({ message: `Hello, ${input.name} from @stack/api!` })),
})

export type AppRouter = typeof appRouter
