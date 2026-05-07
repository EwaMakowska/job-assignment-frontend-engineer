import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
