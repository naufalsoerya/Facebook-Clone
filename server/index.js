const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { verifyToken } = require("./helpers/jwt");
require('dotenv').config();

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
    listen: {port: process.env.PORT},
    context: ({req, res}) => {
      return {
        id: "123",
        auth: () => {
          const auth = req.headers.authorization;
          if(!auth) throw new Error('Authorization token is required');
          const token = auth.split(" ")[1];
          
          const decoded = verifyToken(token)
          if(!decoded) throw new Error('Invalid or expired token')

          return decoded;
        }
      };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
})();