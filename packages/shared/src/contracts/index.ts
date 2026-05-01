import { oc } from '@orpc/contract';
import { z } from 'zod';
import { MessageSchema, PingSchema } from '../schemas';

export const router = oc.router({
  ping: oc
    .input(z.void())
    .output(PingSchema),
  
  hello: oc
    .input(z.object({ name: z.string() }))
    .output(MessageSchema),
});

export type AppRouter = typeof router;
