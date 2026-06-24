import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  seeker_pro: "price_1TlqhMRWLeOYOosHORlKGmsq",
  seeker_premium: "price_1Tls40RWLeOYOosH0vrt9vHj",
  recruiter_growth: "price_1Tls54RWLeOYOosHlm57zStD",
  recruiter_enterprise: "price_1Tls5YRWLeOYOosHKdQmeYbU",
};
