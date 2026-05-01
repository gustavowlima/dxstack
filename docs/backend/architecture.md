## Purpose
Estrutura e responsabilidades de camadas no backend.

## Rules
* Pastas organizadas como `/features/[nome]`
* Divisão obrigatória de arquivos:
  * `*.route.ts`: entrada HTTP/RPC da feature
  * `*.controller.ts`: adaptação do formato de request/response
  * `*.service.ts`: orquestração e regra de negócio
  * `*.repository.ts`: interface de acesso ao banco de dados
  * `*.schema.ts`: definições e validações do Zod
  * `*.contract.ts`: definição estrita da API (input e output)
  * `*.types.ts`: tipagens utilitárias de domínio local
