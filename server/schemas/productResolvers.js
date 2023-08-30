const Product = require('../models/Product');

const productResolvers = {
    Query: {
        async products() {
            return await Product.find();
        },
        async product(_, { id }) {
            return await Product.findById(id);
        },
        productsByGender: async (_, { gender }) => {
            try {
                return await Product.find({ gender });
            } catch (error) {
                throw new Error(error);
            }
        },
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
          async editProduct(_, { id, name, description, price, onSale, imageUrl, category, colorTag, createdAt, gender }, context) {
            const product = await Product.findById(id);
            if (!product) {
              throw new Error('Product not found');
            }
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.onSale = onSale !== undefined ? onSale : product.onSale;
            product.imageUrl = imageUrl || product.imageUrl;
            product.category = category || product.category;
            product.colorTag = colorTag || product.colorTag;
            product.createdAt = createdAt || product.createdAt;
            product.gender = gender || product.gender;
            await product.save();
            return product;
          },
          async deleteProduct(_, { id }) {
            return await Product.findByIdAndDelete(id);
          },
    }
};


module.exports = productResolvers;