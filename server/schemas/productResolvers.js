const Product = require('../models/Product');

const productResolvers = {
    Query: {
        async products() {
            return await Product.find();
        },
        async product(_, { id }) {
            return await Product.findById(id);
        },
        async productsByGender(_, { gender }) {
            return await Product.find({ gender });
        }
    }
};

module.exports = productResolvers;