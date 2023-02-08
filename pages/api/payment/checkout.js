import Stripe from "stripe";
import auth from "../../../middleware/authUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            await handler(req, res);
            break
    }
}


const handler = async (req, res) => {
    try {
        const user = await auth(req, res)
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            customer_email: user.email,
            line_items: Object.entries(req.body).map(([key, value]) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: value.title,
                            images: [value.image]
                        },
                        unit_amount: value.amount * 100,
                    },
                    adjustable_quantity: {
                        enabled: false,
                    },
                    quantity: value.quantity
                }
            }),
            mode: 'payment',
            success_url: `${req.headers.origin}/success/orderSuccess?success=true&oid=12344323`,
            cancel_url: `${req.headers.origin}/cancel?canceled=true`,
        }
        const session = await stripe.checkout.sessions.create(params);
        return res.status(200).json(session)

    } catch (error) {
        return res.status(500).json({ 'Error': 'Method Not allowed' })
    }
}