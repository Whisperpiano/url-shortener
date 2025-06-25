import React from "react";

import Background from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";
import Header from "@/components/header";

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
