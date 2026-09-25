
import { gql } from 'graphql-tag'
import prisma from '@/lib/prisma'

export const productTypeDefs = gql`
  type Product {
    id: String!
    name: String!
    description: String!
    price: Float!
    imageUrl: String
    stock: Int!
    createdAt: String!
  }

  extend type Query {
    products: [Product!]!
    product(id: String!): Product
  }

  extend type Mutation {
    createProduct(name: String!, description: String!, price: Float!, stock: Int!, imageUrl: String): Product!
  }
`

export const productResolvers = {
  Query: {
    
    products: async () => {
      return await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
      })
    },
    product: async (_: any, { id }: { id: string }) => {
      return await prisma.product.findUnique({ where: { id } })
    }
  },
  Mutation: {
    createProduct: async (_: any, { name, description, price, stock, imageUrl }: any, context: any) => {
      if (!context.session?.user) {
        throw new Error("Unauthorized: You must log in to add store products.")
      }
      
      return await prisma.product.create({
        data: { name, description, price, stock, imageUrl }
      })
    }
  }
}
