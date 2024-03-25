const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  typeDefs: typeDefsUser,
  resolvers: resolversUser,
} = require('./schema/user');

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => console.log(`🚀 Server ready at ${url}`));