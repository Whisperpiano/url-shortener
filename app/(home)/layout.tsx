import React from "react";

import Header from "@/components/header";
import Background from "@/components/background";
import Footer from "@/components/footer";

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
