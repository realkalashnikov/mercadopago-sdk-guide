---
title: Clonar Exemplos
description: Como clonar e executar os projetos de exemplo completos na sua máquina.
---

Além dos códigos disponibilizados nos guias, este repositório possui projetos backend funcionais completos na pasta `/examples` para você testar rapidamente na sua máquina.

Esses exemplos já vêm com tratamento de erros, suporte a `.env` e estruturação limpa.

---

## Exemplos Disponíveis

No repositório, você encontrará:
1. **Node.js (Express + TypeScript):** Localizado em `/examples/nodejs-express/`.
2. **Python (FastAPI):** Localizado em `/examples/python-fastapi/`.

---

## Como Executar Localmente

### 1. Clonando o Repositório

Como este é um repositório Git isolado, clone apenas o projeto do guia:

```bash
git clone https://github.com/realkalashnikov/mercadopago-sdk-guide.git
cd mercadopago-sdk-guide
```

---

### 2. Rodando o Exemplo de Node.js

1. Acesse o diretório do exemplo:
   ```bash
   cd examples/nodejs-express
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie o arquivo de variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
4. Edite o `.env` e preencha com seu `MERCADOPAGO_ACCESS_TOKEN`.
5. Rode o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   O servidor estará rodando em `http://localhost:3000`.

---

### 3. Rodando o Exemplo de Python

1. Acesse o diretório do exemplo:
   ```bash
   cd examples/python-fastapi
   ```
2. Crie e ative um ambiente virtual:
   ```bash
   python -m venv venv
   # No Windows:
   .\venv\Scripts\activate
   # No Linux/macOS:
   source venv/bin/activate
   ```
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
4. Crie o arquivo `.env`:
   ```bash
   cp .env.example .env
   ```
5. Preencha o `.env` com seu `MERCADOPAGO_ACCESS_TOKEN`.
6. Inicie o servidor do FastAPI:
   ```bash
   uvicorn main:app --reload
   ```
   A API estará rodando em `http://127.0.0.1:8000`.
