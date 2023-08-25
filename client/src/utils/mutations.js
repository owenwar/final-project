import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;


export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }

`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($image: Upload!, $type: String!, $name: String!, $description: String!, $price: Float!) {
    addProduct(image: $image, type: $type, name: $name, description: $description, price: $price) {
      id
      name
    }
  }
`;