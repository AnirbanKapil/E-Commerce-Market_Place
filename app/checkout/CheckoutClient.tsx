'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useStoreCart, useCheckout, getErrorMessage } from '@/app/storefront/cartApi';

const money = (amount: number) => `$${amount.toFixed(2)}`;

export default function CheckoutClient() {
  const cart = useStoreCart();
  const checkout = useCheckout();
  const items = cart.data?.cart ?? [];
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (checkout.data?.checkout) {
    const order = checkout.data.checkout;
    return (
      <section className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 dark:border-emerald-900 dark:bg-emerald-950/30">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Order placed</p>
        <h2 className="mt-2 text-2xl font-bold">Thanks for your order.</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Order {order.id} | {new Date(order.createdAt).toLocaleString()}</p>
        <p className="mt-4 text-sm">{order.items.length} {order.items.length === 1 ? 'item' : 'items'} | {money(order.totalAmount)} | {order.status.toLowerCase()}</p>
        <Link href="/products" className="mt-7 inline-flex rounded-md bg-neutral-900 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-neutral-900">Continue shopping</Link>
      </section>
    );
  }

  if (cart.isLoading) return <p className="mt-10 text-sm text-neutral-500">Loading your order...</p>;
  if (cart.isError) {
    const message = getErrorMessage(cart.error);
    return (
      <div className="mt-10 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">{message}</p>
        {message.toLowerCase().includes('authenticated') && <Link href="/login?callbackUrl=/checkout" className="mt-4 inline-block text-sm font-semibold underline">Sign in to continue</Link>}
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-xl border border-neutral-200 p-8 dark:border-neutral-800">
        <p className="font-medium">Your cart is empty.</p>
        <Link href="/products" className="mt-4 inline-block text-sm font-semibold underline">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <section className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 px-6 dark:divide-neutral-800 dark:border-neutral-800">
        {items.map(({ id, quantity, product }) => (
          <div key={id} className="flex items-center gap-4 py-5">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-lg font-bold text-neutral-400 dark:bg-neutral-900 dark:text-neutral-600">
              {product.imageUrl ? <Image src={product.imageUrl} alt={product.name} fill unoptimized sizes="64px" className="object-cover" /> : product.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{product.name}</p><p className="mt-1 text-sm text-neutral-500">Qty {quantity}</p></div>
            <p className="text-sm font-semibold">{money(product.price * quantity)}</p>
          </div>
        ))}
      </section>

      <aside className="mt-6 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
        <div className="flex justify-between text-sm"><span className="text-neutral-500">Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="mt-3 flex justify-between text-sm"><span className="text-neutral-500">Shipping and taxes</span><span>Not included</span></div>
        <div className="mt-5 border-t border-neutral-200 pt-5 dark:border-neutral-800"><div className="flex justify-between font-semibold"><span>Order total</span><span>{money(subtotal)}</span></div></div>
        {checkout.isError && <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">{getErrorMessage(checkout.error)}</p>}
        <button onClick={() => checkout.mutate()} disabled={checkout.isPending} className="mt-6 w-full rounded-md bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-700 disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">
          {checkout.isPending ? 'Placing order…' : 'Place order'}
        </button>
        <Link href="/cart" className="mt-4 block text-center text-sm text-neutral-500 underline">Back to cart</Link>
      </aside>
    </div>
  );
}
