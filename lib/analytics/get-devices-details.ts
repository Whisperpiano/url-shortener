type ClickItem = {
  country: string | null;
  region: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  countryCode: string | null;
};

export type DevicesGroup = {
  device: string | null;
  browser: string | null;
  os: string | null;
  count: number;
  percentage: number;
};

export function getDevicesDetails(result: ClickItem[]): DevicesGroup[] {
  const total = result.length;
  const groupMap = new Map<
    string,
    { item: Omit<DevicesGroup, "percentage"> }
  >();

  for (const click of result) {
    const key = `${click.device}|${click.browser}|${click.os}`;

    if (!groupMap.has(key)) {
      groupMap.set(key, {
        item: {
          device: click.device,
          browser: click.browser,
          os: click.os,
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
