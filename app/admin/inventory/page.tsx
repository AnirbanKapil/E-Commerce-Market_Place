
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useGetProductsQuery, useCreateProductMutation } from '@/lib/generated'
import { useQueryClient } from '@tanstack/react-query'

export default function AdminInventoryPage() {
  const { data: session, status } = useSession()
  const queryClient = useQueryClient()

  // UI state managers
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const { data: productsData, isLoading: productsLoading } = useGetProductsQuery()

  
  const { mutate: addProduct, isPending, error: graphQLError } = useCreateProductMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GetProducts'] })
      
      setName('')
      setDescription('')
      setPrice('')
      setStock('')
      setImageUrl('')
      setIsDrawerOpen(false)
    }
  })

  if (status === 'loading') {
    return <div className="p-8 font-medium text-gray-500">Authenticating access levels...</div>
  }

  if (!session || session?.user?.role !== 'ADMIN') {
    return (
      <div className="p-8 max-w-md mx-auto text-center mt-20 border rounded-xl bg-red-50 text-red-700 border-red-200">
        <h2 className="text-lg font-bold">Access Denied</h2>
        <p className="text-sm mt-1">You do not possess the administrative privileges required to look at store assets.</p>
      </div>
    )
  }

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    addProduct({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      imageUrl: imageUrl || null
    })
  }

  return (
    <main className="p-8 max-w-7xl mx-auto space-y-6 relative min-h-screen">
      
      {/* 🌟 Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Product Inventory Dashboard</h1>
          <p className="text-sm text-gray-500">Manage catalog parameters, modify items, and monitor active stock margins.</p>
        </div>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition shadow-sm"
        >
          + Add New Product
        </button>
      </div>

      {/* 📊 Inventory Grid Data Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
        {productsLoading ? (
          <div className="p-12 text-center text-sm text-gray-400">Querying product catalog tables...</div>
        ) : !productsData?.products || productsData.products.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-400">No active products detected in your store inventory ledger.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider text-xs">
                  <th className="p-4">Product Details</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock Margins</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-gray-700">
                {productsData.products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{product.name}</div>
                      <div className="text-gray-400 text-xs mt-0.5 line-clamp-1 max-w-sm">{product.description}</div>
                    </td>
                    <td className="p-4 font-mono font-medium text-gray-900">₹{product.price.toFixed(2)}</td>
                    <td className="p-4 font-mono">{product.stock} units</td>
                    <td className="p-4">
                      {product.stock === 0 ? (
                        <span className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-semibold border border-red-200">Out of Stock</span>
                      ) : product.stock <= 5 ? (
                        <span className="bg-amber-50 text-amber-700 px-2 py-1 rounded text-xs font-semibold border border-amber-200">Low Stock</span>
                      ) : (
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold border border-green-200">Active</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity duration-300">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col space-y-6 overflow-y-auto transform animate-slide-in">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-lg font-bold text-gray-900">Add Inventory Product</h2>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* 🛡️ Human-Friendly Exception Output managed by our Custom server Formatter */}
            {graphQLError && (
              <div className="bg-red-50 text-red-600 border border-red-150 p-3 rounded-md text-sm">
                {graphQLError.message}
              </div>
            )}

            <form onSubmit={handleCreateProduct} className="space-y-4 flex-1 flex flex-col">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Product Name</label>
                <input 
                  type="text" required placeholder="Sony WH-1000XM5" value={name} onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Description</label>
                <textarea 
                  required rows={3} placeholder="Premium industry-leading noise cancelling headphones..." value={description} onChange={e => setDescription(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Price (INR)</label>
                  <input 
                    type="number" step="0.01" required placeholder="29999.00" value={price} onChange={e => setPrice(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Stock Units</label>
                  <input 
                    type="number" required placeholder="25" value={stock} onChange={e => setStock(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Image Resource URL (Optional)</label>
                <input 
                  type="url" placeholder="https://unsplash.com..." value={imageUrl} onChange={e => setImageUrl(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-6 border-t flex gap-4 mt-auto">
                <button 
                  type="button" onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" disabled={isPending}
                  className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:bg-gray-300 transition"
                >
                  {isPending ? 'Saving Product...' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
