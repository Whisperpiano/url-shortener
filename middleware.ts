import { NextRequest, NextResponse } from "next/server";
import { findLink } from "./lib/actions/resolve/find";
import { headers } from "next/headers";
import { getGeoFromApi } from "./lib/geo/getGeoFromApi";
import { UAParser } from "ua-parser-js";
import { registerClick } from "./lib/queries/clicks";
import { auth } from "./app/auth";

const PUBLIC_ROUTES = ["/", "/404"];

const PROTECTED_ROUTES = [
  "/dashboard",
  "/account",
  "/dashboard/analytics",
  "/account/settings",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isProtectedRoute) {
    const session = await auth();
    const isLoggedIn = !!session;

    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/?login", req.url));
    }

    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!isProtectedRoute && !isPublicRoute) {
    const slug = pathname.split("/").pop();

    if (!slug) {
      return NextResponse.next();
    }

    const response = await findLink(slug);

    if (!response.success) {
      return NextResponse.redirect(
        new URL("/404?error=link_not_found", req.url)
      );
    }

    if (response.data) {
      const headersList = await headers();
      const userAgentString = headersList.get("user-agent") || "";
      const parser = new UAParser(userAgentString);
      const browserInfo = parser.getBrowser();
      const osInfo = parser.getOS();
      const deviceInfo = parser.getDevice();

      const browser = {
        name: browserInfo.name || "unknown",
      };

      const os = {
        name: osInfo.name || "unknown",
      };

      const device = {
        type: deviceInfo.type || deviceInfo.vendor || "desktop",
      };

      const ip = headersList.get("x-forwarded-for") || "unknown";

      const location = await getGeoFromApi(ip);

      const { country, region, city, countryCode } = location;

      const registerClickResponse = await registerClick({
        linkId: response.data.id,
        slug: response.data.slug,
        ip,
        country,
        region,
        city,
        countryCode,
        device,
        browser,
        os,
      });

      if (!registerClickResponse.success) {
        return NextResponse.redirect(
          new URL("/404?error=click_not_registered", req.url)
        );
      }

      return NextResponse.redirect(new URL(response.data.url, req.url));
    }

    return NextResponse.redirect(new URL("/404", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|.+\\.).*)",
  ],
};
