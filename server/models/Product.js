const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    onSale: Boolean,
    imageUrl: String,
    category: String,
    colorTag: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    gender: {
        type: String,
        enum: ['male', 'female'],  // Only allow these values
        required: true
    },
});

module.exports = mongoose.model('Product', productSchema);
