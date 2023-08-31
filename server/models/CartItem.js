const mongoose = require('mongoose');
const Product = require('./Product');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
