const Product = require('../models/Product');

const productResolvers = {
    Query: {
        async products() {
            return await Product.find();
        },
        async product(_, { id }) {
            return await Product.findById(id);
        }
    }
};

module.exports = productResolvers;