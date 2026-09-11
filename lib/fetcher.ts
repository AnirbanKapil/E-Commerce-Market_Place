
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('/api/graphql', {
  headers: {
    'apollo-require-preflight': 'true', 
  },
})


export const useCustomFetcher = <TData, TVariables>(query: string, variables?: TVariables) => {
  return async (): Promise<TData> => {
    return client.request<TData, TVariables>(query, variables)
  }
}
