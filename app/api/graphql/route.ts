import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from 'next/server';
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next"
import { schema } from '@/graphql'



const server = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
  
    const session = await getServerSession(authOptions)
    return { req, session }
  },
});

export { handler as GET, handler as POST };