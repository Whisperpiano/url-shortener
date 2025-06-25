import React from "react";

import Header from "@/components/layout/header/header";
import Background from "@/components/background";
import Footer from "@/components/layout/footer/footer";

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
      <Footer />
    </>
  );
}
