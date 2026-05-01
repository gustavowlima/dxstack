## Purpose

Definition of Contracts exposed by the API.

## Rules

- Contracts must be isolated from the actual implementation
- Use the schema file (`*.schema.ts`) as the structural base
- Unambiguously define `input`, `output`, endpoint, and route method
- Contract definitions enable safe typing via RPC on the client
