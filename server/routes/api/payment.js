const express = require('express');
const auth = require('../../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../../models/User');
const Product = require('../../models/Product');

const router = express.Router();

// Process payment and create a new order
router.post('/charge', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.product');
        const { token } = req.body;

        // Calculate the total price
        const totalPrice = user.cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) * 100; // Convert to cents

        // Create a charge using Stripe
        const charge = await stripe.charges.create({
            amount: totalPrice,
            currency: 'usd',
            description: 'E-commerce Payment',
            source: token.id
        });

        // If payment is successful, create an order and clear the cart
        if (charge.status === 'succeeded') {
            const order = {
                products: user.cart,
                total: totalPrice / 100, // Convert back to dollars
                date: new Date()
            };

            user.orders.push(order);
            user.cart = [];
            await user.save();

            res.json({ msg: 'Payment successful', order });
        } else {
            res.status(400).json({ msg: 'Payment failed' });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
