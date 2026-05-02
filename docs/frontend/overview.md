## Purpose

Overview and base rules for the frontend.

## Rules

- Uses TanStack Start
- Strictly follows a feature-based architecture
- Components must focus purely on user interface (dumb components)
- Extract state and complex logic into hooks
- All visual primitives come from `@stack/ui` — never recreate base components locally
- Import pattern: `import { Button } from "@stack/ui/components/button"`
