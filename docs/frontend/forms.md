## Purpose

Standards for form management and validation.

## Rules

- **Standard:** ALWAYS use TanStack Form (`@tanstack/react-form`) for all forms.
- **Validation:** Use Zod schemas exposed and imported from the API.
- **Deduplication:** NEVER duplicate a Zod schema that already exists in the backend.
- **Extension:** Extend schemas only when strictly necessary (e.g., UI-only fields).
- **Organization:** Feature-specific schemas should live in the `schemas/` folder within the feature directory.
- **UI:** Use shadcn/ui form components and follow the `packages/ui` guidelines.
