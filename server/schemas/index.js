const typeDefs = require('./typeDefs');
const userResolvers = require('./userResolvers');
const productResolvers = require('./productResolvers');
const orderResolvers = require('./orderResolvers');
const cartResolvers = require('./cartResolvers');

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...productResolvers.Query,
        ...orderResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...productResolvers.Mutation,
        ...orderResolvers.Mutation
    },
    CartItem: cartResolvers.CartItem,
};

module.exports = { typeDefs, resolvers };
