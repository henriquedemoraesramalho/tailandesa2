# Global Mantos ⚽

Loja de camisas de futebol com checkout dinâmico via Stripe.

---

## Como publicar (passo a passo)

### 1. Suba pro GitHub
1. Crie um repositório novo em github.com (pode ser privado)
2. Faça upload de todos os arquivos desta pasta

### 2. Conecte ao Vercel
1. Acesse vercel.com e faça login com sua conta GitHub
2. Clique em **"Add New Project"**
3. Selecione o repositório do Global Mantos
4. Clique em **"Deploy"** (as configurações já estão no vercel.json)

### 3. Configure as variáveis de ambiente no Vercel
No painel do projeto no Vercel, vá em **Settings → Environment Variables** e adicione:

| Nome | Valor |
|------|-------|
| `STRIPE_SECRET_KEY` | Sua chave secreta do Stripe (`sk_live_...`) |
| `SITE_URL` | URL do seu site no Vercel (ex: `https://global-mantos.vercel.app`) |

> ⚠️ **NUNCA coloque a Secret Key no código** — ela fica somente nas variáveis de ambiente do Vercel.

### 4. Redeploy
Após adicionar as variáveis, clique em **Deployments → Redeploy** para o site pegar as variáveis.

---

## Como usar o site

- Clique em **"+ Adicionar"** para cadastrar uma camisa
- Preencha os dados e o **preço em R$**
- Adicione fotos e vídeo
- O botão **"Comprar Agora"** abre o checkout do Stripe automaticamente

---

## Estrutura do projeto

```
global-mantos/
├── api/
│   └── checkout.js      ← função serverless (backend Stripe)
├── public/
│   ├── index.html       ← site principal
│   └── sucesso.html     ← página após pagamento
├── package.json
├── vercel.json
└── README.md
```
