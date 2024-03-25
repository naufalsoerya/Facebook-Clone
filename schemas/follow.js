const { GraphQLError } = require("graphql");
const Post = require("../models/Post");

const typeDefs = `#graphql
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: Date
    updatedAt: Date
  }
`