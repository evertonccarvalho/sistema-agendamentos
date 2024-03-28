import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SK || "", {
	apiVersion: '2023-10-16',
	typescript: true,
});
