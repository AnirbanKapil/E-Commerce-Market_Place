
import { gql } from 'graphql-tag'

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($name: String!, $description: String!, $price: Float!, $stock: Int!, $imageUrl: String) {
    createProduct(name: $name, description: $description, price: $price, stock: $stock, imageUrl: $imageUrl) {
      id
      name
      price
      stock
    }
  }
`
