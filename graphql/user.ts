
import { gql } from 'graphql-tag'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'


export const userTypeDefs = gql`
  type User {
    id: String!
    email: String
    name: String
    username: String
    role: Role!
    store: Store
  }

  type Store {
    id: String!
    name: String!
    createdAt: String!
    updatedAt: String!
    owner: User!
    products: [Product!]!
  }

  enum SignupRole {
    USER
    SELLER
  }

  extend type Query {
    me: User
    users: [User!]!
    myStore: Store
    store(id: String!): Store
    stores: [Store!]!
  }

  extend type Mutation {
    register(email: String!, username: String!, name: String!, password: String!, role: SignupRole = USER, storeName: String): User!
    updateStore(name: String!): Store!
  }
`


export const userResolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    me: async (_: any, __: any, context: any) => {
      if (!context.session?.user) throw new Error("Not authenticated")
      return await prisma.user.findUnique({ where: { email: context.session.user.email } })
    },
    myStore: async (_: any, __: any, context: any) => {
      if (!context.user?.id) throw new Error('Not authenticated')
      return prisma.store.findUnique({ where: { userId: context.user.id } })
    },
    store: async (_: any, { id }: { id: string }) => prisma.store.findUnique({ where: { id } }),
    stores: async () => prisma.store.findMany({ orderBy: { createdAt: 'desc' } }),
  },
  Mutation: {
    register: async (_: any, { email, username, name, password, role = 'USER', storeName }: any) => {
      if (role === 'SELLER' && !storeName?.trim()) {
        throw new Error('Store name is required for seller accounts')
      }
      const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] }
      })
      if (existingUser) throw new Error("User already exists")

      const hashedPassword = await bcrypt.hash(password, 12)
      return await prisma.user.create({
        data: {
          email,
          username,
          name,
          password: hashedPassword,
          role,
          ...(role === 'SELLER' ? { store: { create: { name: storeName.trim() } } } : {}),
        },
      })
    },
    updateStore: async (_: any, { name }: { name: string }, context: any) => {
      if (!context.user?.id || context.user.role !== 'SELLER') {
        throw new Error('Only sellers can update their store')
      }
      const cleanName = name.trim()
      if (!cleanName) throw new Error('Store name cannot be empty')
      return prisma.store.update({
        where: { userId: context.user.id },
        data: { name: cleanName },
      })
    }
  },
  User: {
    store: (user: { id: string }) => prisma.store.findUnique({ where: { userId: user.id } }),
  },
  Store: {
    owner: (store: { userId: string }) => prisma.user.findUnique({ where: { id: store.userId } }),
    products: async (store: { id: string }, _args: unknown, context: any) => {
      const isOwner = context.user?.id && context.user.id === (await prisma.store.findUnique({
        where: { id: store.id }, select: { userId: true },
      }))?.userId
      return prisma.product.findMany({
        where: {
          storeId: store.id,
          ...(!isOwner && context.user?.role !== 'ADMIN' ? { isActive: true } : {}),
        },
        orderBy: { createdAt: 'desc' },
      })
    },
  }
}
