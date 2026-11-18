'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getErrorMessage, useStoreCart } from '@/app/storefront/cartApi';

const money = (amount: number) => `$${amount.toFixed(2)}`;

export default function CartClient() {
  const { data, isLoading, isError, error, refetch } = useStoreCart();
  const items = data?.cart ?? [];
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (isLoading) return <p className="mt-10 text-sm text-neutral-500">Loading your cart…</p>;

  if (isError) {
    const message = getErrorMessage(error);
    const needsSignIn = message.toLowerCase().includes('authenticated');
    return (
      <div className="mt-10 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">{message}</p>
        <div className="mt-4 flex gap-4 text-sm">
          {needsSignIn ? (
            <Link className="font-semibold underline" href="/login?callbackUrl=/cart">Sign in to view your cart</Link>
          ) : (
            <button className="font-semibold underline" onClick={() => void refetch()}>Try again</button>
          )}
          <Link className="underline" href="/products">Continue shopping</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-xl border border-dashed border-neutral-300 px-6 py-16 text-center dark:border-neutral-700">
        <h2 className="text-lg font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-sm text-neutral-500">Find something you love in the store.</p>
        <Link href="/products" className="mt-6 inline-flex rounded-md bg-neutral-900 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-neutral-900">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
      <section aria-label="Cart items" className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {items.map(({ id, quantity, product }) => (
          <article key={id} className="flex gap-5 py-6 first:pt-0">
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-100 text-2xl font-bold text-neutral-400 dark:bg-neutral-900 dark:text-neutral-600">
              {product.imageUrl ? <Image src={product.imageUrl} alt={product.name} fill unoptimized sizes="96px" className="object-cover" /> : product.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex min-w-0 flex-1 justify-between gap-4">
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{product.description}</p>
                <p className="mt-3 text-sm text-neutral-500">Quantity: {quantity}</p>
              </div>
              <p className="shrink-0 font-semibold">{money(product.price * quantity)}</p>
            </div>
          </article>
        ))}
      </section>

      <aside className="h-fit rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <div className="mt-6 flex justify-between text-sm"><span className="text-neutral-500">Subtotal</span><span>{money(subtotal)}</span></div>
        <p className="mt-3 text-xs leading-5 text-neutral-500">Shipping and taxes, if applicable, are not included in this total.</p>
        <div className="mt-6 border-t border-neutral-200 pt-5 dark:border-neutral-800">
          <div className="flex justify-between font-semibold"><span>Total</span><span>{money(subtotal)}</span></div>
          <Link href="/checkout" className="mt-6 flex w-full justify-center rounded-md bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">Continue to checkout</Link>
        </div>
      </aside>
    </div>
  );
}
