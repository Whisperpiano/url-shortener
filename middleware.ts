import { auth } from "@/app/auth";

export const middleware = auth;

export const config = {
  matcher: ["/dashboard"],
};
