import { gql } from "@apollo/client";

const GET_ALL_POST = gql`
  query GetAllPost {
    posts {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        _id
        username
        name
        email
      }
    }
  }
`;

export default GET_ALL_POST;
