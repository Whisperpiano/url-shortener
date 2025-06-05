import React from "react";
import DashboardSidebar from "@/components/layout/dashboard/components/dashboard-sidebar";

import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import { getLinks } from "@/lib/queries/links";
import { getSettings } from "@/lib/queries/settings";
import { ThemeProvider } from "@/components/theme-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  const links = await getLinks();
  const { limit } = await getSettings();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider defaultOpen={true}>
        <DashboardSidebar linkCount={links.length} limit={limit || 25} />
        {children}
      </SidebarProvider>
    </ThemeProvider>
  );
}
