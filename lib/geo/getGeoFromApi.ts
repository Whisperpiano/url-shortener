import { FirstAPISchema, SecondAPISchema } from "../zod/geo";

export type NormalizedLocation = {
  city: string;
  region: string;
  country: string;
  countryCode: string;
};

export async function getGeoFromApi(
  ip: string
): Promise<NormalizedLocation | null> {
  // 1. First try: ip-api.com
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    const parsedData = FirstAPISchema.safeParse(data);
    if (parsedData.success) {
      return {
        city: parsedData.data.city,
        region: parsedData.data.regionName,
        country: parsedData.data.country,
        countryCode: parsedData.data.countryCode,
      };
    }
  } catch (error) {
    console.error("API Error: ip-api.com ", error);
  }

  // 2. Second try: ipwhois.com
  try {
    const response = await fetch(`http://ipwhoo.is/${ip}`);
    const data = await response.json();
    const parsedData = SecondAPISchema.safeParse(data);
    if (parsedData.success) {
      return {
        city: parsedData.data.city,
        region: parsedData.data.region,
        country: parsedData.data.country,
        countryCode: parsedData.data.country_code,
      };
    }
  } catch (error) {
    console.error("API Error: ipwhois.com ", error);
  }

  return null;
}
