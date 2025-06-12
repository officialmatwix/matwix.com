import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Skip middleware for static files and API routes
  if (
    path.startsWith("/_next/") ||
    path.startsWith("/api/") ||
    path.includes("favicon.ico") ||
    path.includes(".png") ||
    path.includes(".jpg") ||
    path.includes(".svg")
  ) {
    return NextResponse.next()
  }

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" || path === "/login" || path === "/register" || path === "/forgot-password" || path === "/admin-login"

  // Get the token from cookies
  const token = request.cookies.get("auth_token")?.value

  // If the path requires authentication and no token exists, redirect to login
  if (!isPublicPath && !token) {
    // Create a new URL to redirect to login
    const url = new URL("/login", request.url)
    // Add the current path as a redirect parameter
    url.searchParams.set("redirect", path)
    return NextResponse.redirect(url)
  }

  // If the user is logged in and tries to access login/register page, redirect to dashboard
  if (isPublicPath && token && path !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Continue with the request
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
