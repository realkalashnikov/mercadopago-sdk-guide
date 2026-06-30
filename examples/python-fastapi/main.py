import os
import hmac
import hashlib
from fastapi import FastAPI, Request, Response, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import mercadopago
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Mercado Pago - Exemplo FastAPI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ACCESS_TOKEN = os.getenv("MERCADOPAGO_ACCESS_TOKEN")
WEBHOOK_SECRET = os.getenv("MERCADOPAGO_WEBHOOK_SECRET")

if not ACCESS_TOKEN:
    print("MERCADOPAGO_ACCESS_TOKEN não configurado.")

sdk = mercadopago.SDK(ACCESS_TOKEN or "")

# Helper pra validar a assinatura HMAC do webhook (evita fraude)
def verificar_assinatura(x_signature: str, request_id: str, resource_id: str, webhook_secret: str) -> bool:
    if not all([x_signature, request_id, resource_id, webhook_secret]):
        return False
        
    parts = x_signature.split(',')
    ts = None
    v1 = None
    for part in parts:
        if part.startswith('ts='):
            ts = part.split('=')[1]
        elif part.startswith('v1='):
            v1 = part.split('=')[1]
            
    if not ts or not v1:
        return False
        
    manifest = f"id:{resource_id};request-id:{request_id};ts:{ts};"
    
    calculated_hash = hmac.new(
        webhook_secret.encode('utf-8'),
        manifest.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(calculated_hash, v1)


def processar_pagamento_assincrono(payment_id: str):
    try:
        # Bate na API do MP pra consultar o status real
        payment_info = sdk.payment().get(payment_id)
        response = payment_info.get("response", {})
        
        status = response.get("status")
        external_reference = response.get("external_reference")
        
        print(f"Pagamento {payment_id} consultado. Status: {status}")
        
        if status == "approved":
            # TODO: liberar produto no banco
            print(f"[OK] Liberando pedido {external_reference}")
    except Exception as e:
        print(f"Erro ao consultar pagamento {payment_id}: {e}")


# 1. Checkout Pro (Gera link de redirecionamento)
@app.post("/payments/checkout-pro")
def checkout_pro():
    preference_data = {
        "items": [
            {
                "id": "prod-py-001",
                "title": "Produto Python de Exemplo",
                "quantity": 1,
                "unit_price": 30.00,
                "currency_id": "BRL"
            }
        ],
        "back_urls": {
            "success": "https://seusite.com/sucesso",
            "failure": "https://seusite.com/falhou",
            "pending": "https://seusite.com/pendente"
        },
        "auto_return": "approved",
        "notification_url": "https://sua-api-publica.com/payments/webhook",
        "external_reference": "pedido_fastapi_001"
    }
    
    try:
        preference_response = sdk.preference().create(preference_data)
        response = preference_response.get("response", {})
        
        return {
            "checkoutUrl": response.get("init_point"),
            "sandboxUrl": response.get("sandbox_init_point"),
            "preferenceId": response.get("id")
        }
    except Exception as e:
        print(f"Erro ao criar preferência: {e}")
        raise HTTPException(status_code=500, detail="Erro interno ao gerar preferência.")


# 2. Checkout Transparente (Pix)
@app.post("/payments/pix")
def pix_payment():
    payment_data = {
        "transaction_amount": 15.00,
        "description": "Pagamento Exemplo Pix Python",
        "payment_method_id": "pix",
        "payer": {
            "email": "comprador-py@email.com",
            "identification": {
                "type": "CPF",
                "number": "12345678909"
            }
        },
        "external_reference": "pedido_fastapi_002"
    }
    
    try:
        payment_response = sdk.payment().create(payment_data)
        response = payment_response.get("response", {})
        
        poi = response.get("point_of_interaction", {})
        transaction_data = poi.get("transaction_data", {})
        
        return {
            "paymentId": response.get("id"),
            "status": response.get("status"),
            "qrCodeBase64": transaction_data.get("qr_code_base64"),
            "qrCode": transaction_data.get("qr_code")
        }
    except Exception as e:
        print(f"Erro ao processar Pix: {e}")
        raise HTTPException(status_code=500, detail="Erro interno ao gerar Pix.")


# 3. Webhook (Recebimento de notificações)
@app.post("/payments/webhook")
async def receive_webhook(request: Request, background_tasks: BackgroundTasks):
    x_signature = request.headers.get("x-signature")
    request_id = request.headers.get("x-request-id")
    
    payload = await request.json()
    
    event_type = payload.get("type")
    action = payload.get("action")
    resource_id = payload.get("data", {}).get("id")
    
    # Responde 200 de cara pro MP não ficar reenviando em caso de lentidão nossa
    response = Response(status_code=200, content="OK")
    
    if WEBHOOK_SECRET and resource_id:
        is_valid = verificar_assinatura(x_signature, request_id, str(resource_id), WEBHOOK_SECRET)
        if not is_valid:
            print("Webhook rejeitado: assinatura inválida.")
            raise HTTPException(status_code=401, detail="Assinatura inválida")
        
    if event_type == "payment" and action in ["payment.created", "payment.updated"]:
        if resource_id:
            # Roda a consulta em background pra liberar a rota do webhook rápido
            background_tasks.add_task(processar_pagamento_assincrono, str(resource_id))
            
    return response


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
