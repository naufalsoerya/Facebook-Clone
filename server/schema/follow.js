const Follow = require("../models/follow");
const { ObjectId } = require("mongodb");

const typeDefs = `#graphql
  scalar Date

  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: Date
    updatedAt: Date
  }
  type Mutation {
    followUser(_id: ID!): Follow
  }
`;

const resolvers = {
  Mutation: {
    followUser: async (_, { _id }, contextValue) => {
      contextValue.auth();
      const data = contextValue.auth();

      const followerId = new ObjectId(String(data.id));
      const followingId = new ObjectId(String(_id));

      const newFollow = {
        followingId,
        followerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const result = await Follow.createFollow(newFollow);
      newFollow._id = result.insertedId;
      return newFollow;
    },
  },
};


module.exports = {
  typeDefs,
  resolvers
};