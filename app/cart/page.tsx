import CartClient from './CartClient';

export default function CartPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-12 text-neutral-900 dark:bg-black dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Your order</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Shopping cart</h1>
        <CartClient />
      </div>
    </main>
  );
}
