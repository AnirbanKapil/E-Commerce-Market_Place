
'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Navbar() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <nav className="p-4 border-b">Loading authentication...</nav>
  }

  return (
    <nav className="p-4 border-b flex justify-between items-center bg-white shadow-sm">
      <span className="font-bold text-lg">My App</span>

      <div className="flex gap-4 items-center">
        {session ? (
          <>
            <div className="text-sm">
              <p className="font-medium text-gray-700">Hello, {session.user?.name || 'User'}</p>
              <p className="text-xs text-gray-400">{session.user?.email}</p>
            </div>
            {session.user?.image && (
              <Image
                width="8"
                height="8" 
                src={session.user.image} 
                alt="Profile" 
                className="rounded-full border"
              />
            )}
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
           
            <button
              onClick={() => signIn('google')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition"
            >
              Sign in with Google
            </button>

        
            <button
              onClick={() => signIn()}
              className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded text-sm transition"
            >
              Sign in with Password
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
