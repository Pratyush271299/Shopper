import Stripe from "stripe";
import all_product from "../../Components/Assets/all_product";

const stripe = new Stripe(process.env.SHOPPER_STRIPE_SECRET_KEY)


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: req.body.map((item) => {
                const product = all_product.find(p => p.id === item.id);
                if (!product) {
                    throw new Error(`Product with ID ${item.id} not found!`)
                }
                const newImage = `/Assets/${product.image}`;
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.name,
                            image: [newImage],
                        },
                        unit_amount: product.new_price,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity,
                }
            }),
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?cancelled=true`
        }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}