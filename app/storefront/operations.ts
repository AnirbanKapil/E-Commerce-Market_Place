

import { gql } from 'graphql-tag';

export const GET_STOREFRONT_PRODUCTS = gql`
  query GetStorefrontProducts($input: ProductsFilterInput) {
    products(input: $input) {
      id
      name
      description
      price
      imageUrl
      stock
    }
  }
`;

