const Post = require("../models/post");
const redis = require('../config/redis');
const { ObjectId } = require("mongodb");

const typeDefs = `#graphql
  scalar Date

  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID 
    comments: [Comments]
    likes: [Likes]
    createdAt: Date
    updatedAt: Date
    author: Author
  }
  type Author {
    _id: ID
    username: String
    name: String
    email: String
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
    createPost(content: String!, tags: [String], imgUrl: String): Post
    commentPost(_id: ID, content: String!): Post
    likePost(_id: ID): Post
  }
`;

const resolvers = {
  Query: {
    posts: async (_, __, contextValue) => {
      try {
        contextValue.auth();

        const redisPost = await redis.get("posts");
        if(redisPost) {
          return JSON.parse(redisPost)
        } else {
          const posts = await Post.findAll();
          await redis.set("posts", JSON.stringify(posts));
          
          return posts;
        }
      } catch (error) {
        throw error;
      }
    },
    post: async (_, args, contextValue) => {
      try {
        contextValue.auth();
        if (!args._id) throw new Error("Id is required");

        const post = await Post.findById(args._id);

        return post[0];
      } catch (error) {
        throw error;
      }

    },
  },
  Mutation: {
    createPost: async (_, { content, tags, imgUrl }, contextValue) => {
      try {
        const currentUser = contextValue.auth();
        const authorId = new ObjectId(String(currentUser.id));

        if (!content) throw new Error("Content is required");
        if (!authorId) throw new Error("Author ID is required");

        const newPost = {
          content,
          tags,
          imgUrl,
          authorId,
          comments: [],
          likes: [],
          
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const result = await Post.createOne(newPost);
        newPost._id = result.insertedId;

        await redis.del("posts");

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
        await Post.updateOne(
          _id,
          { comments: newComment } 
        );
    
        return newComment;
      } catch (error) {
        throw error;
      }
    },
    likePost: async (_, {_id}, contextValue) => {
      try {
        const currentLike = contextValue.auth();
 
        if (!_id) throw new Error("Id not found");
        if (!currentLike.username) throw new Error("Username is required");
        
        const newLike = {
          username: currentLike.username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await Post.updateOne(
          _id,
          { likes: newLike },
          currentLike.username
        );
        return newLike;
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