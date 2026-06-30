// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
	integrations: [
		mermaid({
			autoTheme: true
		}),
		starlight({
			title: 'Mercado Pago SDK Guide',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/realkalashnikov/portfolio' }],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Início',
					items: [
						{ label: 'Introdução', slug: 'introducao' },
					],
				},
				{
					label: 'Integração Passo a Passo',
					items: [
						{ label: '1. Configuração Inicial', slug: 'configuracao' },
						{ label: '2. Fluxo OAuth 2.0', slug: 'oauth' },
						{ label: '3. Checkout Pro', slug: 'checkout-pro' },
						{ label: '4. Checkout Transparente', slug: 'checkout-transparente' },
						{ label: '5. Cobrando Taxas (Marketplace)', slug: 'marketplace-fees' },
						{ label: '6. Webhooks & Segurança', slug: 'webhooks' },
					],
				},
				{
					label: 'Recursos',
					items: [
						{ label: 'Clonar Exemplos', slug: 'exemplos' },
					],
				},
			],
		}),
	],
});
