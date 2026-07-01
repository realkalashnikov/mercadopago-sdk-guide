# Exemplo Mercado Pago em PHP (Laravel)

Este é um esqueleto para a integração funcional com o SDK v2 do Mercado Pago em **PHP (Laravel)**.

## 🤝 Quer contribuir?
Este exemplo ainda está vazio e precisa da ajuda da comunidade. Se você domina PHP e Laravel, envie um Pull Request preenchendo este projeto!

### O que o projeto de exemplo precisa implementar:
1. **Instalação e Configuração:**
   - Adicionar o SDK `mercadopago/dx-php` no `composer.json`.
   - Inicializar o token de acesso no `AppServiceProvider` ou em um Controller usando variáveis de ambiente do `.env`.
2. **Checkout Pro (Rota: `POST /payments/checkout-pro`):**
   - Rota que cria uma preferência de pagamento com redirecionamento contendo itens e URL de webhooks.
3. **Checkout Transparente Pix (Rota: `POST /payments/pix`):**
   - Rota que cria um pagamento Pix no Mercado Pago e retorna o ID da transação, a imagem do QR Code em Base64 e a string Copia e Cola (EMV).
4. **Webhook de Notificações (Rota: `POST /payments/webhook`):**
   - Rota que recebe os webhooks de pagamento do Mercado Pago.
   - **Regra 1:** Deve responder HTTP `200 OK` imediatamente.
   - **Regra 2:** Deve consultar o status do pagamento na API de volta usando o ID recebido (evitando fraude).
   - **Regra 3:** Deve validar o cabeçalho `x-signature` usando o segredo do webhook com hash HMAC-SHA256.

Consulte o arquivo de [CONTRIBUTING.md](../../CONTRIBUTING.md) na raiz do repositório para detalhes de formatação e padrões de envio. Agradecemos a colaboração!
