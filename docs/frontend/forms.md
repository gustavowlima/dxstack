## Purpose

Standards for form management and validation.

## Rules

- Use TanStack Form library
- Use Zod schemas exposed and imported from the API
- NEVER duplicate a Zod schema that already exists in the backend
- Extend schemas only when strictly necessary (e.g., UI-only fields)
