import { gql } from "graphql-tag";


export const GET_ME = gql(`
  query GetMe {
    me {
      id
      email
      name
      username
    }
  }
`)

export const REGISTER_USER = gql(`
  mutation RegisterUser($email: String!, $username: String!, $name: String!, $password: String!) {
    register(email: $email, username: $username, name: $name, password: $password) {
      id
      email
    }
  }
`)

