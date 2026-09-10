'use client'

import { useSession } from 'next-auth/react'
import { useGetMeQuery, } from '@/graphql/generated/hooks'



export default function ProfilePage () {
    const { data: session } = useSession();

    const { data, isLoading, error } = useGetMeQuery(
    {}, 
    { enabled: !!session }
    );

    return (
        <main className="p-8 max-w-lg mx-auto space-y-8">
            <div className="p-6 border rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-4">GraphQL Auth Context Info</h2>
        {isLoading && <p className="text-gray-500">Querying Apollo Server...</p>}
        {error && <p className="text-red-500 font-medium">Error: {error.message}</p>}
        
        {data?.me ? (
          <div className="space-y-1 text-sm text-gray-700">
            <p><strong>Database ID:</strong> {data.me.id}</p>
            <p><strong>Name:</strong> {data.me.name}</p>
            <p><strong>Username:</strong> @{data.me.username}</p>
            <p><strong>Email:</strong> {data.me.email}</p>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Please log in to see data pulled from the Neon DB.</p>
        )}
      </div>

        </main>
    )
}



