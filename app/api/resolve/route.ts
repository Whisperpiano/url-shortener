import { findLink } from "@/lib/actions/resolve/find";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json("No slug found", { status: 400 });
  }

  const response = await findLink(slug);

  if (!response.success) {
    return NextResponse.json("Link not found in database", { status: 400 });
  }

  if (response.data) {
    return NextResponse.json({
      success: true,
      data: {
        url: response.data.url,
        slug: response.data.slug,
        description: response.data.description,
      },
    });
  }
}
