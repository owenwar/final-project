const User = require("../models/User");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

const cartResolvers = {
  Mutation: {
    async addToCart(_, { productId, quantity }, context) {
      const user = await User.findById(context.user.id);
      const existingCartItem = await CartItem.findOne({
        productId,
        user: context.user.id,
      });

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
      } else {
        const newCartItem = new CartItem({
          productId,
          quantity,
          user: context.user.id,
        });
        await newCartItem.save();
        user.cart.push(newCartItem);
      }

      await user.save();
      return user.cart;
    },
    async removeFromCart(_, { productId }, context) {
      const user = await User.findById(context.user.id);
      const cartItem = await CartItem.findOne({ productId, user: context.user.id });

      if (cartItem) {
        await CartItem.findByIdAndDelete(cartItem._id);
        user.cart = user.cart.filter(item => item.toString() !== cartItem._id.toString());
        await user.save();
      }

      return user.cart;
    },
    async updateCartQuantity(_, { productId, quantity }, context) {
      const cartItem = await CartItem.findOne({ productId, user: context.user.id });

      if (cartItem) {
        cartItem.quantity = quantity;
        await cartItem.save();
      }

      return (await User.findById(context.user.id)).cart;
    },
  },
  CartItem: {
    product: async (parent, args, context, info) => {
      return await Product.findById(parent.productId);
    },
  },
};

module.exports = cartResolvers;