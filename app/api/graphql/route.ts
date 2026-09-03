import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import prisma from "@/lib/prisma";
import { NextRequest } from 'next/server';


const typeDefs = `#graphql
  type User {
    id: Int!
    email: String!
    name: String
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  type Mutation {
    createUser(email: String!, name: String): User!
  }
`

const resolvers = {
    Query: {
    users: async () => {
      return await prisma.user.findMany()
    },
    user: async (_: any, { id }: { id: number }) => {
      return await prisma.user.findUnique({ where: { id } })
    },
  },
    Mutation: {
    createUser: async (_: any, { email, name, password }: { email: string, name?: string, password: string }) => {
      return await prisma.user.create({
        data: { email, name, password},
      })
    },
  },
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
});


const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context : async(req) => ({req})
});



export { handler as GET, handler as POST };