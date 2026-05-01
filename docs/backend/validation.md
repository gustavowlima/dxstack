## Purpose
Estratégia e padrões de validação do projeto.

## Rules
* O Zod atua como fonte única e central da verdade
* A validação real ocorre no lado do backend
* O schema Zod deve obrigatoriamente residir na API
* O frontend deve reaproveitar os schemas da API, sem reescrevê-los
* NÃO utilizar a pasta compartilhada `/shared` para schema de domínio
