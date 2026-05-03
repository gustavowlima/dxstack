import { z } from "zod"
import { MessageSchema, PingSchema } from "@stack/shared/schemas"
import { procedure } from "../config/orpc"
import { authRouter } from "./auth/auth.router"
import { type InferRouterInputs, type InferRouterOutputs, type RouterClient } from "@orpc/server"

export const appRouter = {
  ping: procedure.public
    .output(PingSchema)
    .handler(() => ({ timestamp: Date.now() })),

  hello: procedure.public
    .input(z.object({ name: z.string() }))
    .output(MessageSchema)
    .handler(({ input }) => ({ message: `Hello, ${input.name} from @stack/api!` })),
  auth: authRouter,
}

export type AppRouter = typeof appRouter

export type AppRouterClient = RouterClient<AppRouter>

export type RouterOutputs = InferRouterOutputs<typeof appRouter>
export type RouterInputs = InferRouterInputs<typeof appRouter>
