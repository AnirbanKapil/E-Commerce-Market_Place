import { gql } from "graphql-tag";


export const GET_ME = gql(`
  query GetMe {
    me {
      id
      email
      name
      username
      role
      store { id name }
    }
  }
`)

export const REGISTER_USER = gql(`
  mutation RegisterUser($email: String!, $username: String!, $name: String!, $password: String!, $role: SignupRole!, $storeName: String) {
    register(email: $email, username: $username, name: $name, password: $password, role: $role, storeName: $storeName) {
      id
      email
      role
      store { id name }
    }
  }
`)

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      category
      price
      description
      stock
      isActive
      storeId
    }
  }
`

export const GET_MY_STORE = gql`
  query GetMyStore {
    myStore {
      id
      name
      createdAt
      updatedAt
      products {
        id
        name
        category
        price
        stock
        isActive
      }
    }
  }
`

export const GET_STORES = gql`
  query GetStores {
    stores {
      id
      name
      createdAt
      owner { id name }
      products {
        id
        name
        category
        price
        imageUrl
        isActive
      }
    }
  }
`

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: String!, $name: String, $description: String, $category: String, $price: Float, $imageUrl: String, $stock: Int, $isActive: Boolean) {
    updateProduct(id: $id, name: $name, description: $description, category: $category, price: $price, imageUrl: $imageUrl, stock: $stock, isActive: $isActive) {
      id
      name
      category
      price
      stock
      isActive
      storeId
    }
  }
`

export const UPDATE_STORE_MUTATION = gql`
  mutation UpdateStore($name: String!) {
    updateStore(name: $name) {
      id
      name
      updatedAt
    }
  }
`

