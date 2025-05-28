import { NextRequest, NextResponse } from "next/server";

import { findLink } from "./lib/actions/resolve/find";
import { headers } from "next/headers";
import { getGeoFromApi } from "./lib/geo/getGeoFromApi";
import { UAParser } from "ua-parser-js";
import { registerClick } from "./lib/queries/clicks";
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
  if (!isProtected(pathname) && !isPublic(pathname)) {
    const slug = pathname.split("/").pop();

    if (!slug) {
      return NextResponse.next();
    }

    const response = await fetch(`/api/resolve?slug=${slug}`);

    if (!response.ok) {
      console.log("link not found");

      return NextResponse.redirect(
        new URL("/404?error=link_not_found", req.url)
      );
    }

    const data = await response.json();

    if (!data.success) {
      console.log("link not found");

      return NextResponse.redirect(
        new URL("/404?error=link_not_found", req.url)
      );
    }

    return NextResponse.redirect(new URL(data.data.url, req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|.+\\.).*)",
  ],
};

// const response = await findLink(slug);

//     if (!response.success) {
//       console.log("link not found");

//       return NextResponse.redirect(
//         new URL("/404?error=link_not_found", req.url)
//       );
//     }

//     if (response.data) {
//       const headersList = await headers();

//       const userAgentString = headersList.get("user-agent") || "";

//       const parser = new UAParser(userAgentString);

//       const browserInfo = parser.getBrowser();

//       const osInfo = parser.getOS();

//       const deviceInfo = parser.getDevice();

//       const browser = {
//         name: browserInfo.name || "unknown",
//       };

//       const os = {
//         name: osInfo.name || "unknown",
//       };

//       const device = {
//         type: deviceInfo.type || deviceInfo.vendor || "desktop",
//       };

//       const ip = headersList.get("x-forwarded-for") || "unknown";

//       const location = await getGeoFromApi(ip);

//       const { country, region, city, countryCode } = location;

//       const registerClickResponse = await registerClick({
//         linkId: response.data.id,
//         slug: response.data.slug,
//         ip,
//         country,
//         region,
//         city,
//         countryCode,
//         device,
//         browser,
//         os,
//       });

//       if (!registerClickResponse.success) {
//         console.log("click not registered");

//         return NextResponse.redirect(
//           new URL("/404?error=click_not_registered", req.url)
//         );
//       }
