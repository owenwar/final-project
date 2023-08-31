import axios from "axios";
const GRAPHQL_ENDPOINT = "http://localhost:3001/graphql";

export const REGISTER_USER = async (username, email, password) => {
  const query = `
        mutation RegisterUser($username: String!, $email: String!, $password: String!) {
            register(username: $username, email: $email, password: $password) {
                token
                user {
                    id
                    username
                    email
                    password
                }
            }
        }
    `;

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, {
      query,
      variables: { username, email, password }
    });
    return response.data.data.register;
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

export const LOGIN_USER = async (email, password) => {
  const query = `
        mutation LoginUser($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                token
                user {
                    id
                    username
                }
            }
        }
    `;

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, {
      query,
      variables: { email, password }
    });
    return response.data.data.login.token;
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};

export const ADD_PRODUCT = async (image, category, name, description, price, gender, onSale, colorTag) => {
  // First, handle the image upload
  let imageUrl = "";
  if (image) {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/admin/upload",
        formData
      );
      imageUrl = response.data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Image upload failed");
    }
  }

  // Then, send the GraphQL mutation
  const query = `
        mutation {
            addProduct( 
                name: "${name}",
                description: "${description}",
                price: ${price},
                onSale: ${onSale}, 
                imageUrl: "${imageUrl}", 
                category: "${category}",
                colorTag: "${colorTag}",
                createdAt: "${new Date().toISOString()}",
                gender: "${gender}"
            ) {
                id
                name
            }
        }
    `;

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, { query });
    if (!response.data.data || !response.data.data.addProduct) {
      throw new Error("GraphQL mutation failed");
    }
    return response.data.data.addProduct;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Product addition failed");
  }
};

export const GET_ORDERS_BY_USER = async (userId) => {
  const query = `
    query OrdersByUser($userId: ID!) {
      ordersByUser(userId: $userId) {
        id
        products {
          id
          title
          price
        }
        totalAmount
      }
    }
  `;

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, {
      query,
      variables: { userId }
    });
    return response.data.data.ordersByUser;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};


export const CREATE_CHECKOUT_SESSION = async (productIds) => {
  const query = `
    mutation CreateCheckoutSession($productIds: [ID!]!) {
      createCheckoutSession(productIds: $productIds) {
        sessionId
      }
    }
  `;

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, {
      query,
      variables: { productIds }
    });
    return response.data.data.createCheckoutSession.sessionId;
  } catch (error) {
    console.error("Error creating checkout session:", error);
  }
};