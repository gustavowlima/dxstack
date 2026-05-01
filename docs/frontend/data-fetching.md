## Purpose
Gerenciamento e busca de dados (Data Fetching).

## Rules
* Usar o cliente RPC provido pela API (Backend)
* Não utilizar `fetch` nativo de forma espalhada ou direta na UI
* Concentrar toda a lógica de comunicação/buscas em `hooks` customizados
