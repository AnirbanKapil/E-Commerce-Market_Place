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
        {
          add: {
          content: `
          class TypedDocumentString<TResult, TVariables> extends String {
            private __apiType?: TResult;
            private __variables?: TVariables;
            constructor(private value: string) {
            super(value);
            }
            toString(): string {
            return this.value;
          }
        }
        `  
        }
        }
      ],
      config: {
           fetcher: './fetcher#useCustomFetcher',
       reactQueryVersion: 5, 
       exposeQueryKeys: true,
       legacyMode: false,
}
    }
  }
};

export default config;