import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000, // Amount in the smallest currency unit (cents for USD)
        currency: 'usd', 
        payment_method_types: ['crypto'],
        description: 'Deposit USDC',
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating PaymentIntent:', error);
      res.status(500).json({ error: 'Failed to create PaymentIntent' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
