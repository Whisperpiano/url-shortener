// middleware.ts
import { auth } from "@/app/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UAParser } from "ua-parser-js";

// Definir rutas que sabemos que son parte de la aplicación y no slugs
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
  "/favicon.ico",
  "/manifest.json",
  "/robots.txt",
  "/sitemap.xml",
];

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // Verificar primero si es una ruta de la aplicación conocida
  const isAppRoute = APP_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Si todavía es /r/slug, redirigir a /slug para mantener compatibilidad
  if (pathname.startsWith("/r/")) {
    const slug = pathname.replace("/r/", "");
    const newUrl = new URL(`/${slug}`, origin);
    return NextResponse.redirect(newUrl);
  }

  // Si es una ruta de la aplicación, procesarla normalmente
  if (isAppRoute) {
    // Verificar autorización para rutas de dashboard
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

    // Para otras rutas de la aplicación, continuar normalmente
    return NextResponse.next();
  }

  // En este punto, asumimos que es un slug
  // Extraer el slug (eliminar la barra inicial)
  const slug = pathname.substring(1);

  // Verificar si es un slug válido
  try {
    const response = await fetch(`${origin}/api/resolve?slug=${slug}`);
    const data = await response.json();

    if (data.success) {
      // Registrar el acceso
      const userAgent = req.headers.get("user-agent") || "";
      const parser = new UAParser(userAgent);
      const { browser, os, device } = parser.getResult();

      // Usar fetch con la opción 'no-wait' para evitar bloquear la redirección
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

      // Redirigir al URL destino
      return NextResponse.redirect(data.data.url);
    } else {
      // Slug no válido, redirigir a 404
      return NextResponse.redirect(`${origin}/404`);
    }
  } catch (error) {
    console.error("Error resolving slug:", error);
    return NextResponse.redirect(`${origin}/404`);
  }
}

export const config = {
  matcher: ["/:slug*", "/dashboard"],
};
