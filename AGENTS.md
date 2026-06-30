# CLAUDE.md - Mercado Pago SDK Guide

Guia de referência rápido para IAs (Claude, Cursor, Copilot, ChatGPT) trabalharem neste repositório.

## Estrutura do Projeto
- `.`: Site de documentação estático construído com Astro Starlight.
  - `src/content/docs/`: Conteúdo em Markdown dos guias organizados por subpastas (`nodejs/`, `python/`).
  - `src/styles/custom.css`: Estilos customizados da identidade visual do site.
- `examples/`: Projetos de exemplo funcionais de backend.
  - `examples/nodejs-express/`: API em Node.js com Express e TypeScript.
  - `examples/python-fastapi/`: API em Python com FastAPI.

## Comandos de Desenvolvimento

### Site de Documentação (Astro Starlight)
```bash
npm install     # Instalar dependências
npm run dev     # Iniciar servidor local (http://localhost:4321)
npm run build   # Compilar site estático
```

### Exemplo Node.js (Express + TypeScript)
```bash
cd examples/nodejs-express
npm install     # Instalar dependências
npm run dev     # Iniciar API em modo de desenvolvimento (http://localhost:3000)
npm run build   # Compilar código TypeScript
```

### Exemplo Python (FastAPI)
```bash
cd examples/python-fastapi
python -m venv venv           # Criar ambiente virtual
# Ativar venv:
# Windows: .\venv\Scripts\activate | Unix: source venv/bin/activate
pip install -r requirements.txt
python main.py                # Iniciar API local (http://localhost:8000)
```

## Regras e Boas Práticas do Projeto
- **SDK v2 Obrigatória:** Nunca use a sintaxe antiga v1 baseada em chamadas estáticas (ex: `mercadopago.payment.create`). Use sempre instanciação de clientes orientados a objetos (ex: `new Payment(mpClient)` em Node, ou `sdk.payment().create()` em Python).
- **Tratamento de Webhooks:** 
  1. Sempre responda com `200 OK` (Node: `res.status(200).send('OK')`, Python: `Response(status_code=200, content="OK")`) imediatamente na entrada da rota do Webhook, antes de executar lógica de banco ou APIs externas. Isso previne timeouts e retentativas desnecessárias do Mercado Pago.
  2. Nunca confie nos dados enviados no corpo do webhook direto para liberar produtos. Use o `id` recebido para fazer um GET na API do Mercado Pago e consultar o status real.
  3. Sempre implemente a validação de assinatura `x-signature` usando HMAC-SHA256 para evitar falsificações de pagamento (fraude).
- **Sem Roxo (Purple Ban):** A identidade visual do site de documentação deve seguir a paleta do Mercado Pago (azul, ciano e tons de cinza escuro/antracite). Nunca use roxo.
