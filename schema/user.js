const { GraphQLError } = require("graphql");
const User = require("../models/User");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const typeDefs = `#graphql
    scalar Date

    type User {
      _id: ID
      name: String
      username: String!
      email: String!
      password: String
      followerDetail: [UserDetail]
      followingDetail: [UserDetail]
    }
    type UserDetail {
      _id: ID
      name: String
      username: String!
      email: String!
      password: String!
    }
    type Token {
      accessToken: String
    }
    type Query {
      user(_id: ID): User
      searchUsers(username: String!): User
    }
    type Mutation {
      createUser(name: String, username: String!, email: String!, password: String!): User
      loginUser(username: String!, password: String): Token
    }
`;

const resolvers = {
  Query: {
    user: async (_, args, contextValue) => {
      try {
        contextValue.auth();
        if (!args._id) throw new Error ("Id is required");

        const user = await User.getDetail(args._id);

        return user;
      } catch (error) {
        throw error;
      }
    },
    searchUsers: async (_, args) => {
      try {
        const { username } = args;
        if(!username) throw new Error ("Username is required");

        const user = await User.findByUsername(username);
        if (!user) {
          throw new Error( "Invalid Username/Password" );
        }

        return user;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createUser: async (_, { name, username, email, password }) => {
      try {
        const newUser = {
          name,
          username,
          email,
          password: hashPassword(password)
        };
        const result = await User.createOne(newUser);
        newUser._id = result.insertedId;

        return newUser;
      } catch (error) {
        throw error;
      }
    },
    loginUser: async (_, args) => {
      try {
        const { username, password } = args;
        if(!username) throw new Error ("Username is required");
        if(!password) throw new Error ("Password is required");
        
        const user = await User.findByUsername(username);
        if (!user) {
          throw new Error( "Invalid Username/Password" );
        }

        const validate = comparePassword(password, user.password);
        if (!validate) {
          throw new Error( "Invalid Username/Password" );
        }

        const token = {
          accessToken: signToken({
            id: user._id,
            username: username
          }),
        };

        return token;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};