## Purpose

Guidelines for using and creating components in the project's Design System (`packages/ui`).

## Rules

- The package acts as a consistent and highly customizable Design System.
- Uses Tailwind CSS as the base for styles and design tokens.
- Components must be purely visual (dumb components), decoupled from business logic.
- CRITICAL INSTRUCTION: When creating or editing components, the AI must always load the `frontend-design` and `tailwind-design-system` skills.
- If a new component is needed, consider importing/adapting from ReUI via the documentation at `https://reui.io/llms.txt`.
- The frontend should consume visual elements primarily from this package, avoiding recreating base components.
