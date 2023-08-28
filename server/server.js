const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/db');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./middleware/auth');
const adminAuth = require('./middleware/adminAuth');

const PORT = process.env.PORT || 3001;
const app = express();

// Body parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  await server.start();
  server.applyMiddleware({ app });

  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();

// Routes
app.use(require('./routes'));
app.use('/api/admin', adminAuth, require('./routes/api/adminRoute'));

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
