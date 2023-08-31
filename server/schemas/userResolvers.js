require("dotenv").config();
const User = require("../models/User");
const Product = require("../models/Product");
const CartItem = require("../models/CartItem");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userResolvers = {
  Query: {
    async users() {
      const users = await User.find().select("-password");
      return users;
    },
    async user(_, { id }) {
      const user = await User.findById(id).select("-password");
      return user;
    },
  },
  Mutation: {
    async register(_, { username, email, password }) {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 12); // Hash the password
      const newUser = new User({ username, email, password: hashedPassword }); // Use the hashed password
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });
      return { token, user: newUser };
    },
    async login(_, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid credentials"); // Generic error message
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error("Invalid credentials"); // Generic error message
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });
      return { token, user };
    },
    async editUser(_, { id, username, email }, context) {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      user.username = username || user.username;
      user.email = email || user.email;
      await user.save();
      return user;
    },
    async deleteUser(_, { id }) {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      await User.findByIdAndDelete(id);
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
    },
  },

  CartItem: {
    product: async (parent, args, context, info) => {
      return await Product.findById(parent.productId);
    },
  },

};

module.exports = userResolvers;
