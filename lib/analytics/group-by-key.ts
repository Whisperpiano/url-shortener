export function groupByKey<T extends string>(
  data: Array<Record<T, string | null>>,
  key: T
): Array<{ [K in T]: string } & { value: number }> {
  const grouped = data.reduce((acc, item) => {
    const k = item[key];
    if (!k) return acc;
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped).map(([k, value]) => ({
    [key]: k,
    value,
  })) as Array<{ [K in T]: string } & { value: number }>;
}
