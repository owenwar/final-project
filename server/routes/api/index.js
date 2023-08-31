const express = require('express');
const router = express.Router();

router.use('/admin', require('./adminRoute'));
router.use('/stripe', require('./stripeRoutes'));



module.exports = router;
