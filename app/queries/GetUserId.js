import { gql } from "@apollo/client";

const GET_USER_BY_ID = gql`
  query Query($id: ID) {
  user(_id: $id) {
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

export default GET_USER_BY_ID;
