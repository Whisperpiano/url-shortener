type ClickItem = {
  country: string | null;
  region: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  countryCode: string | null;
};

type AggregatedItem = {
  label: string;
  value: number;
  countryCode?: string;
};

export function groupByKey<KeyType extends keyof ClickItem>(
  result: ClickItem[],
  key: KeyType
): AggregatedItem[] {
  const includeCountryCode =
    key === "country" || key === "region" || key === "city";
  const map = new Map<string, { count: number; code?: string }>();

  for (const item of result) {
    const label = item[key] ?? "Unknown";
    const countryCode = item.countryCode ?? "Unknown";

    const entry = map.get(label);
    if (entry) {
      entry.count++;
    } else {
      map.set(label, {
        count: 1,
        ...(includeCountryCode && { code: countryCode }),
      });
    }
  }

  return Array.from(map.entries()).map(([label, { count, code }]) => ({
    label,
    value: count,
    ...(includeCountryCode && { countryCode: code }),
  }));
}

// import { LinkDataType } from "../zod/analytics";

// type GroupedResultWithCountryCode<K extends keyof LinkDataType> = {
//   [P in K]: string;
// } & {
//   countryCode: string;
//   value: number;
// };

// type GroupedResultSimple<K extends keyof LinkDataType> = {
//   [P in K]: string;
// } & {
//   value: number;
// };

// type KeysWithCountryCode = "country" | "region" | "city";

// type Accumulator = Record<
//   string,
//   { count: number; countryCode: string } | number
// >;

// export function groupByKey<K extends keyof LinkDataType>(
//   data: LinkDataType[],
//   key: K
// ): Array<
//   K extends KeysWithCountryCode
//     ? GroupedResultWithCountryCode<K>
//     : GroupedResultSimple<K>
// > {
//   const keysWithCountryCode: KeysWithCountryCode[] = [
//     "country",
//     "region",
//     "city",
//   ];

//   const grouped = data.reduce((acc: Accumulator, item: LinkDataType) => {
//     const k = item[key];

//     if (k === null || k === undefined) {
//       return acc;
//     }

//     const groupKey = String(k);

//     if (keysWithCountryCode.includes(key as KeysWithCountryCode)) {
//       if (!acc[groupKey]) {
//         acc[groupKey] = {
//           count: 0,
//           countryCode: item.countryCode ?? "unknown",
//         };
//       }

//       const currentEntry = acc[groupKey];
//       if (
//         typeof currentEntry === "object" &&
//         currentEntry !== null &&
//         "count" in currentEntry
//       ) {
//         currentEntry.count += 1;
//       } else {
//         console.warn(`Inconsistent accumulator state for key ${groupKey}`);
//         acc[groupKey] = {
//           count: 1,
//           countryCode: item.countryCode ?? "unknown",
//         };
//       }
//     } else {
//       const currentCount =
//         typeof acc[groupKey] === "number" ? acc[groupKey] : 0;
//       acc[groupKey] = currentCount + 1;
//     }

//     return acc;
//   }, {});

//   return Object.entries(grouped).map(([k, value]) => {
//     if (keysWithCountryCode.includes(key as KeysWithCountryCode)) {
//       const typedValue = value as { count: number; countryCode: string };
//       return {
//         [key]: k,
//         countryCode: typedValue.countryCode,
//         value: typedValue.count,
//       };
//     } else {
//       return {
//         [key]: k,
//         value: value as number,
//       };
//     }
//   }) as Array<
//     K extends KeysWithCountryCode
//       ? GroupedResultWithCountryCode<K>
//       : GroupedResultSimple<K>
//   >;
// }
