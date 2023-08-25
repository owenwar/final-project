const Order = require('../models/Order');

const orderResolvers = {
    Mutation: {
            async createOrder(_, { products }) {
            const newOrder = new Order({ products });
            await newOrder.save();
            return newOrder;
        }
    }
};

module.exports = orderResolvers;
