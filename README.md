# Mercado Pago SDK Integration Guide

Guia completo e prático de integração com a API/SDK do Mercado Pago para diferentes tecnologias (Node.js, Python, etc.).

Este guia foi criado para suprir as lacunas da documentação oficial do Mercado Pago, trazendo exemplos reais e funcionais de:
- **Checkout Pro:** Integração fácil redirecionando para a tela do Mercado Pago.
- **Checkout Transparente:** Pagamento processado diretamente na sua aplicação (Pix e Cartão de Crédito).
- **Webhooks & IPN:** Recebimento e processamento seguro de notificações de pagamento.

## Estrutura do Repositório

- `/examples`: Contém códigos de exemplo completos de backend prontos para rodar.
  - `/examples/nodejs-express`: Exemplo funcional em Node.js com Express.
  - `/examples/python-fastapi`: Exemplo funcional em Python com FastAPI.
- `/src/content/docs`: Documentação detalhada construída com Astro Starlight.

## Como rodar o site de documentação localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Licença

Este projeto está sob a licença MIT.
