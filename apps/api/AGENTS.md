# AGENTS.md (API)

The API is built with **Hono** and **oRPC**.

## Architecture
- **Router:** Defined in `src/router/index.ts`.
- **Contracts:** All routes must implement a contract from `@stack/shared/contracts`.
- **Context:** The oRPC context includes the database client and potentially auth session.

## Rules
- Use oRPC for all client-facing endpoints.
- Business logic should be kept clean and modular.
- Always use Zod schemas from `@stack/shared` for input/output validation.

## Updating
- If a new router module is added, update this file if the organization changes.
