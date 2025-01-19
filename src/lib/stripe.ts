import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SK || "", {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});
