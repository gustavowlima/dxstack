## Purpose
Estrutura, organização e responsabilidades no frontend.

## Rules
* Pastas internas por feature (ex: `/features/users`):
  * `components/`: contêm apenas a UI, sem chamadas diretas de API
  * `hooks/`: isolam lógica complexa e manipulação de busca de dados
  * `services/`: manipulam as chamadas ao client RPC quando necessário
* NUNCA chamar API diretamente nos componentes
