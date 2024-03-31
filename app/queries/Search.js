import { gql } from "@apollo/client";

const SearchUser = gql`
  query SearchUsers($username: String!) {
    searchUsers(username: $username) {
      _id
      name
      username
      email
      password
      followerDetail {
        _id
        name
        username
        email
      }
      followingDetail {
        _id
        name
        username
        email
      }
    }
  }
`;

export default SearchUser;
