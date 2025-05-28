export const PUBLIC_ROUTES = ["/", "/404"];

export const PROTECTED_ROUTES = [
  "/dashboard",
  "/account",
  "/dashboard/analytics",
  "/account/settings",
];

export function isProtected(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function isPublic(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname);
}
