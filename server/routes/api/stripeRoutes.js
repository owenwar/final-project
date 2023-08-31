const express = require("express");
const router = express.Router();
const stripe = require("../config/stripe");
const Product = require("../../models/Product"); // Import your Product model

router.post("/create-checkout-session", async (req, res) => {
  try {
    const productIds = req.body.productIds; // Array of product IDs from the client
    const products = await Product.find({ _id: { $in: productIds } }); // Fetch products from your DB

    const line_items = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          id: product.id,
          name: product.name,
          description: product.description,
          images: [product.imageUrl],
        },
        unit_amount: product.price * 100, // price in cents
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
