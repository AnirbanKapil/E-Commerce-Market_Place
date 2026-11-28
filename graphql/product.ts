import { gql } from 'graphql-tag'
import prisma from '@/lib/prisma'

export const productTypeDefs = gql`
  input ProductsFilterInput {
    search: String
    category: String
    storeId: String
    isActive: Boolean
  }

  type Product {
    id: String!
    name: String!
    description: String!
    category: String!
    price: Float!
    imageUrl: String
    stock: Int!
    createdAt: String!
    isActive: Boolean!
    storeId: String
    store: Store
  }

  extend type Query {
    products(input: ProductsFilterInput): [Product!]!
    product(id: String!): Product
  }

  extend type Mutation {
    createProduct(
      name: String!
      description: String!
      category: String!
      price: Float!
      imageUrl: String
      stock: Int!
      storeId: String
      isActive: Boolean = true
    ): Product!
    updateProduct(
      id: String!
      name: String
      description: String
      category: String
      price: Float
      imageUrl: String
      stock: Int
      isActive: Boolean
    ): Product!
  }
`

interface Context {
  prisma: typeof prisma
  user?: { id: string; role: 'USER' | 'ADMIN' | 'SELLER' }
}

interface ProductsArgs {
  input?: {
    search?: string
    category?: string
    storeId?: string
    isActive?: boolean
  }
}

const requireSellerOrAdmin = (context: Context) => {
  if (!context.user || !['SELLER', 'ADMIN'].includes(context.user.role)) {
    throw new Error('Not authorized to manage products')
  }
}

async function getSellerStore(context: Context) {
  if (!context.user) throw new Error('Not authenticated')
  return context.prisma.store.findUnique({ where: { userId: context.user.id } })
}

export const productResolvers = {
  Query: {
    products: async (_parent: unknown, args: ProductsArgs, context: Context) => {
      const input = args.input ?? {}
      const isAdmin = context.user?.role === 'ADMIN'
      if (input.isActive === false && !isAdmin && context.user?.role !== 'SELLER') {
        throw new Error('Only store owners and administrators can query inactive products')
      }

      const sellerStore = context.user?.role === 'SELLER'
        ? await getSellerStore(context)
        : null
      const where: any = {}
      const searchKeyword = input.search?.trim()

      if (!isAdmin) where.isActive = true
      if (input.isActive !== undefined) where.isActive = input.isActive
      if (input.category) where.category = input.category
      if (input.storeId) where.storeId = input.storeId
      if (sellerStore) where.storeId = sellerStore.id
      if (context.user?.role === 'SELLER' && !sellerStore) return []
      if (searchKeyword) {
        where.OR = [
          { name: { contains: searchKeyword, mode: 'insensitive' } },
          { description: { contains: searchKeyword, mode: 'insensitive' } },
        ]
      }

      return context.prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      })
    },

    product: async (_parent: unknown, { id }: { id: string }, context: Context) => {
      const product = await context.prisma.product.findUnique({ where: { id } })
      if (!product || (!product.isActive && context.user?.role !== 'ADMIN')) return null
      return product
    },
  },

  Mutation: {
    createProduct: async (_parent: unknown, args: any, context: Context) => {
      requireSellerOrAdmin(context)
      const category = args.category.trim()
      if (!category) throw new Error('Product category cannot be empty')

      let storeId: string | null = null
      if (context.user!.role === 'SELLER') {
        const store = await getSellerStore(context)
        if (!store) throw new Error('Create a store before adding products')
        storeId = store.id
      } else if (args.storeId) {
        const store = await context.prisma.store.findUnique({ where: { id: args.storeId } })
        if (!store) throw new Error('Store not found')
        storeId = store.id
      }

      return context.prisma.product.create({
        data: {
          name: args.name,
          description: args.description,
          category,
          price: args.price,
          imageUrl: args.imageUrl,
          stock: args.stock,
          isActive: args.isActive ?? true,
          storeId,
        },
      })
    },

    updateProduct: async (_parent: unknown, { id, ...input }: any, context: Context) => {
      requireSellerOrAdmin(context)
      const product = await context.prisma.product.findUnique({ where: { id } })
      if (!product) throw new Error('Product not found')

      if (context.user!.role === 'SELLER') {
        const store = await getSellerStore(context)
        if (!store || product.storeId !== store.id) {
          throw new Error('You can only update products in your own store')
        }
      }

      const data: Record<string, unknown> = {}
      for (const field of ['name', 'description', 'category', 'price', 'stock', 'isActive'] as const) {
        if (input[field] !== undefined && input[field] !== null) {
          const value = field === 'category' ? input[field].trim() : input[field]
          if (field === 'category' && !value) throw new Error('Product category cannot be empty')
          data[field] = value
        }
      }
      if (Object.prototype.hasOwnProperty.call(input, 'imageUrl')) data.imageUrl = input.imageUrl

      return context.prisma.product.update({ where: { id }, data })
    },
  },

  Product: {
    store: (product: { storeId: string | null }, _args: unknown, context: Context) =>
      product.storeId ? context.prisma.store.findUnique({ where: { id: product.storeId } }) : null,
  },
}
