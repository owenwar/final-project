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
    async createCheckoutSession(_, { productIds }) {
      const products = await Product.find({ id: { $in: productIds } });
      const line_items = products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.imageUrl],
          },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      }));

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });

      return { sessionId: session.id };
    },
  },
};

module.exports = orderResolvers;
