import axios from "axios";
const GRAPHQL_ENDPOINT = "http://localhost:3001/graphql";

export const GET_USER_BY_ID = async (userId) => {
  const query = `
    query {
      getUserById(userId: "${userId}") {
        _id
        username
        email
      }
    }
  `;
  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, { query });
    return response.data.data.getUserById;
  } catch (error) {
    console.error("Error getting user by id:", error);
  }
}

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