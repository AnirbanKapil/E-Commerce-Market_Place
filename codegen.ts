import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./graphql/**/*.ts",
  documents: [
    "app/**/*.{ts,tsx,graphql}",
    "!node_modules",
    "!lib/generated.ts",
    "!**/*.test.*",
    "!**/__tests__/**"
  ],
  generates: {
    "lib/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        fetcher: './fetcher#useCustomFetcher',
        reactQueryVersion: 5, 
        exposeQueryKeys: true,
        legacyMode: false,
        errorsType: 'Error', // Optional: This keeps your hooks error messages type-safe!
      }
    }
  }
};

export default config;
