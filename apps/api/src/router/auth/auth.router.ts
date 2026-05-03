
import { procedure } from "../../config/orpc"
import { auth } from "@/config/auth"


const getSession = procedure.public.handler(async ({ context }) => {
  const data = await auth.api.getSession({
    headers: context.headers,
  })

  if (!data) {
    return null
  }

  return data
})

export const authRouter = {
  getSession,
}
