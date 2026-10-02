
import { gql } from 'graphql-tag'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { userTypeDefs, userResolvers } from './user'
import { productTypeDefs, productResolvers } from './product'
import { orderTypeDefs, orderResolvers } from './order'
import { authDirectiveTransformer } from './authDirective';


const baseTypeDefs = gql`
  directive @auth(role: Role!) on FIELD_DEFINITION
  
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }

  enum Role {
    USER
    ADMIN
  }
`

const typeDefs = mergeTypeDefs([baseTypeDefs, userTypeDefs, productTypeDefs, orderTypeDefs])
const resolvers = mergeResolvers([userResolvers, productResolvers, orderResolvers])


let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

schema = authDirectiveTransformer(schema, 'auth');

export { schema }
