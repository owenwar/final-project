const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const router = express.Router();

// Register a user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        // Create a new user
        user = new User({
            username,
            email,
            password
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Return JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login a user and return JWT
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        // Return JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add a product to the cart
router.post('/cart', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        user.cart.push({ product: productId, quantity });
        await user.save();

        res.json(user.cart);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get the user's cart
router.get('/cart', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.product');
        res.json(user.cart);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Remove an item from the cart
router.delete('/cart/:productId', auth, async (req, res) => {
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
