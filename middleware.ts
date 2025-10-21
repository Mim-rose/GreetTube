import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(request: NextRequest) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        // Allow public routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        // Allow homepage and video API
        if (
  pathname.startsWith("/api/video") || // ✅ allow public access
  pathname.startsWith("/api/videos") ||
  pathname === "/" || pathname === "/login" || pathname === "/register"
) {
  return true;
}

        // Require token for everything else
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
      error: "/error",
    },
  }
);

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};