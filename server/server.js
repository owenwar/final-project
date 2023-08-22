const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
require('./config/db.js');

// Routes
app.use('/api/users', require('./routes/api/users'));
// .. other routes 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
