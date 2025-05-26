import { findLink } from "@/lib/actions/resolve/find";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { success: false, message: "No slug provided" },
      { status: 400 }
    );
  }

  const response = await findLink(slug);

  if (!response.success) {
    return NextResponse.json(
      { success: false, message: "Link not found" },
      { status: 404 }
    );
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
