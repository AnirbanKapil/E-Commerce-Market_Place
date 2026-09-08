import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:3000/api/graphql', 
  documents: ['app/**/*.tsx', 'components/**/*.tsx', 'graphql/**/*.ts'],

  ignoreNoDocuments: true, 
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
        fetcher: {
          func: '@/graphql/fetcher#useCustomFetcher',
          isHook: true,
        },
      },
    },
  },
}

export default config
