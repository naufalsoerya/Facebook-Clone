const User = require("../models/user");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { ObjectId } = require("mongodb");

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
      userPost: [UserPost]
    }
    type UserDetail {
      _id: ID
      name: String
      username: String!
      email: String!
      password: String!
    }
    type UserPost {
      _id: ID
      content: String!
      tags: [String]
      imgUrl: String!
      authorId: ID!
      comments: [Comments]
      likes: [Likes]
      createdAt: String
      updatedAt: String
    }
    type Token {
      accessToken: String
    }
    type Query {
      user(_id: ID): User
      searchUsers(username: String!): User
      profileUser: User
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
        const currentUser = contextValue.auth();
        // console.log(currentUser, "<<<<");
        const id = new ObjectId(String(currentUser.id));

        if (!id) throw new Error("Id is required");

        const user = await User.getDetail(id);

        return user;
      } catch (error) {
        throw error;
      }
    },
    searchUsers: async (_, args, contextValue) => {
      try {
        contextValue.auth();
        const { username } = args;
        if (!username) throw new Error("Username is required");

        const user = await User.getByUsername(username);
        if (!user) {
          throw new Error("User Not Found");
        }

        return user;
      } catch (error) {
        throw error;
      }
    },
    profileUser: async (_, __, { auth }) => {
      const data = auth();
      const profileUser = await User.profileUser(data.id);
      return profileUser;
    },
  },
  Mutation: {
    createUser: async (_, { name, username, email, password }) => {
      try {
        if (!name) throw new Error("Name is required");
        if (!username) throw new Error("Username is required");
        if (!email) throw new Error("Email is required");
        if (!password) throw new Error("Password is required");

        const validEmail =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
        if (!email.match(validEmail)) {
          throw new Error("Email must be formated (example@mail.com)");
        }

        if (password.length < 5) {
          throw new Error("Password must be at least 5 characters long");
        }

        const findEmail = await User.findByEmail(email);
        if (findEmail) throw new Error("Email already exists");

        const newUser = {
          name,
          username,
          email,
          password: hashPassword(password),
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
        if (!username) throw new Error("Username is required");
        if (!password) throw new Error("Password is required");

        const user = await User.findByUsername(username);
        if (!user) {
          throw new Error("Invalid Username/Password");
        }

        const validate = comparePassword(password, user.password);
        if (!validate) {
          throw new Error("Invalid Username/Password");
        }

        const token = {
          accessToken: signToken({
            id: user._id,
            username: username,
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
