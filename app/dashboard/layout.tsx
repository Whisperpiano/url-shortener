import React from "react";
import DashboardNav from "@/components/layout/DashboardNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <>
      <main>
        <DashboardNav />

        {props.children}
      </main>
    </>
  );
}
