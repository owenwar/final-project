const express = require('express');
const auth = require('../../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../../models/User');
const Order = require('../../models/Order');

const router = express.Router();

// Create a new order and handle payment
router.post('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.product');
        const { stripeToken } = req.body;

        // Calculate the total order amount
        const totalAmount = user.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0) * 100; // Stripe expects the amount in cents

        // Create a charge using Stripe
        const charge = await stripe.charges.create({
            amount: totalAmount,
            currency: 'usd',
            description: 'E-commerce Order',
            source: stripeToken
        });

        // Create a new order in the database
        const order = new Order({
            user: req.user.id,
            products: user.cart,
            totalAmount: totalAmount / 100, // Convert back to dollars for storage
            stripeChargeId: charge.id
        });

        await order.save();

        // Clear the user's cart
        user.cart = [];
        await user.save();

        res.json(order);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
