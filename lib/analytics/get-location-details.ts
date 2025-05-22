type ClickItem = {
  country: string | null;
  region: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  countryCode: string | null;
};

export type LocationGroup = {
  country: string | null;
  region: string | null;
  city: string | null;
  countryCode: string | null;
  count: number;
  percentage: number;
};

export function getLocationDetails(result: ClickItem[]): LocationGroup[] {
  const total = result.length;
  const groupMap = new Map<
    string,
    { item: Omit<LocationGroup, "percentage"> }
  >();

  for (const click of result) {
    const key = `${click.country}|${click.region}|${click.city}|${click.countryCode}`;

    if (!groupMap.has(key)) {
      groupMap.set(key, {
        item: {
          country: click.country,
          region: click.region,
          city: click.city,
          countryCode: click.countryCode,
          count: 1,
        },
      });
    } else {
      groupMap.get(key)!.item.count += 1;
    }
  }

  return Array.from(groupMap.values()).map(({ item }) => ({
    ...item,
    percentage: parseFloat(((item.count / total) * 100).toFixed(2)),
  }));
}
