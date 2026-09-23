'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  
  const callbackUrl = searchParams.get('callbackUrl') || '/profile'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
     
      const result = await signIn('credentials', {
        redirect: false, 
        email,
        password,
      })

      if (result?.error) {
        setError(result.error)
        setLoading(false)
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err) {
      setError(`An unexpected system error occurred.Error message - ${err} `)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-black border border-gray-150 rounded-xl shadow-sm">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-950">Welcome Back</h1>
        <p className="mt-2 text-sm text-gray-500">
          Sign in to access your account dashboard
        </p>
      </div>

      
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-150 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="alex@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Password
            </label>
          </div>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? 'Verifying Credentials...' : 'Sign In'}
        </button>
      </form>

      <div className="relative flex py-2 items-center text-xs text-gray-400 uppercase tracking-wider">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4">Or use provider</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

    
      <button
        onClick={() => signIn('google', { callbackUrl })}
        type="button"
        className="w-full flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm transition"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.79 5.79 0 0 1 8.2 12.725a5.79 5.79 0 0 1 5.79-5.79c2.51 0 4.385 1.054 5.4 2.018l3.232-3.232C20.653 3.733 17.65 2 13.99 2 7.92 2 3 6.92 3 12.99s4.92 10.99 10.99 10.99c6.33 0 10.51-4.453 10.51-10.7 0-.724-.065-1.267-.2-1.995H12.24Z"
          />
        </svg>
        Continue with Google
      </button>

      <p className="text-center text-xs text-gray-500 mt-4">
        Don&apos;t have an account?{' '}
        <a href="/register" className="font-medium text-emerald-600 hover:text-emerald-500 underline">
          Sign up here
        </a>
      </p>
    </div>
  )
}
