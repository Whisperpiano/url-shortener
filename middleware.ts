import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/auth";
import { isProtected, isPublic } from "./lib/routes/access";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Protected routes, require authentication
  if (isProtected(pathname)) {
    const session = await auth();

    if (!session) {
      return NextResponse.redirect(new URL("/?login", req.url));
    }

    return NextResponse.next();
  }

  // 2. Public routes, no authentication required
  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  // 3. If the route is not protected or public, it is a short link
  const slug = pathname.split("/").pop();

  if (!isProtected(pathname) && !isPublic(pathname) && slug) {
    try {
      const resolveApiUrl = new URL(
        `/api/resolve?slug=${slug}`,
        req.url
      ).toString();

      const resolveApiResponse = await fetch(resolveApiUrl);

      if (!resolveApiResponse.ok) {
        return NextResponse.redirect(
          new URL("/404?error=link_not_found", req.url)
        );
      }

      const data = await resolveApiResponse.json();

      if (data.success && data.data && data.data.url) {
        return NextResponse.redirect(new URL(data.data.url, req.url));
      } else {
        return NextResponse.redirect(
          new URL("/404?error=invalid_response", req.url)
        );
      }
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/404?error=server_error", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|.+\\.).*)",
  ],
};
