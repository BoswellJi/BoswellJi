const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = gql`
  type Query{
    hello: String
  }
`;
const resolvers = {
  Query: {
    hello: () => 'hellotytyty world'
  }
};

const server = new ApolloServer({
  typeDefs, resolvers
});
const app = express();
server.applyMiddleware({ app });

app.listen(4000, () => { });
