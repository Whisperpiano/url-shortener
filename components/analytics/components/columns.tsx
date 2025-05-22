"use client";

import { deviceIcons } from "@/components/icons/icons-dictionary";
import { DevicesGroup } from "@/lib/analytics/get-devices-details";
import { LocationGroup } from "@/lib/analytics/get-location-details";
import { getFlag } from "@/lib/utils/getFlag";
import { ColumnDef } from "@tanstack/react-table";
import { FaQuestionCircle } from "react-icons/fa";
import Image from "next/image";

export const locationColumns: ColumnDef<LocationGroup>[] = [
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => {
      const countryCode = row.original.countryCode;
      return (
        <div className="flex items-center gap-2">
          {countryCode && (
            <Image
              src={getFlag(countryCode)}
              alt={countryCode}
              width={24}
              height={24}
            />
          )}
          <span>{row.original.country}</span>
        </div>
      );
    },
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
    header: "Total",
    cell: ({ row }) => {
      const percentage = row.original.percentage;
      return <span>{percentage.toFixed()}%</span>;
    },
  },
];

export const devicesColumns: ColumnDef<DevicesGroup>[] = [
  {
    accessorKey: "device",
    header: "Device",
    cell: ({ row }) => {
      const device = row.original.device;
      return (
        <div className="flex items-center gap-2">
          {deviceIcons[device || "Other"] || <FaQuestionCircle />}
          <span>
            {device
              ? device.slice(0, 1).toUpperCase() + device.slice(1)
              : "Unknown"}
          </span>
        </div>
      );
    },
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
    cell: ({ row }) => {
      const percentage = row.original.percentage;
      return <span>{percentage.toFixed()}%</span>;
    },
  },
];
