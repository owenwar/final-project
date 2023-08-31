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

export const GET_PRODUCTS_BY_GENDER = async (gender) => {
  const query = `
      query getProductsByGender($gender: String!) {
          productsByGender(gender: $gender) {
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
      const response = await axios.post(GRAPHQL_ENDPOINT, {
          query,
          variables: {
              gender,
          },
      });
      return response.data.data.productsByGender;
  } catch (error) {
      console.error("Error getting products by gender:", error);
  }
};

export const GET_ALL_PRODUCTS = async (gender) => {
  const query = `
      query getAllProducts {
            products {
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
    const response = await axios.post(GRAPHQL_ENDPOINT, {
        query,
        variables: {
            
        },
    });
    return response.data.data.products;
} catch (error) {
    console.error("Error getting products:", error);
}
};

export const GET_PRODUCT_BY_ID = async (productId) => {
  const query = `
    query getProductById($productId: ID!) {
      product(id: $productId) {
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
    const response = await axios.post(GRAPHQL_ENDPOINT, {
      query,
      variables: {
        productId,
      },
    });
    return response.data.data.product;
  } catch (error) {
    console.error("Error getting product by ID:", error);
  }
};

export const ADD_TO_CART = async (productId, quantity) => {
  const query = `
    mutation AddToCart($productId: ID!, $quantity: Int!) {
      addToCart(productId: $productId, quantity: $quantity) {
        product {
          id
        }
      }
    }
  `;
  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, {
      query,
      variables: {
        productId,
        quantity,
      },
    });
    return response.data.data.addToCart;
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};
