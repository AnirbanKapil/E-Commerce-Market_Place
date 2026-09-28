
import { gql } from 'graphql-tag'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { userTypeDefs, userResolvers } from './user'
import { productTypeDefs, productResolvers } from './product'
import { orderTypeDefs, orderResolvers } from './order'


const baseTypeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`

const typeDefs = mergeTypeDefs([baseTypeDefs, userTypeDefs, productTypeDefs, orderTypeDefs])
const resolvers = mergeResolvers([userResolvers, productResolvers, orderResolvers])


export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
