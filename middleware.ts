import { NextRequest, NextResponse, userAgent } from "next/server";

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
  console.log("MIDDLEWARE CALLED - URL:", req.nextUrl.toString());
  console.log("PATHNAME:", req.nextUrl.pathname);

  const { pathname } = req.nextUrl;

  // PRIMERO: Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".")
  ) {
    console.log("✅ Skipping middleware for API/static:", pathname);
    return NextResponse.next();
  }

  const session = await auth();
  const isLoggedIn = !!session?.user;
  console.log("IS_LOGGED_IN:", isLoggedIn);

  // Check if this is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  console.log("IS_PROTECTED_ROUTE:", isProtectedRoute);

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  console.log("IS_PUBLIC_ROUTE:", isPublicRoute);

  if (isProtectedRoute) {
    console.log("✅ Handling as protected route:", pathname);
    if (!isLoggedIn) {
      console.log("not logged in, redirecting to login");
      return NextResponse.redirect(new URL("/?login", req.url));
    }
    return NextResponse.next();
  }

  if (isPublicRoute) {
    console.log("✅ Handling as public route:", pathname);
    return NextResponse.next();
  }

  // If we get here, this might be a shortened URL
  console.log("⚠️ Path not recognized as protected or public:", pathname);
  const slug = pathname.split("/").pop();
  console.log("EXTRACTED SLUG:", slug);

  if (!slug) {
    console.log("no slug found, proceeding to next middleware");
    return NextResponse.next();
  }

  console.log("⚠️ Attempting to find link for slug:", slug);
  const response = await findLink(slug);

  if (!response.success) {
    console.log("link not found for slug:", slug);
    return NextResponse.redirect(new URL("/404?error=link_not_found", req.url));
  }

  if (response.data) {
    console.log("🔍 LINK FOUND:", {
      id: response.data.id,
      slug: response.data.slug,
      url: response.data.url,
    });

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

    console.log("📊 Registering click for link:", response.data.slug);

    try {
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
        console.log("❌ Click not registered:", registerClickResponse.error);
        return NextResponse.redirect(
          new URL("/404?error=click_not_registered", req.url)
        );
      }

      console.log(
        "✅ Click registered successfully, redirecting to:",
        response.data.url
      );
      return NextResponse.redirect(new URL(response.data.url, req.url));
    } catch (error) {
      console.error("❌ Error registering click:", error);
      return NextResponse.redirect(
        new URL("/404?error=click_registration_error", req.url)
      );
    }
  }

  return NextResponse.redirect(new URL("/404", req.url));
}
