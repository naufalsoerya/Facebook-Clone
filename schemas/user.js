const { GraphQLError } = require("graphql");
const User = require("../model/User");

const typeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String!
        email: String!
        password: String!
    }
    type Query {
        user(_id: ID): User
        users: [User]
    }
    type Mutation {
        createUser(name: String, username: String!, email: String!, password: String!): User
        loginUser(username: String!, password: String!): User
    }
`;

const resolvers = {
  Query: {
    user: async (_, args) => {
      try {
        if(!args._id) {
          throw new GraphQLError("Id not found", {
            extensions: {
              code: "NOT_FOUND"
            }
          });
        }
        const user = await User.findById(args._id);
        return user;
      } catch (error) {
        throw error;
      }
    },
    users: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    createUser: async (_, {name, username, email, password}) => {
      try {
        const newUser = {
          name,
          username,
          email,
          password
        };
        const result = await User.createOne(newUser);
        newUser._id = result.insertedId;

        return newUser;
      } catch (error) {
        throw error;
      }
    },
    loginUser: async (_, {username, password}) => {
      try {
        const user = await User.findOne({username, password});
        if(!user) {
          throw new GraphQLError("Invalid credentials", {
            extensions: {
              code: "INVALID_CREDENTIALS"
            }
          })
        }
      } catch(error) {
        throw error;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers
};
