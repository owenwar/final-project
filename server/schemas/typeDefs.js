const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type AuthData {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    cart: [CartItem]
    favorites: [Product]
  }

  type CartItem {
    product: Product!
    quantity: Int!
  }

  type Product {
    id: ID!

    name: String!
    description: String!
    price: Float!
    onSale: Boolean!
    imageUrl: String!
    category: String!
    colorTag: String!
    createdAt: String!
    gender: String!
  }

  type Order {
    id: ID!
    user: User!
    products: [CartItem]!
    totalAmount: Float!
    stripeChargeId: String!
  }

  type Query {
    user: User
    products: [Product]
    product(id: ID!): Product
    cart: [CartItem]
    favorites: [Product]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthData!
    login(email: String!, password: String!): AuthData!
    deleteUser(id: ID!): User!
    addToCart(productId: ID!, quantity: Int!): [CartItem]
    removeFromCart(productId: ID!): [CartItem]
    updateCartQuantity(productId: ID!, quantity: Int!): [CartItem]
    addToFavorites(productId: ID!): [Product]
    removeFromFavorites(productId: ID!): [Product]
    createOrder(stripeToken: String!): Order
    addProduct(
      name: String!
      description: String!
      price: Float!
      onSale: Boolean!
      imageUrl: String!
      category: String!
      colorTag: String!
      createdAt: String!
      gender: String!
    ): Product!
    deleteProduct(id: ID!): Product!
  }
`;

module.exports = typeDefs;
