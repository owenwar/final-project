const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/products', require('./products'));
// router.use('/payment', require('./payment'));
router.use('/orders', require('./orders'));
router.use('/favorites', require('./favorites'));
router.use('/cart', require('./cart'));
router.use('/admin', require('./admin'));



module.exports = router;
