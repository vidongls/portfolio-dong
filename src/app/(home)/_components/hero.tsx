import Image from "next/image";
import React from "react";
import Logo from "./logo/index";

export const HeroSection = () => {
  return (
    <section>
      <div className="py-[120px]">
        <div className="relative flex items-start justify-between">
          {/* <h1 className="text-color-dell-900 text-[128px] leading-tight font-bold uppercase">
            vi truong <br /> dong
          </h1> */}
          {/* <Image src={"/logo.svg"} alt="logo" width={679} height={308} /> */}
          <Logo />
          <div className="text-secondary flex items-center gap-4 text-xl leading-9 font-medium">
            <Image src={"/images/flag.png"} alt="flag" width={40} height={27} />
            <h2> Frontend Developer</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-60">
        <p className="text-secondary text-base leading-5 font-medium">
          Continuous learning and staying updated with the latest trends will be
          key to achieving these goals.
        </p>

        <p className="text-stroke text-[32px] leading-12 italic">
          In the long term, I aspire to specialize in building innovative and
          popular applications for web, mobile, and potentially desktop
          platforms.
        </p>
      </div>
    </section>
  );
};
