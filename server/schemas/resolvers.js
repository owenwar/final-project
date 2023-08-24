const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
    Query: {
        async user(_, args, context) {
            const user = await User.findById(context.user.id).select('-password');
            return user;
        },
        async products() {
            return await Product.find();
        },
        async product(_, { id }) {
            return await Product.findById(id);
        }
    },
    Mutation: {
        async register(_, { username, email, password }) {
            const user = await User.findOne({ email });
            if (user) {
                throw new Error('User already exists');
            }
            const newUser = new User({ username, email, password });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, 'YOUR_SECRET_KEY'); // Replace 'YOUR_SECRET_KEY' with your actual secret
            return { token, user: newUser };
        },
        async login(_, { email, password }) {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                throw new Error('Invalid password');
            }
            const token = jwt.sign({ id: user._id }, 'YOUR_SECRET_KEY'); // Replace 'YOUR_SECRET_KEY' with your actual secret
            return { token, user };
        },
        async createOrder(_, { products }) {
            const newOrder = new Order({ products });
            await newOrder.save();
            return newOrder;
        },
        async addToCart(_, { productId }, context) {
            const user = await User.findById(context.user.id);
            user.cart.push(productId);
            await user.save();
            return user;
        },
        async removeFromCart(_, { productId }, context) {
            const user = await User.findById(context.user.id);
            const index = user.cart.indexOf(productId);
            if (index > -1) {
                user.cart.splice(index, 1);
                await user.save();
            }
            return user;
        },
        async addToFavorites(_, { productId }, context) {
            const user = await User.findById(context.user.id);
            user.favorites.push(productId);
            await user.save();
            return user;
        },
        async removeFromFavorites(_, { productId }, context) {
            const user = await User.findById(context.user.id);
            const index = user.favorites.indexOf(productId);
            if (index > -1) {
                user.favorites.splice(index, 1);
                await user.save();
            }
            return user;
        }
    }
};

module.exports = resolvers;
