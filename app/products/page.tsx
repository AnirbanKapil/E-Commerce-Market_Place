import StorefrontClient from '@/app/storefront/StorefrontClient';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-white">
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          Cartvantage Store
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Products
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
          Browse the latest products available in our store.
        </p>
      </section>
      <StorefrontClient />
    </main>
  );
}
