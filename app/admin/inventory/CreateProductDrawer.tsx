

'use client';

import { useState } from 'react';
import { useCreateProductMutation } from '@/lib/generated';
import { useQueryClient } from '@tanstack/react-query';

interface CreateProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateProductDrawer({ isOpen, onClose }: CreateProductDrawerProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    stock: '',
  });

  // Wire up the type-safe mutation compiled by GraphQL-Codegen
  const { mutate, isPending, error } = useCreateProductMutation({
    onSuccess: () => {
      // Automatically refresh the customer storefront and admin list queries
      queryClient.invalidateQueries({ queryKey: ['GetStorefrontProducts'] });
      queryClient.invalidateQueries({ queryKey: ['GetProducts'] });
      
      // Reset form and close panel
      setFormData({ name: '', description: '', price: '', imageUrl: '', stock: '' });
      onClose();
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Core data-casting validation layers matching our absolute schemas
    mutate({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0.0,
      stock: parseInt(formData.stock, 10) || 0,
      imageUrl: formData.imageUrl.trim() || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-white p-6 shadow-xl transition-all dark:bg-neutral-900">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Add New Inventory Item</h2>
            <button onClick={onClose} className="text-neutral-400 hover:text-neutral-500 text-sm font-medium">✕</button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Context Custom Error Catching Formatter Output */}
            {error && (
              <div className="rounded-md bg-red-50 p-3 dark:bg-red-950/30">
                <p className="text-xs font-medium text-red-800 dark:text-red-400">
                  {error instanceof Error ? error.message : 'Failed to establish inventory record.'}
                </p>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Product Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Description</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Initial Stock</label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Product Image URL (Optional)</label>
              <input
                type="url"
                placeholder="https://example.com"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:bg-neutral-400 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                {isPending ? 'Saving Item...' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
