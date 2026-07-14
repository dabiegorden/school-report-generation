import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { verifyJWT, SESSION_COOKIE } from "@/lib/auth/jwt"

/**
 * Route protection. In Next.js 16 the `middleware` convention was renamed
 * to `proxy` (see docs/file-conventions/proxy). This runs before rendering:
 *
 * - Unauthenticated requests to `/dashboard/**` are redirected to `/login`.
 * - Authenticated requests to `/login` are redirected to `/dashboard`.
 *
 * This is a UX guard only. Authorization is also enforced server-side in the
 * dashboard layout via `getCurrentUser`, per the Next.js data-security guide.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(SESSION_COOKIE)?.value
  const session = await verifyJWT(token)

  const isDashboard = pathname.startsWith("/dashboard")
  const isLogin = pathname === "/login"

  if (isDashboard && !session) {
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (isLogin && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}
