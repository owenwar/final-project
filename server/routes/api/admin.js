const express = require('express');
const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/adminAuth');
const Product = require('../../models/Product');

const router = express.Router();

// Add a new product
router.post('/product', [auth, adminAuth], async (req, res) => {
    const { name, description, price, imageUrl, category, colorTag } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            imageUrl,
            category,
            colorTag
        });

        const product = await newProduct.save();
        res.json(product);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update product details
router.put('/product/:productId', [auth, adminAuth], async (req, res) => {
    const { name, description, price, imageUrl, category, colorTag } = req.body;

    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.imageUrl = imageUrl || product.imageUrl;
        product.category = category || product.category;
        product.colorTag = colorTag || product.colorTag;

        await product.save();
        res.json(product);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a product
router.delete('/product/:productId', [auth, adminAuth], async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        await product.remove();
        res.json({ msg: 'Product removed' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
