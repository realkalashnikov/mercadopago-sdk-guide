import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
const webhookSecret = process.env.MERCADOPAGO_WEBHOOK_SECRET;

if (!accessToken) {
  console.warn('MERCADOPAGO_ACCESS_TOKEN não configurado.');
}

const mpClient = new MercadoPagoConfig({
  accessToken: accessToken || '',
  options: { timeout: 5000 }
});

// Helper pra validar a assinatura HMAC do webhook (evita fraude)
function verifySignature(xSignature: string, requestId: string, resourceId: string, secret: string): boolean {
  if (!xSignature || !requestId || !resourceId || !secret) return false;

  const parts = xSignature.split(',');
  const tsPart = parts.find(p => p.startsWith('ts='));
  const hashPart = parts.find(p => p.startsWith('v1='));

  if (!tsPart || !hashPart) return false;

  const ts = tsPart.split('=')[1];
  const v1 = hashPart.split('=')[1];

  const manifest = `id:${resourceId};request-id:${requestId};ts:${ts};`;

  const calculatedHash = crypto
    .createHmac('sha256', secret)
    .update(manifest)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(calculatedHash, 'hex'),
    Buffer.from(v1, 'hex')
  );
}

// 1. Checkout Pro (Gera link de redirecionamento)
app.post('/payments/checkout-pro', async (req: Request, res: Response) => {
  try {
    const preference = new Preference(mpClient);

    const result = await preference.create({
      body: {
        items: [
          {
            id: 'item-001',
            title: 'Produto de Teste Exemplo',
            quantity: 1,
            unit_price: 25.00,
            currency_id: 'BRL',
          }
        ],
        back_urls: {
          success: 'https://seusite.com/sucesso',
          failure: 'https://seusite.com/falhou',
          pending: 'https://seusite.com/pendente'
        },
        auto_return: 'approved',
        notification_url: 'https://sua-api-publica.com/payments/webhook',
        external_reference: 'id_do_pedido_12345'
      }
    });

    res.json({
      checkoutUrl: result.init_point,
      sandboxUrl: result.sandbox_init_point,
      preferenceId: result.id
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar preferência', details: error.message });
  }
});

// 2. Checkout Transparente (Pix)
app.post('/payments/pix', async (req: Request, res: Response) => {
  try {
    const payment = new Payment(mpClient);

    const result = await payment.create({
      body: {
        transaction_amount: 10.00,
        description: 'Doação de Exemplo via Pix',
        payment_method_id: 'pix',
        payer: {
          email: 'comprador@email.com',
          identification: {
            type: 'CPF',
            number: '12345678909' // CPF válido obrigatório pra gerar Pix no MP
          }
        },
        external_reference: 'id_do_pedido_67890'
      }
    });

    res.json({
      paymentId: result.id,
      status: result.status,
      qrCodeBase64: result.point_of_interaction?.transaction_data?.qr_code_base64,
      qrCode: result.point_of_interaction?.transaction_data?.qr_code
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar Pix', details: error.message });
  }
});

// 3. Webhook (Recebimento de notificações)
app.post('/payments/webhook', async (req: Request, res: Response) => {
  const { action, data, type } = req.body;
  const xSignature = req.headers['x-signature'] as string;
  const requestId = req.headers['x-request-id'] as string;

  // Responde 200 de cara pro MP não ficar reenviando em caso de lentidão nossa
  res.status(200).send('OK');

  if (webhookSecret && data?.id) {
    const isValid = verifySignature(xSignature, requestId, data.id, webhookSecret);
    if (!isValid) {
      console.warn('Webhook rejeitado: assinatura inválida.');
      return;
    }
  }

  // Se for notificação de pagamento, bate na API do MP pra consultar o status real
  if (type === 'payment' && (action === 'payment.created' || action === 'payment.updated')) {
    const paymentId = data?.id;
    if (!paymentId) return;

    try {
      const payment = new Payment(mpClient);
      const paymentData = await payment.get({ id: paymentId });

      const status = paymentData.status;
      const extRef = paymentData.external_reference;

      console.log(`Pedido ${extRef} atualizado: ${status}`);

      if (status === 'approved') {
        // TODO: liberar produto no banco
        console.log(`[OK] Liberando pedido ${extRef}`);
      }
    } catch (err: any) {
      console.error(`Erro ao buscar pagamento ${paymentId}:`, err.message);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});
