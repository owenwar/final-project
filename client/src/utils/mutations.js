import axios from "axios";
const GRAPHQL_ENDPOINT = "http://localhost:3001/graphql";

export const REGISTER_USER = async (username, email, password) => {
  const query = `
        mutation {
            register(username: "${username}", email: "${email}", password: "${password}") {
                token
                user {
                    id
                    username
                }
            }
        }
    `;

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, { query });
    return response.data.data.register;
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

export const LOGIN_USER = async (email, password) => {
  const query = `
        mutation {
            login(email: "${email}", password: "${password}") {
                token
                user {
                    id
                    username
                }
            }
        }
    `;

  try {
    const response = await axios.post(GRAPHQL_ENDPOINT, { query });
    return response.data.data.login;
  } catch (error) {
    console.error("Error logging in:", error);
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
