# Exemplo Mercado Pago em Go (Fiber)

Este é um esqueleto para a integração funcional com o SDK v2 do Mercado Pago em **Go (Fiber)**.

## 🤝 Quer contribuir?
Este exemplo ainda está vazio e precisa da ajuda da comunidade. Se você domina Go e o framework Fiber, envie um Pull Request preenchendo este projeto!

### O que o projeto de exemplo precisa implementar:
1. **Instalação e Configuração:**
   - Inicializar o módulo Go com o SDK `github.com/mercadopago/sdk-go`.
   - Inicializar a configuração base (`config.New`) com o Access Token das variáveis de ambiente.
2. **Checkout Pro (Rota: `POST /payments/checkout-pro`):**
   - Rota que cria uma preferência de pagamento contendo itens, URLs de retorno e URL de webhooks.
3. **Checkout Transparente Pix (Rota: `POST /payments/pix`):**
   - Rota que cria uma transação Pix no Mercado Pago e retorna o QR Code em Base64 e a string Copia e Cola (EMV).
4. **Webhook de Notificações (Rota: `POST /payments/webhook`):**
   - Rota que recebe os webhooks de pagamento do Mercado Pago.
   - **Regra 1:** Deve responder HTTP `200 OK` imediatamente.
   - **Regra 2:** Deve consultar o status do pagamento na API de volta usando o ID recebido (evitando fraude).
   - **Regra 3:** Deve validar o cabeçalho `x-signature` usando o segredo do webhook com hash HMAC-SHA256.

Consulte o arquivo de [CONTRIBUTING.md](../../CONTRIBUTING.md) na raiz do repositório para detalhes de formatação e padrões de envio. Agradecemos a colaboração!
