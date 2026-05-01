## Purpose
Referência prática de estrutura feature-based (Users).

## Rules
* Mantém as camadas de back e front altamente isoladas em suas áreas.
* O frontend importa explicitamente da API o schema de usuário.

## Examples
* Backend (`/features/users`):
  * `users.route.ts`
  * `users.controller.ts`
  * `users.service.ts`
  * `users.repository.ts`
  * `users.schema.ts`
  * `users.contract.ts`
  * `users.types.ts`
* Frontend (`/features/users`):
  * `components/user-form.tsx`
  * `components/user-table.tsx`
  * `hooks/use-users.ts`
  * `hooks/use-create-user.ts`
  * `services/user-client.ts`
