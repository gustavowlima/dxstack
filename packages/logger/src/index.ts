import pino from "pino";
import { env } from "@stack/env";

export const logger = pino({
  level: env.isServer ? env.LOG_LEVEL : "info",
  transport:
    typeof process !== "undefined" && process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "HH:MM:ss Z",
          },
        }
      : undefined,
  redact: {
    paths: [
      "password",
      "password_confirmation",
      "accessToken",
      "refreshToken",
      "token",
      "secret",
      "*.password",
      "*.token",
      "user.password",
    ],
    censor: "[REDACTED]",
  },
});

export type Logger = typeof logger;
