"use client";

import { useEffect } from "react";

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Dynamically import ScrollSmoother only on client
    import("gsap/ScrollSmoother").then(({ ScrollSmoother }) => {
      const smoother = ScrollSmoother.create({
        smooth: 1.5,
        effects: true,
      });

      // Cleanup
      return () => {
        smoother.kill();
      };
    });
  }, []);

  return <>{children}</>;
};
