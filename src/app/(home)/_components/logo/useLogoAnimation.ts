import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { RefObject } from "react";

type CreateLeafFunction = (
  container: HTMLDivElement,
  leafArray: HTMLDivElement[],
  createWaterSplash: (x: number, y: number) => void,
) => void;

export const useLogoAnimation = (
  logoRef: RefObject<SVGSVGElement>,
  containerRef: RefObject<HTMLDivElement>,
  particles: HTMLDivElement[],
  setIsAnimationComplete: (value: boolean) => void,
  leaves: HTMLDivElement[],
  createLeaf: CreateLeafFunction,
  createWaterSplash: (x: number, y: number) => void,
) => {
  useGSAP(() => {
    if (!logoRef.current) return;

    const paths = gsap.utils.toArray<SVGPathElement>("#logo-path path");
    const mainTl = gsap.timeline();

    // Nhóm path theo từng chữ cái trong tên
    // DONG VI TRUONG
    const D = paths.slice(3, 4);
    const O = paths.slice(2, 3);
    const N = paths.slice(1, 2);
    const G = paths.slice(0, 1);
    const V = paths.slice(11, 12);
    const I = paths.slice(10, 11);
    const T = paths.slice(9, 10);
    const R = paths.slice(8, 9);
    const U = paths.slice(7, 8);
    const O2 = paths.slice(6, 7);
    const N2 = paths.slice(5, 6);
    const G2 = paths.slice(4, 5);

    // Thay đổi thứ tự: VI TRUONG trước, DONG sau - theo thứ tự
    const firstRow = [V, I];
    const secondRow = [T, R, U, O2, N2, G2];
    const thirdRow = [D, O, N, G];

    // Reset ban đầu
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });

    // Thiết lập các path
    [...paths].forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        stroke: "#3C6300",
        strokeWidth: 2,
        fill: "none",
        strokeDasharray: length,
        strokeDashoffset: length,
        filter: "drop-shadow(0 0 3px rgba(132, 204, 22, 0.5))",
      });
    });

    // Hiệu ứng xuất hiện - nhanh hơn
    mainTl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });

    // Vẽ VI trước - theo thứ tự
    firstRow.forEach((char, i) => {
      mainTl.to(
        char,
        {
          strokeDashoffset: 0,
          duration: 0.3, // Nhanh hơn
          ease: "power1.inOut",
        },
        i === 0 ? ">" : "-=0.25", // Overlap nhiều hơn
      );
    });

    // Nghỉ ngắn giữa các phần
    mainTl.to({}, { duration: 0.1 });

    // Vẽ TRUONG sau - theo thứ tự
    secondRow.forEach((char, i) => {
      mainTl.to(
        char,
        {
          strokeDashoffset: 0,
          duration: 0.3, // Nhanh hơn
          ease: "power1.inOut",
        },
        i === 0 ? ">" : "-=0.25", // Overlap nhiều hơn
      );
    });

    // Nghỉ ngắn giữa phần 2 và 3
    mainTl.to({}, { duration: 0.1 });

    // Vẽ DONG sau cùng - theo thứ tự
    thirdRow.forEach((char, i) => {
      mainTl.to(
        char,
        {
          strokeDashoffset: 0,
          duration: 0.4, // Nhanh hơn
          ease: "power1.inOut",
        },
        i === 0 ? ">" : "-=0.25", // Overlap nhiều hơn
      );
    });

    // Loại bỏ drop-shadow trước khi tô màu - nhanh hơn
    mainTl.to(paths, {
      filter: "none",
      duration: 0.2,
    });

    // Thêm hiệu ứng tô màu từ trái sang phải
    mainTl.to(
      paths,
      {
        fill: "#3C6300",
        stroke: "#3C6300",
        strokeWidth: 0.5,
        duration: 0.8, // Nhanh hơn
        stagger: {
          each: 0.02, // Nhanh hơn
          from: "start",
        },
        onComplete: () => {
          setIsAnimationComplete(true);

          // Tạo vài lá ngay khi animation hoàn thành
          setTimeout(() => {
            if (containerRef.current) {
              // Tạo 3-5 lá ban đầu
              const initialLeafCount = Math.floor(Math.random() * 3) + 3;
              for (let i = 0; i < initialLeafCount; i++) {
                setTimeout(() => {
                  createLeaf(containerRef.current!, leaves, createWaterSplash);
                }, i * 200);
              }
            }
          }, 300);
        },
      },
      ">",
    );

    return () => mainTl.kill();
  }, [
    logoRef,
    containerRef,
    particles,
    setIsAnimationComplete,
    leaves,
    createLeaf,
    createWaterSplash,
  ]);
};
