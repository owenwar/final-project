const Product = require('../models/Product');

const productResolvers = {
    Query: {
        async products() {
            return await Product.find();
        },
        async product(_, { id }) {
            return await Product.findById(id);
        }
    },
    Mutation: {
        async addProduct(_, { type, name, description, price, imageUrl, gender }) {
            return await Product.create({ type, name, description, price, imageUrl, gender });
        }
    }
};


module.exports = productResolvers;