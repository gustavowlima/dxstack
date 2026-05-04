import { Resend } from 'resend';
import { env } from '@stack/env';

export const resend = new Resend(env.RESEND_API_KEY);
