## Purpose

Guidelines for using and creating components in the project's Design System (`packages/ui`).

## Rules

- The package acts as a consistent and highly customizable Design System.
- Uses Tailwind CSS v4 with CSS-variable theming — see `packages/theming.md`.
- Style: `base-nova` (ReUI). Icon library: `@tabler/icons-react`.
- Components must be purely visual (dumb components), decoupled from business logic.
- CRITICAL INSTRUCTION: When creating or editing components, the AI must always load the `frontend-design` and `tailwind-design-system` skills.
- **React 19 Standard:** NEVER use `React.forwardRef`. In React 19, `ref` is passed as a regular prop automatically.
- **Primitives:** DO NOT use Radix UI. Always use Base UI / ReUI as the foundation for complex components.
- **Theming:** Must strictly follow the CSS variables structure from Shadcn UI (`https://ui.shadcn.com/docs/theming`) but adapted to ReUI components.
- **Adding Components:** Use the shadcn CLI with the ReUI registry as the primary method:
  1. Always run the CLI from `apps/web` (not from `packages/ui`) — the CLI routes reusable components to `packages/ui/src/components/` automatically.
  2. Run `bunx shadcn@latest add @reui/<component-name>` from `apps/web`.
  3. If the component is not available in the registry, refer to `https://reui.io/llms.txt` for structural and headless adaptation.
  4. Always read `packages/theming.md` before styling any component.
  - The ReUI registry must be configured in `components.json`: `"registries": { "@reui": "https://reui.io/r/{style}/{name}.json" }`
- **Imports:** Always import components via the workspace package — never use relative paths across packages:
  ```ts
  import { Button } from "@stack/ui/components/button"
  import { cn } from "@stack/ui/utils"
  ```
- The frontend should consume visual elements primarily from this package, avoiding recreating base components.
