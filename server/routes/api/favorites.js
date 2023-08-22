const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Product = require('../../models/Product');

// Add to Favorites
router.put('/add/:productId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Check if the product is already favorited
        if (user.favorites.includes(req.params.productId)) {
            return res.status(400).json({ msg: 'Product already favorited' });
        }

        user.favorites.push(req.params.productId);
        await user.save();

        res.json(user.favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Remove from Favorites
router.put('/remove/:productId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Check if the product is in favorites
        if (!user.favorites.includes(req.params.productId)) {
            return res.status(400).json({ msg: 'Product not in favorites' });
        }

        const removeIndex = user.favorites.indexOf(req.params.productId);
        user.favorites.splice(removeIndex, 1);
        await user.save();

        res.json(user.favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Fetch User's Favorites
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favorites');
        res.json(user.favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
