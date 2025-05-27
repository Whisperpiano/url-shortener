// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "./app/auth";

// const PUBLIC_ROUTES = ["/", "/404"];

// const PROTECTED_ROUTES = [
//   "/dashboard",
//   "/account",
//   "/dashboard/analytics",
//   "/account/settings",
// ];

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   const session = await auth();

//   const isLoggedIn = !!session?.user;

//   const isProtectedRoute = PROTECTED_ROUTES.some(
//     (route) => pathname === route || pathname.startsWith(`${route}/`)
//   );

//   const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

//   if (isProtectedRoute) {
//     console.log("protected route:", pathname);

//     if (!isLoggedIn) {
//       console.log("not logged in, redirecting to login");
//       return NextResponse.redirect(new URL("/?login", req.url));
//     }

//     return NextResponse.next();
//   }

//   if (isPublicRoute) {
//     console.log("public route:", pathname);
//     return NextResponse.next();
//   }

//   if (!isProtectedRoute && !isPublicRoute) {
//     const slug = pathname.split("/").pop();

//     if (!slug) {
//       console.log("no slug");
//       return NextResponse.next();
//     }

//     console.log("slug:", slug);

//     return NextResponse.redirect(new URL("/404", req.url));
//   }
// }
