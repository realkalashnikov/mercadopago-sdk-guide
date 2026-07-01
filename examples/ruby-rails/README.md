# Exemplo Mercado Pago em Ruby (Rails)

Este é um esqueleto para a integração funcional com o SDK do Mercado Pago em **Ruby (Rails)**.

## 🤝 Quer contribuir?
Este exemplo ainda está vazio e precisa da ajuda da comunidade. Se você domina Ruby e o framework Rails (ou Sinatra), envie um Pull Request preenchendo este projeto!

### O que o projeto de exemplo precisa implementar:
1. **Instalação e Configuração:**
   - Adicionar a gem `mercadopago-sdk` no `Gemfile`.
   - Inicializar o cliente do SDK em um inicializador (`config/initializers/mercadopago.rb`) com a credencial das variáveis de ambiente.
2. **Checkout Pro (Rota: `POST /payments/checkout-pro`):**
   - Rota do controller que gera uma preferência de pagamento contendo itens e URL de webhooks.
3. **Checkout Transparente Pix (Rota: `POST /payments/pix`):**
   - Rota do controller que gera uma transação Pix e retorna o QR Code em Base64 e a string Copia e Cola (EMV).
4. **Webhook de Notificações (Rota: `POST /payments/webhook`):**
   - Rota do controller que recebe os webhooks de pagamento do Mercado Pago.
   - **Regra 1:** Deve responder HTTP `200 OK` imediatamente.
   - **Regra 2:** Deve consultar o status do pagamento na API de volta usando o ID recebido (evitando fraude).
   - **Regra 3:** Deve validar o cabeçalho `x-signature` usando o segredo do webhook com hash HMAC-SHA256.

Consulte o arquivo de [CONTRIBUTING.md](../../CONTRIBUTING.md) na raiz do repositório para detalhes de formatação e padrões de envio. Agradecemos a colaboração!
