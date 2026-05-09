const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, price, image, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
    }

    const priceInCents = Math.round(parseFloat(price) * 100);

    const sessionParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: name,
              description: description || undefined,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin || process.env.SITE_URL}/sucesso.html`,
      cancel_url: `${req.headers.origin || process.env.SITE_URL}/`,
    };

    if (image && image.startsWith('http')) {
      sessionParams.line_items[0].price_data.product_data.images = [image];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
};
