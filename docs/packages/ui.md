## Purpose

Guidelines for using and creating components in the project's Design System (`packages/ui`).

## Rules

- The package acts as a consistent and highly customizable Design System.
- Uses Tailwind CSS as the base for styles and design tokens.
- Components must be purely visual (dumb components), decoupled from business logic.
- CRITICAL INSTRUCTION: When creating or editing components, the AI must always load the `frontend-design` and `tailwind-design-system` skills.
- **React 19 Standard:** NEVER use `React.forwardRef`. In React 19, `ref` is passed as a regular prop automatically.
- **Primitives:** DO NOT use Radix UI. Always use Base UI / ReUI as the foundation for complex components.
- **Theming:** Must strictly follow the CSS variables structure from Shadcn UI (`https://ui.shadcn.com/docs/theming`) but adapted to ReUI components.
- **Adding Components:** Use the shadcn CLI with the ReUI registry as the primary method:
  1. Run `bunx shadcn@latest add @reui/<component-name>` — components land in `packages/ui` ready to use.
  2. If the component is not available in the registry, refer to `https://reui.io/llms.txt` for structural and headless adaptation.
  3. Always read `packages/theming.md` before styling any component.
  - The ReUI registry must be configured in `components.json`: `"registries": { "@reui": "https://reui.io/r/{style}/{name}.json" }`
- The frontend should consume visual elements primarily from this package, avoiding recreating base components.
