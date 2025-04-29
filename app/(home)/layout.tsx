import React from "react";
import Background from "@/components/layout/Background";
import Header from "@/components/layout/Header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Background />
      <Header />
      {children}
    </>
  );
}
