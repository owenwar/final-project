const typeDefs = require('./typeDefs');
const userResolvers = require('./userResolvers');
const productResolvers = require('./productResolvers');
const orderResolvers = require('./orderResolvers');

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...productResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...productResolvers.Mutation,
        ...orderResolvers.Mutation
    }
};

module.exports = { typeDefs, resolvers };
