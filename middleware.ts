// middleware.ts
import { auth } from "@/app/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();

  if (session?.user) {
    return NextResponse.next();
  }

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/";
  redirectUrl.search = `?login`;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/dashboard"],
};
