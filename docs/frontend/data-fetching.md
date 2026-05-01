## Purpose

Data fetching and management strategy.

## Rules

- Use the RPC client provided by the API (Backend)
- Do not use native `fetch` scattered or directly in the UI
- Centralize all communication/fetching logic inside custom `hooks`
