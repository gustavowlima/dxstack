## Purpose

Structure, organization, and responsibilities in the frontend.

## Rules

- Internal folders organized by feature (e.g., `/features/users`):
  - `components/`: contains only UI, no direct API calls
  - `hooks/`: isolates complex logic and data fetching manipulation
  - `services/`: handles calls to the RPC client when necessary
- NEVER call the API directly inside components
