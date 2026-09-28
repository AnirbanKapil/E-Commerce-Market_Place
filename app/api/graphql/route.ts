import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from 'next/server';
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next"
import { schema } from '@/graphql'




const server = new ApolloServer({
  schema,
  formatError: (formattedError, error: any) => {
  
    if (error.originalError?.code === 'P2002') {
      return {
        ...formattedError,
        message: 'This account username or email is already taken. Please try another one.',
      }
    }

    
    if (error.originalError?.code === 'P2025') {
      return {
        ...formattedError,
        message: 'The requested item could not be found in our store inventory.',
      }
    }

    
    if (formattedError.extensions?.code === 'INTERNAL_SERVER_ERROR') {
      return {
        ...formattedError,
        message: 'Something went wrong on our server. Our team has been notified.',
      }
    }
    return formattedError
  },
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
  
    const session = await getServerSession(authOptions)
    return { req, session }
  },
});

export { handler as GET, handler as POST };