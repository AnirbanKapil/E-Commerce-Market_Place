import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import prisma from "@/lib/prisma";
import { NextRequest } from 'next/server';
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next"

const typeDefs = `#graphql
  type User {
    id: String!
    email: String!
    name: String
    username: String
  }

  type Query {
    me: User
    users: [User!]!
  }

  type Mutation {
    register(email: String!, username: String!, name: String!, password: String!): User!
  }
`

const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    me: async (_: any, __: any, context: any) => {
    
      if (!context.session?.user) {
        throw new Error("Not authenticated")
      }
      return await prisma.user.findUnique({
        where: { email: context.session.user.email }
      })
    }
  },
  Mutation: {
    register: async (_: any, { email, username, name, password }: any) => {
      const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] }
      })

      if (existingUser) {
        throw new Error("User with this email or username already exists")
      }

      
      const hashedPassword = await bcrypt.hash(password, 10)

      return await prisma.user.create({
        data: {
          email,
          username,
          name,
          password: hashedPassword,
        }
      })
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
  
    const session = await getServerSession(authOptions)
    return { req, session }
  },
})

export { handler as GET, handler as POST }