import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "../components/layout/footer";
export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  );
};
