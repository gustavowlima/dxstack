## Purpose

Structure and layer responsibilities in the backend.

## Rules

- Folders organized as `/features/[name]`
- Mandatory file split:
  - `*.route.ts`: HTTP/RPC entry point for the feature
  - `*.controller.ts`: request/response format adaptation
  - `*.service.ts`: orchestration and business logic
  - `*.repository.ts`: database access interface
  - `*.schema.ts`: Zod definitions and validations
  - `*.contract.ts`: strict API definition (input and output)
  - `*.types.ts`: local domain utility types
