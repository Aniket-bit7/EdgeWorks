const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const requireAuth = require("../middleware/requireAuth");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", requireAuth, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: req.user.email,
      customer_creation: "always",
      metadata: { userId: req.user.sub },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Pro Plan Subscription" },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/pricing`,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
