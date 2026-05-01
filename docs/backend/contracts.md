## Purpose
Definição dos Contratos (Contracts) expostos pela API.

## Rules
* O contract deve ser isolado da implementação real
* Usar o arquivo schema (`*.schema.ts`) como base estrutural
* Definir inequivocamente `input`, `output`, endpoint e método da rota
* As definições do contrato habilitam a tipagem segura via RPC no client
