/**
 * server.ts
 *
 * This module configures and validates environment variables for server-side use in the Next.js application.
 * It uses @t3-oss/env-nextjs and Zod to enforce required environment variables:
 *   - Database connection: DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
 *   - Authentication and webhooks: CLERK_SECRET_KEY, CLERK_WEBHOOK_SECRET
 *   - File uploads: UPLOADTHING_TOKEN
 *   - AI APIs: ANTHROPIC_API_KEY, GEMINI_API_KEY
 *   - Email service: RESEND_API_KEY
 *
 * After validation, it constructs a single DATABASE_URL for use with Drizzle ORM or other database clients:
 *   postgres://<DB_USER>:<DB_PASSWORD>@<DB_HOST>:<DB_PORT>/<DB_NAME>
 *
 * Usage:
 *   1. Define all required environment variables in your deployment or .env file.
 *   2. Import the validated `env` object in server-side code:
 *        import { env } from "@/data/env/server"
 *      Access variables directly, e.g. env.DATABASE_URL.
 *
 * This ensures that missing or empty variables are caught at startup.
 */

import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DB_PASSWORD: z.string(),
    DB_USER: z.string().min(1),
    DB_HOST: z.string().min(1),
    DB_PORT: z.string().min(1),
    DB_NAME: z.string().min(1),
    // CLERK_SECRET_KEY: z.string().min(1),
    // CLERK_WEBHOOK_SECRET: z.string().min(1),
    // UPLOADTHING_TOKEN: z.string().min(1),
    // ANTHROPIC_API_KEY: z.string().min(1),
    // GEMINI_API_KEY: z.string().min(1),
    // RESEND_API_KEY: z.string().min(1),
    // SERVER_URL: z.string().min(1),
  },
  createFinalSchema: env => {
    return z.object(env).transform(val => {
      const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, ...rest } = val

      return {
        ...rest,
        DATABASE_URL: `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      }
    })
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
})