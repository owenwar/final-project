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
    updatedAt: Date
});

module.exports = mongoose.model('Product', productSchema);
