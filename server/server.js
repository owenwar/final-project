require('dotenv').config();
const express = require('express');
const path = require('path'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
require('./config/db.js');

// Routes
app.use('/', require('./routes'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
