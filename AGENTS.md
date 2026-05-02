# AGENTS.md (Root)

This project is a monorepo called **stack**.

## Project Principles

- **Efficiency:** Prioritize code that is simple, fast, and easy to maintain.
- **Type-Safety:** Ensure end-to-end type safety using TypeScript, Zod, and oRPC.
- **Consistency:** Follow established patterns in every package and application.
- **Self-Documenting:** Always update `AGENTS.md` files when structural or architectural changes occur.

## Monorepo Structure

- `apps/api`: Hono server with oRPC.
- `apps/web`: React application using TanStack Start & Router.
- `packages/db`: Drizzle ORM with `postgres.js` driver.
- `packages/shared`: Shared Zod schemas, oRPC contracts, and types.

## Development Workflow

1. **Typecheck:** Run `bun run typecheck` from the root to validate the entire project.
2. **Database:** Use `@stack/db` for all database interactions.
3. **Contracts:** Define all API contracts in `@stack/shared/contracts`.
4. **Validation:** Use `@stack/shared/schemas` for all Zod validation logic.

## AI Instructions

- **CRITICAL:** ALWAYS follow the rules and guidelines defined in `docs/index.md`.
- When adding a new feature, check if a shared contract or schema is needed first.
- Always verify type-safety across the monorepo after changes.
- If you modify the directory structure or introduce a new architectural pattern, you **MUST** update the relevant `AGENTS.md` file immediately.
