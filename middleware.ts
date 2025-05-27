import { NextRequest, NextResponse, userAgent } from "next/server";
import { auth } from "./app/auth";
import { findLink } from "./lib/actions/resolve/find";
import { headers } from "next/headers";

const PUBLIC_ROUTES = ["/", "/404"];
const PROTECTED_ROUTES = [
  "/dashboard",
  "/account",
  "/dashboard/analytics",
  "/account/settings",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = await auth();
  const isLoggedIn = !!session?.user;

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isProtectedRoute) {
    console.log("protected route:", pathname);

    if (!isLoggedIn) {
      console.log("not logged in, redirecting to login");
      return NextResponse.redirect(new URL("/?login", req.url));
    }

    return NextResponse.next();
  }

  if (isPublicRoute) {
    console.log("public route:", pathname);
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (!isProtectedRoute && !isPublicRoute) {
    const slug = pathname.split("/").pop();

    if (!slug) {
      console.log("no slug");
      return NextResponse.next();
    }

    const response = await findLink(slug);

    if (!response.success) {
      console.log("link not found");
      return NextResponse.redirect(new URL("/404", req.url));
    }

    if (response.data) {
      // AQUI QUIERO SABER QUE IP ES LA QUE ESTA HACIENDO LA PETICION

      const headersList = await headers();
      const ip = headersList.get("x-forwarded-for") || "unknown";
      const data = {
        ok: true,
        ip_address: ip,
      };

      const redirectUrl = new URL("/404", req.url);
      redirectUrl.searchParams.set("ip", data.ip_address);
      redirectUrl.searchParams.set("target", response.data.url);

      console.log(data);

      // return NextResponse.redirect(new URL(response.data.url, req.url));
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.redirect(new URL("/404", req.url));
  }
}
