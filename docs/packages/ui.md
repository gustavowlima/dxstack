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
- **Adding Components:** When a new component is needed, prioritize adding it via the CLI if applicable, and always refer to the ReUI documentation at `https://reui.io/llms.txt` for structural and headless adaptation.
- The frontend should consume visual elements primarily from this package, avoiding recreating base components.
