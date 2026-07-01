# Exemplo Mercado Pago em Java (Spring Boot)

Este é um esqueleto para a integração funcional com o SDK do Mercado Pago em **Java (Spring Boot)**.

## 🤝 Quer contribuir?
Este exemplo ainda está vazio e precisa da ajuda da comunidade. Se você domina Java e o framework Spring Boot, envie um Pull Request preenchendo este projeto!

### O que o projeto de exemplo precisa implementar:
1. **Instalação e Configuração:**
   - Adicionar a dependência do SDK `com.mercadopago:sdk-java` no `pom.xml` ou `build.gradle`.
   - Inicializar o token de acesso (`MercadoPagoConfig.setAccessToken`) em uma classe de configuração `@Configuration` no startup da aplicação.
2. **Checkout Pro (Rota: `POST /payments/checkout-pro`):**
   - Rota de um `@RestController` que gera uma preferência de pagamento contendo itens e URL de webhooks.
3. **Checkout Transparente Pix (Rota: `POST /payments/pix`):**
   - Rota de um `@RestController` que gera uma transação Pix e retorna o QR Code em Base64 e a string Copia e Cola (EMV).
4. **Webhook de Notificações (Rota: `POST /payments/webhook`):**
   - Rota de um `@RestController` que recebe os webhooks de pagamento do Mercado Pago.
   - **Regra 1:** Deve responder HTTP `200 OK` imediatamente.
   - **Regra 2:** Deve consultar o status do pagamento na API de volta usando o ID recebido (evitando fraude).
   - **Regra 3:** Deve validar o cabeçalho `x-signature` usando o segredo do webhook com hash HMAC-SHA256.

Consulte o arquivo de [CONTRIBUTING.md](../../CONTRIBUTING.md) na raiz do repositório para detalhes de formatação e padrões de envio. Agradecemos a colaboração!
