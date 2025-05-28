import { NextResponse } from "next/server";

export const jsonError = (message: string, status: number = 500) =>
  NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
