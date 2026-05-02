# AGENTS.md (Web)

The Web application is built with **TanStack Start** and **TanStack Router**.

## Architecture

- **Routes:** File-based routing in `src/routes/`.
- **API Consumption:** Use oRPC clients to communicate with `@stack/api`.
- **State Management:** Leverage TanStack Query and TanStack Router's loaders.
- **Styling:** Vanilla CSS and Tailwind 4.

## Rules

- **CRITICAL:** ALWAYS follow the rules and guidelines defined in `docs/index.md`.
- Routes must be defined in `src/routes/`.
- Use the generated `routeTree.gen.ts` for navigation.
- Strictly follow React 19 patterns (e.g., `use` hook, Actions where applicable).

## Updating

- Update this file if the routing strategy or major frontend patterns change.
