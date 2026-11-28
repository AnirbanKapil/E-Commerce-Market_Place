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
  updateProduct: Product;
  updateStore: Store;
};


export type MutationAddToCartArgs = {
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCreateProductArgs = {
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  stock: Scalars['Int']['input'];
  storeId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<SignupRole>;
  storeName?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};


export type MutationUpdateProductArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateStoreArgs = {
  name: Scalars['String']['input'];
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
  category: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  stock: Scalars['Int']['output'];
  store?: Maybe<Store>;
  storeId?: Maybe<Scalars['String']['output']>;
};

export type ProductsFilterInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  cart: Array<CartItem>;
  me?: Maybe<User>;
  myOrders: Array<Order>;
  myStore?: Maybe<Store>;
  product?: Maybe<Product>;
  products: Array<Product>;
  store?: Maybe<Store>;
  stores: Array<Store>;
  users: Array<User>;
};


export type QueryProductArgs = {
  id: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  input?: InputMaybe<ProductsFilterInput>;
};


export type QueryStoreArgs = {
  id: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  Seller = 'SELLER',
  User = 'USER'
}

export enum SignupRole {
  Seller = 'SELLER',
  User = 'USER'
}

export type Store = {
  __typename?: 'Store';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  owner: User;
  products: Array<Product>;
  updatedAt: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  role: Role;
  store?: Maybe<Store>;
  username?: Maybe<Scalars['String']['output']>;
};

export type CreateProductMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  category: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  stock: Scalars['Int']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  storeId?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, name: string, category: string, price: number, stock: number, isActive: boolean, storeId?: string | null } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email?: string | null, name?: string | null, username?: string | null, role: Role, store?: { __typename?: 'Store', id: string, name: string } | null } | null };

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: SignupRole;
  storeName?: InputMaybe<Scalars['String']['input']>;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, email?: string | null, role: Role, store?: { __typename?: 'Store', id: string, name: string } | null } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, category: string, price: number, description: string, stock: number, isActive: boolean, storeId?: string | null }> };

export type GetMyStoreQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyStoreQuery = { __typename?: 'Query', myStore?: { __typename?: 'Store', id: string, name: string, createdAt: string, updatedAt: string, products: Array<{ __typename?: 'Product', id: string, name: string, category: string, price: number, stock: number, isActive: boolean }> } | null };

export type GetStoresQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStoresQuery = { __typename?: 'Query', stores: Array<{ __typename?: 'Store', id: string, name: string, createdAt: string, owner: { __typename?: 'User', id: string, name?: string | null }, products: Array<{ __typename?: 'Product', id: string, name: string, category: string, price: number, imageUrl?: string | null, isActive: boolean }> }> };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: string, name: string, category: string, price: number, stock: number, isActive: boolean, storeId?: string | null } };

export type UpdateStoreMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type UpdateStoreMutation = { __typename?: 'Mutation', updateStore: { __typename?: 'Store', id: string, name: string, updatedAt: string } };

export type GetStorefrontProductsQueryVariables = Exact<{
  input?: InputMaybe<ProductsFilterInput>;
}>;


export type GetStorefrontProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, description: string, category: string, price: number, imageUrl?: string | null, stock: number, isActive: boolean, storeId?: string | null, store?: { __typename?: 'Store', id: string, name: string } | null }> };


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
    mutation CreateProduct($name: String!, $description: String!, $category: String!, $price: Float!, $stock: Int!, $imageUrl: String, $storeId: String, $isActive: Boolean) {
  createProduct(
    name: $name
    description: $description
    category: $category
    price: $price
    stock: $stock
    imageUrl: $imageUrl
    storeId: $storeId
    isActive: $isActive
  ) {
    id
    name
    category
    price
    stock
    isActive
    storeId
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
    role
    store {
      id
      name
    }
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
    mutation RegisterUser($email: String!, $username: String!, $name: String!, $password: String!, $role: SignupRole!, $storeName: String) {
  register(
    email: $email
    username: $username
    name: $name
    password: $password
    role: $role
    storeName: $storeName
  ) {
    id
    email
    role
    store {
      id
      name
    }
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
    category
    price
    description
    stock
    isActive
    storeId
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

export const GetMyStoreDocument = new TypedDocumentString(`
    query GetMyStore {
  myStore {
    id
    name
    createdAt
    updatedAt
    products {
      id
      name
      category
      price
      stock
      isActive
    }
  }
}
    `);

export const useGetMyStoreQuery = <
      TData = GetMyStoreQuery,
      TError = unknown
    >(
      variables?: GetMyStoreQueryVariables,
      options?: Omit<UseQueryOptions<GetMyStoreQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetMyStoreQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetMyStoreQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetMyStore'] : ['GetMyStore', variables],
    queryFn: useCustomFetcher<GetMyStoreQuery, GetMyStoreQueryVariables>(GetMyStoreDocument, variables),
    ...options
  }
    )};

export const GetStoresDocument = new TypedDocumentString(`
    query GetStores {
  stores {
    id
    name
    createdAt
    owner {
      id
      name
    }
    products {
      id
      name
      category
      price
      imageUrl
      isActive
    }
  }
}
    `);

export const useGetStoresQuery = <
      TData = GetStoresQuery,
      TError = unknown
    >(
      variables?: GetStoresQueryVariables,
      options?: Omit<UseQueryOptions<GetStoresQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetStoresQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetStoresQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetStores'] : ['GetStores', variables],
    queryFn: useCustomFetcher<GetStoresQuery, GetStoresQueryVariables>(GetStoresDocument, variables),
    ...options
  }
    )};

export const UpdateProductDocument = new TypedDocumentString(`
    mutation UpdateProduct($id: String!, $name: String, $description: String, $category: String, $price: Float, $imageUrl: String, $stock: Int, $isActive: Boolean) {
  updateProduct(
    id: $id
    name: $name
    description: $description
    category: $category
    price: $price
    imageUrl: $imageUrl
    stock: $stock
    isActive: $isActive
  ) {
    id
    name
    category
    price
    stock
    isActive
    storeId
  }
}
    `);

export const useUpdateProductMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateProductMutation, TError, UpdateProductMutationVariables, TContext>) => {
    
    return useMutation<UpdateProductMutation, TError, UpdateProductMutationVariables, TContext>(
      {
    mutationKey: ['UpdateProduct'],
    mutationFn: (variables?: UpdateProductMutationVariables) => useCustomFetcher<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, variables)(),
    ...options
  }
    )};

export const UpdateStoreDocument = new TypedDocumentString(`
    mutation UpdateStore($name: String!) {
  updateStore(name: $name) {
    id
    name
    updatedAt
  }
}
    `);

export const useUpdateStoreMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateStoreMutation, TError, UpdateStoreMutationVariables, TContext>) => {
    
    return useMutation<UpdateStoreMutation, TError, UpdateStoreMutationVariables, TContext>(
      {
    mutationKey: ['UpdateStore'],
    mutationFn: (variables?: UpdateStoreMutationVariables) => useCustomFetcher<UpdateStoreMutation, UpdateStoreMutationVariables>(UpdateStoreDocument, variables)(),
    ...options
  }
    )};

export const GetStorefrontProductsDocument = new TypedDocumentString(`
    query GetStorefrontProducts($input: ProductsFilterInput) {
  products(input: $input) {
    id
    name
    description
    category
    price
    imageUrl
    stock
    isActive
    storeId
    store {
      id
      name
    }
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
