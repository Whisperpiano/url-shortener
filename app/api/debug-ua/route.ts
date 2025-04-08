import { NextRequest } from "next/server";
import { UAParser } from "ua-parser-js";

export async function GET(req: NextRequest) {
  const userAgent = req.headers.get("user-agent") || "";
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  console.log("📊 UAParser result:", result);
  return Response.json(result);
}
