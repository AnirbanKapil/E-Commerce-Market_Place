
import { gql } from 'graphql-tag'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'


export const userTypeDefs = gql`
  type User {
    id: String!
    email: String!
    name: String
    username: String
  }

  enum SignupRole {
    USER
    SELLER
  }

  extend type Query {
    me: User
    users: [User!]!
  }

  extend type Mutation {
    register(email: String!, username: String!, name: String!, password: String!, role: SignupRole = USER, storeName: String): User!
  }
`


export const userResolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    me: async (_: any, __: any, context: any) => {
      if (!context.session?.user) throw new Error("Not authenticated")
      return await prisma.user.findUnique({ where: { email: context.session.user.email } })
    }
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
    }
  }
}
