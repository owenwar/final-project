const express = require('express');
const router = express.Router();

router.use('/adminRoute', require('./adminRoute'));



module.exports = router;
