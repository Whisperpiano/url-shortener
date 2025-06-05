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

import { usePathname } from "next/navigation";

import { DASHBOARD_ITEMS } from "../utils/dashboard-items";

import Link from "next/link";
import Logo from "../../logo";
import StorageUsage from "./storage-usage";

export default function DashboardSidebar({
  linkCount,
  limit,
}: {
  linkCount: number;
  limit: number;
}) {
  const pathname = usePathname();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
      <SidebarHeader className="max-h-[85px] h-full border-b flex items-start justify-center px-4 ">
        <Logo />
      </SidebarHeader>

      <SidebarContent className="animate-fade-in-right">
        {DASHBOARD_ITEMS.map((item) => (
          <SidebarGroup key={item.group}>
            <SidebarGroupLabel>{item.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url} className="group/icon" prefetch>
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

      <SidebarFooter className="border-t border-muted-foreground/20 py-6 ">
        <StorageUsage linkCount={linkCount} limit={limit} />
      </SidebarFooter>
    </Sidebar>
  );
}
