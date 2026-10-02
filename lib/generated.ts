import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
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

export type CartItem = {
  __typename?: 'CartItem';
  id: Scalars['String']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  addToCart: CartItem;
  checkout: Order;
  createProduct: Product;
  register: User;
};


export type MutationAddToCartArgs = {
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCreateProductArgs = {
  description: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  stock: Scalars['Int']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  items: Array<OrderItem>;
  status: OrderStatus;
  totalAmount: Scalars['Float']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Shipped = 'SHIPPED'
}

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  stock: Scalars['Int']['output'];
};

export type ProductsFilterInput = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  cart: Array<CartItem>;
  me?: Maybe<User>;
  myOrders: Array<Order>;
  product?: Maybe<Product>;
  products: Array<Product>;
  users: Array<User>;
};


export type QueryProductArgs = {
  id: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  input?: InputMaybe<ProductsFilterInput>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type CreateProductMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  stock: Scalars['Int']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, name: string, price: number, stock: number } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, name?: string | null, username?: string | null } | null };

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, email: string } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, price: number, description: string, stock: number }> };

export type GetStorefrontProductsQueryVariables = Exact<{
  input?: InputMaybe<ProductsFilterInput>;
}>;


export type GetStorefrontProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, description: string, price: number, imageUrl?: string | null, stock: number }> };


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

export const CreateProductDocument = new TypedDocumentString(`
    mutation CreateProduct($name: String!, $description: String!, $price: Float!, $stock: Int!, $imageUrl: String) {
  createProduct(
    name: $name
    description: $description
    price: $price
    stock: $stock
    imageUrl: $imageUrl
  ) {
    id
    name
    price
    stock
  }
}
    `);

export const useCreateProductMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateProductMutation, TError, CreateProductMutationVariables, TContext>) => {
    
    return useMutation<CreateProductMutation, TError, CreateProductMutationVariables, TContext>(
      {
    mutationKey: ['CreateProduct'],
    mutationFn: (variables?: CreateProductMutationVariables) => useCustomFetcher<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, variables)(),
    ...options
  }
    )};

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

export const GetProductsDocument = new TypedDocumentString(`
    query GetProducts {
  products {
    id
    name
    price
    description
    stock
  }
}
    `);

export const useGetProductsQuery = <
      TData = GetProductsQuery,
      TError = unknown
    >(
      variables?: GetProductsQueryVariables,
      options?: Omit<UseQueryOptions<GetProductsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetProductsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetProductsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetProducts'] : ['GetProducts', variables],
    queryFn: useCustomFetcher<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, variables),
    ...options
  }
    )};

export const GetStorefrontProductsDocument = new TypedDocumentString(`
    query GetStorefrontProducts($input: ProductsFilterInput) {
  products(input: $input) {
    id
    name
    description
    price
    imageUrl
    stock
  }
}
    `);

export const useGetStorefrontProductsQuery = <
      TData = GetStorefrontProductsQuery,
      TError = unknown
    >(
      variables?: GetStorefrontProductsQueryVariables,
      options?: Omit<UseQueryOptions<GetStorefrontProductsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetStorefrontProductsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetStorefrontProductsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetStorefrontProducts'] : ['GetStorefrontProducts', variables],
    queryFn: useCustomFetcher<GetStorefrontProductsQuery, GetStorefrontProductsQueryVariables>(GetStorefrontProductsDocument, variables),
    ...options
  }
    )};
