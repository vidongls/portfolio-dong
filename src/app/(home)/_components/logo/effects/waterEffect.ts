import gsap from "@/lib/gsap";

// Tạo hiệu ứng nước bắn khi giọt nước chạm đất
export const createWaterSplash = (x: number, y: number) => {
  const containerRef = document.querySelector('[id^="logo-"]')
    ?.parentElement as HTMLDivElement | null;
  if (!containerRef) return;

  // Tạo 5-10 giọt nước nhỏ bắn ra (tăng số lượng)
  const splashCount = Math.floor(Math.random() * 6) + 5;

  // Tạo vòng tròn nước loang
  const splash = document.createElement("div");
  splash.style.position = "absolute";
  splash.style.left = `${x - 10}px`;
  splash.style.top = `${y - 5}px`;
  splash.style.width = "0px";
  splash.style.height = "0px";
  splash.style.borderRadius = "50%";
  splash.style.border = "2px solid rgba(191, 219, 254, 0.4)";
  splash.style.zIndex = "14";
  splash.style.pointerEvents = "none";

  containerRef.appendChild(splash);

  // Hiệu ứng vòng tròn loang ra
  gsap.to(splash, {
    width: "40px",
    height: "20px",
    left: `${x - 20}px`,
    top: `${y - 10}px`,
    opacity: 0,
    duration: 0.8,
    ease: "power1.out",
    onComplete: () => {
      if (containerRef) {
        containerRef.removeChild(splash);
      }
    },
  });

  // Tạo các giọt nước nhỏ bắn ra
  for (let i = 0; i < splashCount; i++) {
    const droplet = document.createElement("div");
    droplet.style.position = "absolute";
    droplet.style.left = `${x}px`;
    droplet.style.top = `${y}px`;

    // Kích thước đa dạng hơn
    const dropletSize = Math.random() * 4 + 2;
    droplet.style.width = `${dropletSize}px`;
    droplet.style.height = `${dropletSize * 1.5}px`;

    // Hình dạng đa dạng
    if (Math.random() > 0.5) {
      droplet.style.borderRadius = "50%";
    } else {
      droplet.style.borderRadius = "40% 40% 50% 50%";
    }

    // Màu sắc tự nhiên hơn
    const opacity = Math.random() * 0.2 + 0.6;
    droplet.style.backgroundColor = `rgba(191, 219, 254, ${opacity})`;

    // Thêm bóng
    droplet.style.boxShadow = "0px 1px 2px rgba(0, 0, 0, 0.1)";
    droplet.style.zIndex = "15";
    droplet.style.pointerEvents = "none";

    containerRef.appendChild(droplet);

    // Hiệu ứng bắn tung tóe ngẫu nhiên hơn
    const angle = Math.random() * 360;
    const distance = Math.random() * 40 + 10;
    const duration = Math.random() * 0.6 + 0.5;

    gsap.to(droplet, {
      x: Math.cos((angle * Math.PI) / 180) * distance,
      y: Math.sin((angle * Math.PI) / 180) * distance - 15, // Bay cao hơn chút
      opacity: 0,
      duration: duration,
      ease: "power2.out",
      onComplete: () => {
        if (containerRef) {
          containerRef.removeChild(droplet);
        }
      },
    });
  }
};
