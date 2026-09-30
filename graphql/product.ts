
import { gql } from 'graphql-tag'
import prisma from '@/lib/prisma'

export const productTypeDefs = gql`
input ProductsFilterInput {
    search: String
  }

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
    products: (input: ProductsFilterInput): [Product!]!
    product(id: String!): Product
  }

  type Mutation {
    createProduct(
      name: String!
      description: String!
      price: Float!
      imageUrl: String
      stock: Int!
    ): Product! @auth(role: ADMIN)
  }
`

interface Context {
  prisma: typeof prisma;
  user?: {
    id: string;
    role: 'USER' | 'ADMIN';
  };
}

interface ProductsArgs {
  input?: {
    search?: string;
  };
}


export const productResolvers = {
  Query: {
    
     products: async (_parent: any, args: ProductsArgs, context: Context) => {
      const searchKeyword = args.input?.search?.trim();

      // If no query parameter exists, instantly fetch all records efficiently
      if (!searchKeyword) {
        return await context.prisma.product.findMany({
          orderBy: { createdAt: 'desc' },
        });
      }

      // Execute conditional OR conditions mapped exactly to your schema database columns
      return await context.prisma.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: searchKeyword,
                mode: 'insensitive', // Prevents capitalisation mismatches
              },
            },
            {
              description: {
                contains: searchKeyword,
                mode: 'insensitive',
              },
            },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
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
      if (context.session.user.role !== 'ADMIN') {
        throw new Error("Access Denied: Only store administrators can add new inventory items.")
      }
      return await prisma.product.create({
        data: { name, description, price, stock, imageUrl }
      })
    }
  }
}
