const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
  typeDefs: typeDefsUser,
  resolvers: resolversUser,
} = require('./schema/user');
const {
  typeDefs: typeDefsPost,
  resolvers: resolversPost,
} = require('./schema/post');
const {
  typeDefs: typeDefsFollow,
  resolvers: resolversFollow,
} = require('./schema/follow');

const server = new ApolloServer({
  typeDefs: [
    typeDefsUser,
    typeDefsPost,
    typeDefsFollow,
  ],
  resolvers: [
    resolversUser,
    resolversPost,
    resolversFollow,
  ],
  introspection: true,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {port: 3000},
    context: () => {
      return {
        id: "123",
      };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
})();