const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const requireAuth = require("../middleware/requireAuth");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// CREATE CHECKOUT SESSION
router.post("/create-checkout-session", requireAuth, async (req, res) => {
  console.log("🔥 PAYMENT ROUTE HIT");

  console.log("User object inside route:", req.user);

  if (!req.user) {
    console.log("❌ req.user is missing");
    return res.status(401).json({ error: "Auth failed before payment" });
  }

  try {
    console.log("Creating Stripe session...");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      metadata: {
        userId: req.user.sub,
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Pro Plan Subscription",
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/pricing`,
    });
    console.log("✔ Stripe session created:", session.id);

    res.json({ url: session.url });


  } catch (err) {
    console.log("❌ Stripe Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
