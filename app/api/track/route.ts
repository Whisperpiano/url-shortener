import { getGeoFromApi } from "@/lib/geo/getGeoFromApi";
import { registerClick } from "@/lib/queries/clicks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { os, browser, device, slug } = await req.json();

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? null;
  const location = ip ? await getGeoFromApi(ip) : null;

  if (!ip || !location) {
    return NextResponse.json({
      success: false,
      error: "IP or location not found",
    });
  }

  const { country, region, city, countryCode } = location;

  const response = await registerClick({
    linkId: "82db0409-8d50-428b-86b1-5672176648be",
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

  if (!response.success) {
    return NextResponse.json({
      success: false,
      error: response.error,
    });
  }

  return NextResponse.json({
    success: true,
  });
}
