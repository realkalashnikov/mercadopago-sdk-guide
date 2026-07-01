# Exemplo Mercado Pago em .NET (WebAPI)

Este é um esqueleto para a integração funcional com o SDK do Mercado Pago em **.NET (C# WebAPI)**.

## 🤝 Quer contribuir?
Este exemplo ainda está vazio e precisa da ajuda da comunidade. Se você domina C# e ASP.NET Core WebAPI, envie um Pull Request preenchendo este projeto!

### O que o projeto de exemplo precisa implementar:
1. **Instalação e Configuração:**
   - Adicionar o pacote NuGet `MercadoPago`.
   - Inicializar `MercadoPagoConfig.AccessToken` no `Program.cs` puxando do arquivo de configurações/variáveis de ambiente.
2. **Checkout Pro (Rota: `POST /payments/checkout-pro`):**
   - Endpoint que cria uma preferência de pagamento contendo itens e URL de notificações.
3. **Checkout Transparente Pix (Rota: `POST /payments/pix`):**
   - Endpoint que cria um pagamento Pix no Mercado Pago e retorna o QR Code em Base64 e a string Copia e Cola (EMV).
4. **Webhook de Notificações (Rota: `POST /payments/webhook`):**
   - Endpoint que recebe os webhooks de pagamento do Mercado Pago.
   - **Regra 1:** Deve responder HTTP `200 OK` imediatamente.
   - **Regra 2:** Deve consultar o status do pagamento na API de volta usando o ID recebido (evitando fraude).
   - **Regra 3:** Deve validar o cabeçalho `x-signature` usando o segredo do webhook com hash HMAC-SHA256.

Consulte o arquivo de [CONTRIBUTING.md](../../CONTRIBUTING.md) na raiz do repositório para detalhes de formatação e padrões de envio. Agradecemos a colaboração!
