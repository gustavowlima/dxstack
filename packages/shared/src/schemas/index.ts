import { z } from 'zod';

export const MessageSchema = z.object({
  message: z.string(),
});

export const PingSchema = z.object({
  timestamp: z.number(),
});
