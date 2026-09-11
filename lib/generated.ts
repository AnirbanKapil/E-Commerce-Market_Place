import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { useCustomFetcher } from './fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  register: User;
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  me?: Maybe<User>;
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, name?: string | null, username?: string | null } | null };

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, email: string } };


export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const GetMeDocument = new TypedDocumentString(`
    query GetMe {
  me {
    id
    email
    name
    username
  }
}
    `);

export const useGetMeQuery = <
      TData = GetMeQuery,
      TError = unknown
    >(
      variables?: GetMeQueryVariables,
      options?: Omit<UseQueryOptions<GetMeQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetMeQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetMeQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetMe'] : ['GetMe', variables],
    queryFn: useCustomFetcher<GetMeQuery, GetMeQueryVariables>(GetMeDocument, variables),
    ...options
  }
    )};

useGetMeQuery.getKey = (variables?: GetMeQueryVariables) => variables === undefined ? ['GetMe'] : ['GetMe', variables];

export const RegisterUserDocument = new TypedDocumentString(`
    mutation RegisterUser($email: String!, $username: String!, $name: String!, $password: String!) {
  register(email: $email, username: $username, name: $name, password: $password) {
    id
    email
  }
}
    `);

export const useRegisterUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RegisterUserMutation, TError, RegisterUserMutationVariables, TContext>) => {
    
    return useMutation<RegisterUserMutation, TError, RegisterUserMutationVariables, TContext>(
      {
    mutationKey: ['RegisterUser'],
    mutationFn: (variables?: RegisterUserMutationVariables) => useCustomFetcher<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, variables)(),
    ...options
  }
    )};
