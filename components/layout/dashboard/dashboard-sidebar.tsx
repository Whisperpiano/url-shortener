"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Send,
  Settings,
  Bug,
  ChartNoAxesCombined,
  Link as LinkIcon,
} from "lucide-react";

import { FaLink } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
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
    group: "Support",
    items: [
      { title: "Report a bug", url: "#", icon: Bug },
      { title: "Contact", url: "#", icon: Send },
    ],
  },
  {
    group: "Account",
    items: [{ title: "Settings", url: "/account/settings", icon: Settings }],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4  ">
        <Link
          href={"/"}
          className="flex items-center gap-2 hover:opacity-85 transition-opacity duration-200"
        >
          <FaLink />
          <h1 className="font-mono tracking-widest font-medium text-base">
            Shortly
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {items.map((item) => (
          <SidebarGroup key={item.group}>
            <SidebarGroupLabel>{item.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url} className="group/icon">
                        <item.icon className="group-hover/icon:animate-jello" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>culo</SidebarFooter>
    </Sidebar>
  );
}
