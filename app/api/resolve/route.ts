import { findLink } from "@/lib/actions/resolve/find";
import { getGeoFromApi } from "@/lib/geo/getGeoFromApi";
import { getHeaders } from "@/lib/headers";
import { parseUserAgent } from "@/lib/parser/parse-user-agent";
import { registerClick } from "@/lib/queries/clicks";
import { jsonError } from "@/lib/utils/json-error-response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug) {
    return jsonError("No slug provided", 400);
  }

  // 1. Find link by slug
  const response = await findLink(slug);

  if (!response.data) {
    return jsonError("Link not found", 404);
  }

  const { userAgent, ip } = await getHeaders();

  if (!userAgent || !ip) {
    return jsonError("User agent or IP missing in headers", 500);
  }
  const { browser, os, device } = parseUserAgent(userAgent);

  if (!browser || !os || !device) {
    return jsonError("Unable to parse user agent info", 500);
  }

  const { country, region, city, countryCode } = await getGeoFromApi(ip);

  if (!country || !region || !city || !countryCode) {
    return jsonError("Geolocation data incomplete", 500);
  }

  const registerClickResponse = await registerClick({
    linkId: response.data.id,
    slug,
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
    return jsonError("Something went wrong while registering click", 500);
  }

  return NextResponse.json({
    success: true,
    data: {
      url: response.data.url,
      slug: response.data.slug,
      description: response.data.description,
    },
  });
}
