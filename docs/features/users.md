## Purpose

Practical reference for feature-based structure (Users).

## Rules

- Keeps frontend and backend layers highly isolated in their respective areas.
- Frontend explicitly imports the user schema from the API.

## Examples

- Backend (`/features/users`):
  - `users.route.ts`
  - `users.controller.ts`
  - `users.service.ts`
  - `users.repository.ts`
  - `users.schema.ts`
  - `users.contract.ts`
  - `users.types.ts`
- Frontend (`/features/users`):
  - `components/user-form.tsx`
  - `components/user-table.tsx`
  - `hooks/use-users.ts`
  - `hooks/use-create-user.ts`
  - `services/user-client.ts`
