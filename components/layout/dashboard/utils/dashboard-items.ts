import { ChartNoAxesCombined, LinkIcon, Settings } from "lucide-react";

export const DASHBOARD_ITEMS = [
  {
    group: "Dashboard",
    items: [
      { title: "Links", url: "/dashboard", icon: LinkIcon },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: ChartNoAxesCombined,
      },
    ],
  },
  {
    group: "Account",
    items: [
      {
        title: "Settings",
        url: "/account/settings",
        icon: Settings,
      },
    ],
  },
];
