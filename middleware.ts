import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/auth";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.next();
  }

  const protectedRoutes = ["/dashboard"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  try {
    if (isProtectedRoute) {
      const session = await auth();

      if (session?.user) {
        return NextResponse.next();
      }

      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/";
      redirectUrl.search = "?login";

      return NextResponse.redirect(redirectUrl);
    }

    const slug = pathname.slice(1);

    const response = await fetch(`${origin}/api/resolve?slug=${slug}`);
    const data = await response.json();

    if (data.success && data.data?.url) {
      return NextResponse.redirect(new URL(data.data.url, origin));
    } else {
      return NextResponse.rewrite(new URL("/not-found", origin));
    }
  } catch (error) {
    console.error("Error en middleware:", error);
    return NextResponse.rewrite(new URL("/not-found", origin));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

// import { auth } from "@/app/auth";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { UAParser } from "ua-parser-js";

// const APP_ROUTES = [
//   "/",
//   "/dashboard",
//   "/api",
//   "/auth",
//   "/login",
//   "/register",
//   "/account",
//   "/settings",
//   "/analytics",
//   "/r",
//   "/_next",
//   "/not-found",
//   "/images",
//   "/favicon.ico",
//   "/manifest.json",
//   "/robots.txt",
//   "/sitemap.xml",
// ];

// export async function middleware(req: NextRequest) {
//   const { pathname, origin } = req.nextUrl;

//   if (
//     [...APP_ROUTES].some(
//       (route) => pathname === route || pathname.startsWith(`${route}/`)
//     )
//   ) {
//     return NextResponse.next();
//   }

//   if (pathname.startsWith("/r/")) {
//     const slug = pathname.replace("/r/", "");
//     const newUrl = new URL(`/${slug}`, origin);
//     return NextResponse.redirect(newUrl);
//   }

//   if (pathname.startsWith("/dashboard") || pathname.startsWith("/account")) {
//     const session = await auth();

//     if (session?.user) {
//       return NextResponse.next();
//     }

//     const redirectUrl = req.nextUrl.clone();
//     redirectUrl.pathname = "/";
//     redirectUrl.search = `?login`;
//     return NextResponse.redirect(redirectUrl);
//   }

//   const slug = pathname === "/" ? "" : pathname.substring(1);

//   try {
//     const response = await fetch(`${origin}/api/resolve?slug=${slug}`);
//     const data = await response.json();

//     if (data.success) {
//       const userAgent = req.headers.get("user-agent") || "";
//       const parser = new UAParser(userAgent);
//       const { browser, os, device } = parser.getResult();

//       fetch(`${origin}/api/track`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           os,
//           browser,
//           device,
//           slug,
//         }),
//       }).catch((error) => console.error("Error tracking:", error));

//       return NextResponse.redirect(data.data.url);
//     } else {
//       return NextResponse.rewrite(new URL("/not-found", origin));
//     }
//   } catch (error) {
//     console.error("Error resolving slug:", error);
//     return NextResponse.rewrite(new URL("/not-found", origin));
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };
