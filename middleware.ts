
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware() {
    return NextResponse.next()
  },
  {
    pages: {
      signIn: "/signup", 
    },
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        if (
          pathname === "/" || 
          pathname === "/signin" || 
          pathname === "/signup"
        ) {
          return true
        }
     
        if (
          pathname.startsWith("/api/auth") || 
          pathname.startsWith("/api/graphql")
        ) {
          return true
        }

        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
  
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
