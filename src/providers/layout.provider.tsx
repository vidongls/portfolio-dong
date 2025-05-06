import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "../components/layout/footer";
export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main id="smooth-wrapper">
        <div id="smooth-content" className="container">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};
