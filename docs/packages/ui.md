## Purpose

Guidelines for using and creating components in the project's Design System (`packages/ui`).

## Rules

- The package acts as a consistent and highly customizable Design System.
- Uses Tailwind CSS v4 with CSS-variable theming — see `packages/theming.md`.
- Components must be purely visual (dumb components), decoupled from business logic.
- CRITICAL INSTRUCTION: When creating or editing components, the AI must always load the `frontend-design`, `tailwind-design-system`, and `shadcn` skills.
- **React 19 Standard:** NEVER use `React.forwardRef`. In React 19, `ref` is passed as a regular prop automatically.
- **Primitives:** Use shadcn/ui as the foundation for all components — it is built on Radix UI and fully compatible with the theming system.
- **Theming:** Must strictly follow the CSS variables structure defined in `packages/theming.md`.
- **Adding Components:** Use the shadcn CLI as the primary method:
  1. Always run the CLI from `apps/web` — the CLI routes reusable components to `packages/ui/src/components/` automatically.
  2. Run `bunx shadcn@latest add <component-name>` from `apps/web`.
  3. Use the `shadcn` skill — it provides project context, component docs, search, and usage examples.
  4. Always read `packages/theming.md` before styling any component.
- **Imports:** Always import components via the workspace package — never use relative paths across packages:
  ```ts
  import { Button } from "@stack/ui/components/button"
  import { cn } from "@stack/ui/utils"
  ```
- The frontend should consume visual elements primarily from this package, avoiding recreating base components.
