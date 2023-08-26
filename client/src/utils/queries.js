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

export const GET_PRODUCTS_BY_GENDER = gql`
  query getProductsByGender($gender: String!) {
    productsByGender(gender: $gender) {
      name
      description
      price
      onSale
      imageUrl
      category
      colorTag
      createdAt
      updatedAt
    }
  }
  `;