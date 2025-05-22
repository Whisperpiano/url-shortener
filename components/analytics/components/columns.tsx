"use client";

import { DevicesGroup } from "@/lib/analytics/get-devices-details";
import { LocationGroup } from "@/lib/analytics/get-location-details";
import { ColumnDef } from "@tanstack/react-table";

export const locationColumns: ColumnDef<LocationGroup>[] = [
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "region",
    header: "Region",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "count",
    header: "Count",
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
  },
];

export const devicesColumns: ColumnDef<DevicesGroup>[] = [
  {
    accessorKey: "device",
    header: "Device",
  },
  {
    accessorKey: "browser",
    header: "Browser",
  },
  {
    accessorKey: "os",
    header: "OS",
  },
  {
    accessorKey: "count",
    header: "Count",
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
  },
];
