import React from "react";

import Header from "@/components/layout/Header";
import Background from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";

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
