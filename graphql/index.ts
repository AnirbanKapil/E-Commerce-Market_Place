
import { gql } from 'graphql-tag'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { userTypeDefs, userResolvers } from './user'



const baseTypeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`

const typeDefs = mergeTypeDefs([baseTypeDefs, userTypeDefs])
const resolvers = mergeResolvers([userResolvers])


export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
