

'use client';

import { useState } from 'react';
import { useGetStorefrontProductsQuery } from '@/lib/generated';
import ProductCard from './ProductCard';

export default function StorefrontClient() {
  const [search, setSearch] = useState('');

  // Pipe the live text search input straight to your hooks layer
  const { data, isLoading, error } = useGetStorefrontProductsQuery({
      input: {
        search:  search || undefined,
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Filter Header */}
      <div className="border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <div className="w-full max-w-md">
          <input
            type="search"
            placeholder="Search items by keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
          />
        </div>
      </div>

      {/* Grid Execution Framework */}
      <div className="mt-8">
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
                <div className="aspect-square w-full rounded-md bg-neutral-200 dark:bg-neutral-800" />
                <div className="mt-4 h-4 w-2/3 rounded-sm bg-neutral-200 dark:bg-neutral-800" />
                <div className="mt-2 h-3 w-full rounded-sm bg-neutral-200 dark:bg-neutral-800" />
                <div className="mt-4 h-6 w-1/3 rounded-sm bg-neutral-200 dark:bg-neutral-800" />
              </div>
            ))}
          </div>
        )}

        {error !=null  && (
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-950/30">
            <p className="text-sm font-medium text-red-800 dark:text-red-400">
              {error instanceof Error ? error.message : 'An error occurred loading our collection.'}
            </p>
          </div>
        )}

        {!isLoading && !error && (!data?.products || data.products.length === 0) && (
          <div className="text-center py-16">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-white">No products found</h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Try typing a different name or checking your text parameters.
            </p>
          </div>
        )}

        {!isLoading && !error && data?.products && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
