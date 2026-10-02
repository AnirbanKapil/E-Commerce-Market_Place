
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

  type Query {
    products(input: ProductsFilterInput): [Product!]!
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
    
  product: async (_parent: any, { id }: { id: string }, context: Context) => {
      const product = await context.prisma.product.findUnique({
        where: { id },
      });
      
      if (!product) {
        throw new Error(`Product with ID ${id} could not be located.`);
      }
      
      return product;
    },
  }, 
  
  Mutation: {
     createProduct: async (_parent: any, args: any, context: Context) => {
      // Simple fallback check ensuring the Admin verification guards executed properly
      if (!context.user || context.user.role !== 'ADMIN') {
        throw new Error('Unauthorised: Access requires administrative clearance levels.');
      }

      return await context.prisma.product.create({
        data: {
          name: args.name,
          description: args.description,
          price: args.price,
          imageUrl: args.imageUrl,
          stock: args.stock,
        },
      });
    }
  }
}
