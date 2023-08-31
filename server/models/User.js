const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

module.exports = mongoose.model('User', userSchema);
