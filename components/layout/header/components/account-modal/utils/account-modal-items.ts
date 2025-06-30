import { ChartNoAxesCombined, LayoutDashboard, Settings } from "lucide-react";

export const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "analytics",
    label: "Analytics",
    url: "/dashboard/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    id: "settings",
    label: "Settings",
    url: "/account/settings",
    icon: Settings,
  },
];
