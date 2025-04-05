import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define which paths require authentication
const protectedPaths = [
  "/dashboard",
  "/dashboard/network",
  "/dashboard/team",
  "/dashboard/commissions",
  "/dashboard/products",
  "/dashboard/recruitment",
  "/dashboard/achievements",
  "/dashboard/settings",
  "/dashboard/visualization",
]

// Define which paths should redirect to dashboard if already authenticated
const authPaths = ["/login", "/register", "/forgot-password"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // Check if the path is an auth path
  const isAuthPath = authPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // Get the authentication token from the cookies
  const authToken = request.cookies.get("auth_token")?.value

  // If the path is protected and there's no token, redirect to login
  if (isProtectedPath && !authToken) {
    const url = new URL("/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // If the path is an auth path and there's a token, redirect to dashboard
  if (isAuthPath && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
}

