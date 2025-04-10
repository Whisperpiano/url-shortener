// middleware.ts
import { auth } from "@/app/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UAParser } from "ua-parser-js";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  if (pathname.startsWith("/r/")) {
    const slug = pathname.replace("/r/", "");
    const response = await fetch(`${origin}/api/resolve?slug=${slug}`);
    const data = await response.json();

    if (data.success) {
      const userAgent = req.headers.get("user-agent") || "";
      const parser = new UAParser(userAgent);
      const { browser, os, device } = parser.getResult();

      fetch(`${origin}/api/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          os,
          browser,
          device,
          slug,
        }),
      });

      return NextResponse.redirect(data.data.url);
    } else {
      return NextResponse.redirect(`${origin}/404`);
    }
  }

  if (pathname.startsWith("/dashboard")) {
    const session = await auth();

    if (session?.user) {
      return NextResponse.next();
    }

    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    redirectUrl.search = `?login`;

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/r/:slug*", "/dashboard"],
};
