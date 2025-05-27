import { NextRequest, NextResponse, userAgent } from "next/server";
import { auth } from "./app/auth";
import { findLink } from "./lib/actions/resolve/find";
import { headers } from "next/headers";
import { getGeoFromApi } from "./lib/geo/getGeoFromApi";
import { registerClick } from "./lib/queries/clicks";

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
      return NextResponse.redirect(
        new URL("/404?error=link_not_found", req.url)
      );
    }

    if (response.data) {
      const headersList = await headers();
      const { os, browser, device } = await req.json();
      const ip = headersList.get("x-forwarded-for") || "unknown";

      const location = await getGeoFromApi(ip);

      const { country, region, city, countryCode } = location;

      // const registerClickResponse = await registerClick({
      //   slug: response.data.slug,
      //   ip,
      //   country,
      //   region,
      //   city,
      //   countryCode,
      //   device,
      //   browser,
      //   os,
      // });

      // if (!registerClickResponse.success) {
      //   console.log("click not registered");
      //   return NextResponse.redirect(
      //     new URL("/404?error=click_not_registered", req.url)
      //   );
      // }

      const redirectUrl = new URL("/404", req.url);
      redirectUrl.searchParams.set("os", os);
      redirectUrl.searchParams.set("browser", browser);
      redirectUrl.searchParams.set("device", device);
      redirectUrl.searchParams.set("ip", ip);
      redirectUrl.searchParams.set("country", country);
      redirectUrl.searchParams.set("region", region);
      redirectUrl.searchParams.set("city", city);
      redirectUrl.searchParams.set("countryCode", countryCode);

      // return NextResponse.redirect(new URL(response.data.url, req.url));
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.redirect(new URL("/404", req.url));
  }
}
