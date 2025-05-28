import { headers } from "next/headers";

export const getHeaders = async () => {
  const headersList = await headers();

  const userAgent = headersList.get("user-agent") || "";
  const ip = headersList.get("x-forwarded-for") || "unknown";

  return {
    userAgent,
    ip,
  };
};
