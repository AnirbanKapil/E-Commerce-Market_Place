
'use client';

import Image from 'next/image';
import { Product } from '@/lib/generated';

interface ProductCardProps {
 
  product: Pick<Product, 'id' | 'name' | 'description' | 'price' | 'imageUrl' | 'stock'>;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Use your real database column name 'imageUrl' with a reliable placeholder fallback
  const displayImage = product.imageUrl || '/placeholder-product.png';
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs">
            <span className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
              Out Of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Content Specifications */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 flex-1">
          {product.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-base font-bold text-neutral-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <button
            disabled={isOutOfStock}
            className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 dark:disabled:bg-neutral-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
