
import { gql } from 'graphql-tag'

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($name: String!, $description: String!, $category: String!, $price: Float!, $stock: Int!, $imageUrl: String, $storeId: String, $isActive: Boolean) {
    createProduct(name: $name, description: $description, category: $category, price: $price, stock: $stock, imageUrl: $imageUrl, storeId: $storeId, isActive: $isActive) {
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
