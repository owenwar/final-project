import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query getUserById($userId: ID!) {
    getUserById(userId: $userId) {
      _id
      username
      email
    }
  }
`;


