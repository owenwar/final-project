import axios from 'axios';

const GRAPHQL_ENDPOINT = 'http://localhost:3001/graphql'; 
export const ADD_USER = async (username, email, password) => {
    const query = `
        mutation {
            addUser(username: "${username}", email: "${email}", password: "${password}") {
                token
                user {
                    _id
                    username
                    email
                    password
                }
            }
        }
    `;

    try {
        const response = await axios.post(GRAPHQL_ENDPOINT, { query });
        return response.data.data.addUser;
    } catch (error) {
        console.error("Error adding user:", error);
    }
};

export const LOGIN_USER = async (email, password) => {
    const query = `
        mutation {
            login(email: "${email}", password: "${password}") {
                token
                user {
                    _id
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

export const ADD_PRODUCT = async (image, type, name, description, price) => {
    // First, handle the image upload
    let imageUrl = '';
    if (image) {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:3001/api/admin/upload', formData); // Assuming you have an /upload endpoint set up
            imageUrl = response.data.Location; // Adjust this based on your server's response structure
        } catch (error) {
            console.error("Error uploading image:", error);
            return;
        }
    }

    // Then, send the GraphQL mutation
    const query = `
        mutation {
            addProduct(type: "${type}", name: "${name}", description: "${description}", price: ${price}, imageUrl: "${imageUrl}") {
                id
                name
            }
        }
    `;

    try {
        const response = await axios.post(GRAPHQL_ENDPOINT, { query });
        return response.data.data.addProduct;
    } catch (error) {
        console.error("Error adding product:", error);
    }
};
