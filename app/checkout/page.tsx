import CheckoutClient from './CheckoutClient';

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-12 text-neutral-900 dark:bg-black dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">Almost there</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Checkout</h1>
        <p className="mt-3 text-sm text-neutral-500">Review your order and place it securely.</p>
        <CheckoutClient />
      </div>
    </main>
  );
}
