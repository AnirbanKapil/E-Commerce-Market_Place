'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="p-4 border-b flex justify-between items-center bg-black">
      <Link href="/products" className="font-bold">Cartvantage</Link>
      <div className="flex gap-4 items-center">
        <Link href="/products" className="text-sm text-gray-300 hover:text-white">Products</Link>
        <Link href="/cart" className="text-sm text-gray-300 hover:text-white">Cart</Link>
        {status === 'loading' ? (
          <span className="text-gray-400 text-sm">Validating session...</span>
        ) : session ? (
          <>
            <span className="text-sm text-gray-600">Logged in as: {session.user?.email}</span>
            <button 
              onClick={() => signOut()} 
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => signIn('google')} 
              className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
            >
              Google Login
            </button>
            <button 
              onClick={() => signIn()} 
              className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-900"
            >
              LogIn With Credentials 
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
