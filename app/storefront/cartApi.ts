'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCustomFetcher } from '@/lib/fetcher';

export type StoreCartItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string | null;
    stock: number;
  };
};

export type PlacedOrder = {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: StoreCartItem['product'];
  }>;
};

export const cartQueryKey = ['StoreCart'] as const;

const CART_QUERY = `
  query StoreCart {
    cart {
      id
      quantity
      product { id name description price imageUrl stock }
    }
  }
`;

const ADD_TO_CART_MUTATION = `
  mutation AddToCart($productId: String!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      id
      quantity
      product { id name description price imageUrl stock }
    }
  }
`;

const CHECKOUT_MUTATION = `
  mutation Checkout {
    checkout {
      id
      totalAmount
      status
      createdAt
      items {
        id
        quantity
        price
        product { id name description price imageUrl stock }
      }
    }
  }
`;

export function useStoreCart() {
  return useQuery({
    queryKey: cartQueryKey,
    queryFn: useCustomFetcher<{ cart: StoreCartItem[] }, Record<string, never>>(CART_QUERY),
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { productId: string; quantity: number }) =>
      useCustomFetcher<
        { addToCart: StoreCartItem },
        { productId: string; quantity: number }
      >(ADD_TO_CART_MUTATION, variables)(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cartQueryKey }),
  });
}

export function useCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: useCustomFetcher<{ checkout: PlacedOrder }, Record<string, never>>(
      CHECKOUT_MUTATION,
    ),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: cartQueryKey }),
        queryClient.invalidateQueries({ queryKey: ['GetStorefrontProducts'] }),
        queryClient.invalidateQueries({ queryKey: ['GetProducts'] }),
      ]);
    },
  });
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
}
