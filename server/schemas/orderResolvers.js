const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require("../models/Product");

const orderResolvers = {
  Query: {
    async ordersByUser(_, { userId }) {
      const orders = await Order.find({ user: userId });
      return orders;
    },
  },

  Mutation: {
    async createOrder(_, { products }) {
      const newOrder = new Order({ products });
      await newOrder.save();
      return newOrder;
    },
  },
};

module.exports = orderResolvers;
