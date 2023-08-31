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
    id: ID!
    title: String!
    desc: String!
    price: Float!
    quantity: Int!
    img: String!
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
    users: [User]
    user(id: ID!): User
    products: [Product]
    productsByGender(gender: String!): [Product]
    product(id: ID!): Product

    cart: [CartItem]
    favorites: [Product]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthData!
    login(email: String!, password: String!): AuthData!
    editUser(id: ID!, username: String, email: String): User!
    deleteUser(id: ID!): User!
    addToCart(productId: ID!, quantity: Int!): [CartItem]
    removeFromCart(productId: ID!): [CartItem]
    updateCartQuantity(productId: ID!, quantity: Int!): [CartItem]
    createCheckoutSession(productIds: [ID!]!): CheckoutSession!
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
    editProduct(id: ID!, name: String, description: String, price: Float): Product!
    deleteProduct(id: ID!): Product!
  }
`;

module.exports = typeDefs;
