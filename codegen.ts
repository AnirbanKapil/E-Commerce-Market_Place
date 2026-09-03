import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  // Point this to your running local Apollo route or schema file path
  schema: 'http://localhost:3000/api/graphql', 
  documents: ['app/**/*.tsx', 'components/**/*.tsx', 'graphql/**/*.ts'],
  generates: {
    './graphql/generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
    './graphql/generated/hooks.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        // Here we explicitly define that custom fetcher layout you have!
        fetcher: {
          func: '@/graphql/fetcher#useCustomFetcher',
          isHook: true,
        },
      },
    },
  },
}

export default config
