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
        async addProduct(_, { name, description, price, onSale, imageUrl, category, colorTag, gender, createdAt }) {
            return await Product.create({
              name,
              description,
              price,
              onSale,
              imageUrl,
              category,
              colorTag,
              gender,
              createdAt,
            });
          },
          async deleteProduct(_, { id }) {
            return await Product.findByIdAndDelete(id);
          },
    }
};


module.exports = productResolvers;