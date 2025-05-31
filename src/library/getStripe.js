import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        return stripePromise = loadStripe(process.env.SHOPPER_STRIPE_PUBLISHABLE_KEY);
    }
}

export default getStripe;