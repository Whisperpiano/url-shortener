"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ChartNoAxesCombined, Link as LinkIcon, Settings } from "lucide-react";

import Link from "next/link";

const dashboardItems = [
  { href: "/dashboard", label: "Links", icon: LinkIcon },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: ChartNoAxesCombined,
  },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav className="border-b border-b-muted py-6 max-w-7xl mx-auto px-4">
      <ul className="flex gap-2 items-center">
        {dashboardItems.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                "flex gap-1 items-center text-sm hover:bg-muted-foreground/15 px-3 py-1.5 rounded transition-colors duration-200 group text-muted-foreground hover:text-accent-foreground",
                pathname === href &&
                  "dark:bg-blue-900/50 dark:text-blue-200 bg-blue-100/50 text-blue-800 dark:hover:bg-blue-900/80 hover:bg-blue-100/80"
              )}
            >
              <Icon size={15} className={cn("group-hover:animate-jello")} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
