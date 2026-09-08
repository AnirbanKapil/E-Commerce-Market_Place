"use client"


import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



export interface AuthProviderProps {
  children: React.ReactNode
}

const qureyClient = new QueryClient();



export default function AuthProvider({ children }: AuthProviderProps) {
  return ( 
  <SessionProvider>
   <QueryClientProvider client={qureyClient}> 
    {children}
   </QueryClientProvider>  
  </SessionProvider>
  )
}