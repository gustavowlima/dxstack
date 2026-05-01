## Purpose

Validation strategy and patterns for the project.

## Rules

- Zod acts as the single central source of truth
- Actual validation occurs on the backend side
- Zod schemas must reside in the API
- Frontend must reuse schemas from the API without rewriting them
- DO NOT use the shared `/shared` folder for domain schemas
