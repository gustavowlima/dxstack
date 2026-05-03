# @stack/auth

Centralized authentication package using [Better Auth](https://www.better-auth.com/).

## Purpose
This package centralizes the authentication configuration, providers, and shared types for the entire monorepo. It supports both server-side usage (Hono/Bun) and client-side usage (React/Vite).

## Database Schema
If you change the auth configuration and need to update the database schema, run the following command from this directory:

```bash
SKIP_ENV_VALIDATION=true bunx @better-auth/cli generate --config src/index.ts --output ../db/src/schema/auth-schema.ts
```

This will generate a Drizzle-compatible schema file in the `@stack/db` package based on your current configuration.

## Usage

### Server (API)
```typescript
import { auth } from "@stack/auth"
```

### Client (Web)
```typescript
import { getAuthClient } from "@stack/auth/client"
const authClient = getAuthClient(import.meta.env.VITE_API_URL)
```
