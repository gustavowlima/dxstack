## Purpose

Index and usage guide of the documentation for AI.

## Rules

- CRITICAL INSTRUCTION: The AI must read ONLY 2–3 files per task
- NEVER load the entire documentation
- Fetch specific guidelines only when the task interacts with that specific area

## Available Docs

- `/_core/`
  - `project-overview.md` (Stack and general rules)
  - `conventions.md` (Patterns, naming, and size)
- `/frontend/`
  - `overview.md` (TanStack base)
  - `architecture.md` (UI feature folder structure)
  - `forms.md` (TanStack Form + Zod)
  - `data-fetching.md` (RPC Hooks)
- `/backend/`
  - `overview.md` (Hono + RPC base)
  - `architecture.md` (Routes, controllers, services)
  - `contracts.md` (Static API definition)
  - `validation.md` (Centralized Zod in the API)
- `/packages/`
  - `ui.md` (Design System, component rules, and ReUI)
  - `theming.md` (CSS variables, token contract, and how to change the theme)
- `/features/`
  - `users.md` (Example of folder structure for frontend and backend)
