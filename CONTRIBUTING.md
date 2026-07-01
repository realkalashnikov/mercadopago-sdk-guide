# Como Contribuir pro Mercado Pago SDK Guide

Fico muito feliz que você quer ajudar a melhorar esse guia! Esse repositório foi feito de dev para dev pra cobrir as falhas da documentação oficial.

Seja corrigindo um bug em um código, escrevendo um novo guia ou completando os projetos de exemplo das outras linguagens, toda ajuda é bem-vinda.

---

## 🛠️ O que precisamos de ajuda hoje?
Nosso objetivo é ter projetos funcionais completos na pasta `/examples` para todas as linguagens. Atualmente, temos exemplos em **Node.js (Express)** e **Python (FastAPI)**.

Você pode nos ajudar criando os exemplos funcionais em:
- [ ] **PHP (Laravel ou Slim)** em `/examples/php-laravel`
- [ ] **Go (Fiber ou Gin)** em `/examples/go-fiber`
- [ ] **.NET (C# WebAPI)** em `/examples/dotnet-webapi`
- [ ] **Ruby (Rails ou Sinatra)** em `/examples/ruby-rails`
- [ ] **Java (Spring Boot)** em `/examples/java-springboot`

---

## 📐 Padrões Obrigatórios de Código

Para manter o guia seguro e funcional, qualquer alteração ou novo exemplo enviado por Pull Request **deve seguir estas 3 regras**:

1. **Usar sempre a SDK v2:** Nunca utilize métodos estáticos antigos da v1 do Mercado Pago.
2. **Webhooks Rápidos:** Seu endpoint de webhook deve responder HTTP `200 OK` (ou `201`) imediatamente no início da função, antes de rodar qualquer banco de dados ou requisição externa, para evitar timeouts do Mercado Pago.
3. **Validação HMAC obrigatória:** Todos os endpoints de webhook devem validar a assinatura `x-signature` usando o hash HMAC-SHA256 e o segredo da conta para evitar fraudes de pagamentos forjados.

---

## 🚀 Fluxo de Trabalho (Como enviar um PR)

1. Faça um **Fork** deste repositório.
2. Crie uma branch com a sua feature: `git checkout -b feature/meu-exemplo-php`.
3. Faça o commit das suas alterações: `git commit -m "feat: adiciona exemplo funcional PHP Laravel"`.
4. Envie a branch pro seu Fork: `git push origin feature/meu-exemplo-php`.
5. Abra um **Pull Request** detalhando o que você adicionou ou corrigiu.

---

## 💻 Rodando a Documentação Localmente

Se você for alterar os arquivos Markdown/MDX da documentação, valide se o site compila localmente antes de abrir o PR:

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Teste a compilação de produção:
   ```bash
   npm run build
   ```

Agradecemos demais a sua ajuda! Juntos ajudamos mais devs a integrarem pagamentos sem dor de cabeça.
