const { GraphQLError } = require("graphql");
const Post = require("../models/post");

const typeDefs = `#graphql
  scalar Date

  type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID! 
    comments: [Comments]
    likes: [Likes]
    createdAt: Date
    updatedAt: Date
  }
  type Comments {
    content: String!
    username: String!
    createdAt: Date
    updatedAt: Date
  }
  type Likes {
    username: String!
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    posts: [Post]
    post(_id: ID): Post
  }
  type Mutation {
    createPost(content: String!, tags: [String], imgUrl: String, authorId: ID!): Post
    commentPost(_id: ID, content: String!): Post
    likePost(_id: ID): Post
  }
`;

const resolvers = {
  Query: {
    posts: async () => {
      try {
        const posts = await Post.findAll();
        return posts;
      } catch (error) {
        throw error;
      }
    },
    post: async (_, args, contextValue) => {
      try {
        contextValue.auth();
        if (!args._id) throw new Error("Id is required");

        const post = await Post.findById(args._id);

        return post;
      } catch (error) {
        throw error;
      }

    },
  },
  Mutation: {
    createPost: async (_, { content, tags, imgUrl }, contextValue) => {
      try {
        const currentUser = contextValue.auth();
        if (!content) throw new Error("Content is required");
        if (!currentUser.id) throw new Error("Author ID is required");

        console.log(currentUser);
        const newPost = {
          content,
          tags,
          imgUrl,
          authorId: currentUser.id,
          comments: [],
          likes: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const result = await Post.createOne(newPost);
        newPost._id = result.insertedId;

        return newPost;
      } catch (error) {
        throw error;
      }
    },
    commentPost: async (_, {content, _id}, contextValue) => {
      try {
        const currentUser = contextValue.auth();
        if (!content) throw new Error("Content is required");
        if (!currentUser.username) throw new Error("Username is required");
        if (!_id) throw new Error("Id not found");

        const newComment = {
          content,
          username: currentUser.username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const result = await Post.updateOne(
          _id,
          { comments: newComment } 
        );

        return result;
      } catch (error) {
        throw error;
      }
    },
    likePost: async (_, {_id}, contextValue) => {
      try {
        const currentLike = contextValue.auth();
        console.log(currentLike);
        if (!_id) throw new Error("Id not found");
        if (!currentLike.username) throw new Error("Username is required");
        
        const newLike = {
          username: currentLike.username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const result = await Post.updateOne(
          _id,
          { likes: newLike } 
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers
};