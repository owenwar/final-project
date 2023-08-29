import { gql } from '@apollo/client';
import axios from 'axios';

export const GET_USER_BY_ID = gql`
  query getUserById($userId: ID!) {
    getUserById(userId: $userId) {
      _id
      username
      email
    }
  }
`;

const GRAPHQL_ENDPOINT = 'http://localhost:3001/graphql';

export const GET_PRODUCTS_BY_GENDER = async (gender) => {
  const query = `
      query {
          getProductsByGender(gender: "${gender}") {
              id
              name
              description
              price
              imageUrl
              category
              gender
          }
      }
  `;

  try {
      const response = await axios.post(GRAPHQL_ENDPOINT, { query });
      return response.data.data.getProductsByGender;
  } catch (error) {
      console.error("Error getting products by gender:", error);
  }
};