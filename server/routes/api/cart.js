const express = require('express');
const auth = require('../../middleware/auth');
const Product = require('../../models/Product');
const User = require('../../models/User');

const router = express.Router();

// Add a product to the cart
router.post('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Check if product is already in the cart
        const productInCart = user.cart.find(item => item.product.toString() === productId);
        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }

        await user.save();
        res.json(user.cart);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get the user's cart
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.product');
        res.json(user.cart);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update quantity of a product in the cart
router.put('/:productId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const productId = req.params.productId;
        const { quantity } = req.body;

        const productInCart = user.cart.find(item => item.product.toString() === productId);
        if (!productInCart) {
            return res.status(404).json({ msg: 'Product not found in cart' });
        }

        productInCart.quantity = quantity;
        await user.save();
        res.json(user.cart);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Remove an item from the cart
router.delete('/:productId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const productId = req.params.productId;

        user.cart = user.cart.filter(item => item.product.toString() !== productId);
        await user.save();

        res.json(user.cart);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
