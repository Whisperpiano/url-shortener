import { auth } from "@/app/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UAParser } from "ua-parser-js";

const APP_ROUTES = [
  "/",
  "/dashboard",
  "/api",
  "/auth",
  "/login",
  "/register",
  "/account",
  "/settings",
  "/analytics",
  "/r",
  "/_next",
  "/not-found",
  "/images",
  "/favicon.ico",
  "/manifest.json",
  "/robots.txt",
  "/sitemap.xml",
];

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // Mejorada la verificación de rutas de la aplicación
  if (
    APP_ROUTES.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(`${route}/`) ||
        // Asegurarse de que las rutas completas como /dashboard también coincidan
        (route !== "/" && pathname === route)
    )
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/r/")) {
    const slug = pathname.replace("/r/", "");
    const newUrl = new URL(`/${slug}`, origin);
    return NextResponse.redirect(newUrl);
  }

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/account")) {
    const session = await auth();

    if (session?.user) {
      return NextResponse.next();
    }

    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    redirectUrl.search = `?login`;
    return NextResponse.redirect(redirectUrl);
  }

  // Verificación adicional para evitar procesar rutas internas como slugs
  // Si la ruta contiene más de un segmento (tiene una barra después del primer segmento)
  // o si coincide con cualquier patrón de ruta de la aplicación, no lo proceses como slug
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 1 || APP_ROUTES.includes(`/${segments[0]}`)) {
    return NextResponse.next();
  }

  const slug = pathname === "/" ? "" : pathname.substring(1);

  // No procesar si el slug está vacío y no estamos en la raíz
  if (!slug && pathname !== "/") {
    return NextResponse.next();
  }

  try {
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
      }).catch((error) => console.error("Error tracking:", error));

      return NextResponse.redirect(data.data.url);
    } else {
      return NextResponse.rewrite(new URL("/not-found", origin));
    }
  } catch (error) {
    console.error("Error resolving slug:", error);
    return NextResponse.rewrite(new URL("/not-found", origin));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
