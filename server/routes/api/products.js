const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

// Route to get male products
router.get('/products/male', async (req, res) => {
  try {
    const maleProducts = await Product.find({ gender: 'male' }); 
    res.json(maleProducts);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

// Route to get female products
router.get('/products/female', async (req, res) => {
  try {
    const femaleProducts = await Product.find({ gender: 'female' }); 
    res.json(femaleProducts);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

module.exports = router;