const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Product = require('../../models/Product');

const router = express.Router();

// Add a product (admin only)
router.post('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied' });
        }

        const { name, description, price, imageUrl, category, colorTag } = req.body;

        const product = new Product({
            name,
            description,
            price,
            imageUrl,
            category,
            colorTag
        });

        await product.save();
        res.json(product);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.put('/:id', async (req, res) => {
    const { name, description, price, imageUrl, category, colorTag } = req.body;

    try {
        let product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ msg: 'Product not found' });

        product.name = name;
        product.description = description;
        product.price = price;
        product.imageUrl = imageUrl;
        product.category = category;
        product.colorTag = colorTag;

        await product.save();

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ msg: 'Product not found' });

        await Product.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
