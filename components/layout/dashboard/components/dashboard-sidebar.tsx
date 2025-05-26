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

import { Link as LinkIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DASHBOARD_ITEMS } from "../utils/dashboard-items";

import Link from "next/link";
import Logo from "../../logo";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
      <SidebarHeader className="max-h-[85px] h-full border-b flex items-start justify-center px-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        {DASHBOARD_ITEMS.map((item) => (
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
      <SidebarFooter className="border-t border-muted-foreground/20 py-6">
        <span className="text-sm text-muted-foreground">
          Storage usage &gt;
        </span>
        <div className="flex items-center justify-between text-sm text-accent-foreground">
          <span className="inline-flex items-center gap-1">
            <LinkIcon size={14} />
            Links
          </span>
          <div className="flex items-center gap-1.5 text-accent-foreground">
            <span>4 of 25</span>
            <span className="text-accent-foreground/50">
              ({(4 / 25) * 100}%)
            </span>
          </div>
        </div>
        <Progress value={(4 / 25) * 100} />
        <Button variant="default" className="cursor-pointer">
          Get Shortly Pro
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
