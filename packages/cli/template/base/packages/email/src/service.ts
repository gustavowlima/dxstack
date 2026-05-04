import { resend } from './client';
import { env } from '@stack/env';
import { logger } from '@stack/logger';
import type { ReactElement } from 'react';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react: ReactElement;
  from?: string;
}

export async function sendEmail({
  to,
  subject,
  react,
  from = env.DEFAULT_FROM_EMAIL,
}: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      react,
    });

    if (error) {
      logger.error({ error, to, subject }, 'Failed to send email via Resend');
      throw error;
    }

    logger.info({ id: data?.id, to, subject }, 'Email sent successfully');
    return data;
  } catch (err) {
    logger.error({ err, to, subject }, 'Unexpected error sending email');
    throw err;
  }
}
