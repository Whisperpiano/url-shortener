"use client";

import { deviceIcons } from "@/components/icons/icons-dictionary";
import { DevicesGroup } from "@/lib/analytics/get-devices-details";
import { LocationGroup } from "@/lib/analytics/get-location-details";
import { getFlag } from "@/lib/utils/getFlag";
import { ColumnDef } from "@tanstack/react-table";
import { FaQuestionCircle } from "react-icons/fa";
import Image from "next/image";
import { ArrowUpDown } from "lucide-react";

export const locationColumns: ColumnDef<LocationGroup>[] = [
  {
    accessorKey: "country",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:bg-muted/50 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
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
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:bg-muted/50 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Region
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:bg-muted/50 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          City
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "count",
    header: "Clicks",
    cell: ({ row }) => {
      const count = row.original.count;
      return <span className="flex items-center justify-center">{count}</span>;
    },
  },
  {
    accessorKey: "percentage",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:bg-muted/50 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const percentage = row.original.percentage;
      return (
        <span className="flex items-center justify-center">
          {percentage.toFixed()}%
        </span>
      );
    },
  },
];

export const devicesColumns: ColumnDef<DevicesGroup>[] = [
  {
    accessorKey: "device",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:bg-muted/50 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Device
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
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
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:bg-muted/50 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Browser
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "os",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:bg-muted/50 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          OS
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const os = row.original.os;
      return (
        <div className="flex items-center gap-2">
          <span>
            {os ? os.slice(0, 1).toUpperCase() + os.slice(1) : "Unknown"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "count",
    header: "Clicks",
    cell: ({ row }) => {
      const count = row.original.count;
      return <span>{count}</span>;
    },
  },
  {
    accessorKey: "percentage",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:bg-muted/50 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const percentage = row.original.percentage;
      return <span className="ml-1">{percentage.toFixed()}%</span>;
    },
  },
];
