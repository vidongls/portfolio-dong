import gsap from '@/lib/gsap'

// Tạo hiệu ứng nước bắn khi giọt nước chạm đất
export const createWaterSplash = (x: number, y: number) => {
  const containerRef = document.querySelector('[id^="logo-"]')
    ?.parentElement as HTMLDivElement | null
  if (!containerRef) return

  // Tăng số lượng giọt nước văng ra khi giọt nước vỡ
  const splashCount = Math.floor(Math.random() * 8) + 7

  // Tạo vòng tròn nước loang
  const splash = document.createElement('div')
  splash.style.position = 'absolute'
  splash.style.left = `${x - 10}px`
  splash.style.top = `${y - 5}px`
  splash.style.width = '0px'
  splash.style.height = '0px'
  splash.style.borderRadius = '50%'
  splash.style.border = '2px solid rgba(191, 219, 254, 0.4)'
  splash.style.zIndex = '14'
  splash.style.pointerEvents = 'none'
  splash.classList.add('water-splash-element')
  splash.dataset.createTime = Date.now().toString()

  containerRef.appendChild(splash)

  // Safety timeout to ensure element gets removed even if animation fails
  const splashTimeout = setTimeout(() => {
    try {
      if (containerRef && containerRef.contains(splash)) {
        containerRef.removeChild(splash)
      }
    } catch (error) {
      console.debug('Water splash cleanup error handled gracefully')
    }
  }, 2000) // 2 seconds should be enough for this animation

  // Hiệu ứng vòng tròn loang ra - làm lớn hơn và chậm hơn
  gsap.to(splash, {
    width: '50px',
    height: '25px',
    left: `${x - 25}px`,
    top: `${y - 12.5}px`,
    opacity: 0,
    duration: 1.0, // Tăng thời gian
    ease: 'power1.out',
    onComplete: () => {
      try {
        clearTimeout(splashTimeout)
        if (containerRef && containerRef.contains(splash)) {
          containerRef.removeChild(splash)
        }
      } catch (error) {
        console.debug('Water splash animation cleanup error handled gracefully')
      }
    },
  })

  // Thêm hiệu ứng vòng tròn thứ hai loang ra để tạo cảm giác nhiều lớp
  const splash2 = document.createElement('div')
  splash2.style.position = 'absolute'
  splash2.style.left = `${x - 15}px`
  splash2.style.top = `${y - 7.5}px`
  splash2.style.width = '0px'
  splash2.style.height = '0px'
  splash2.style.borderRadius = '50%'
  splash2.style.border = '1px solid rgba(191, 219, 254, 0.5)'
  splash2.style.zIndex = '14'
  splash2.style.pointerEvents = 'none'
  splash2.classList.add('water-splash-element')
  splash2.dataset.createTime = Date.now().toString()

  containerRef.appendChild(splash2)

  const splash2Timeout = setTimeout(() => {
    try {
      if (containerRef && containerRef.contains(splash2)) {
        containerRef.removeChild(splash2)
      }
    } catch (error) {
      console.debug('Water splash2 cleanup error handled gracefully')
    }
  }, 2500)

  gsap.to(splash2, {
    width: '60px',
    height: '30px',
    left: `${x - 30}px`,
    top: `${y - 15}px`,
    opacity: 0,
    duration: 1.2,
    delay: 0.1,
    ease: 'power1.out',
    onComplete: () => {
      try {
        clearTimeout(splash2Timeout)
        if (containerRef && containerRef.contains(splash2)) {
          containerRef.removeChild(splash2)
        }
      } catch (error) {
        console.debug(
          'Water splash2 animation cleanup error handled gracefully'
        )
      }
    },
  })

  // Tạo hiệu ứng tung tóe mờ - làm nổi bật sự vỡ tan
  const splashEffect = document.createElement('div')
  splashEffect.style.position = 'absolute'
  splashEffect.style.left = `${x - 15}px`
  splashEffect.style.top = `${y - 15}px`
  splashEffect.style.width = '30px'
  splashEffect.style.height = '30px'
  splashEffect.style.borderRadius = '50%'
  splashEffect.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
  splashEffect.style.zIndex = '13'
  splashEffect.style.pointerEvents = 'none'
  splashEffect.style.transform = 'scale(0.1)'
  splashEffect.classList.add('water-splash-element')
  splashEffect.dataset.createTime = Date.now().toString()

  containerRef.appendChild(splashEffect)

  const splashEffectTimeout = setTimeout(() => {
    try {
      if (containerRef && containerRef.contains(splashEffect)) {
        containerRef.removeChild(splashEffect)
      }
    } catch (error) {
      console.debug('Water splash effect cleanup error handled gracefully')
    }
  }, 1500)

  gsap.to(splashEffect, {
    scale: 1,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.out',
    onComplete: () => {
      try {
        clearTimeout(splashEffectTimeout)
        if (containerRef && containerRef.contains(splashEffect)) {
          containerRef.removeChild(splashEffect)
        }
      } catch (error) {
        console.debug(
          'Water splash effect animation cleanup error handled gracefully'
        )
      }
    },
  })

  // Tạo các giọt nước nhỏ bắn ra
  for (let i = 0; i < splashCount; i++) {
    const droplet = document.createElement('div')
    droplet.style.position = 'absolute'
    droplet.style.left = `${x}px`
    droplet.style.top = `${y}px`
    droplet.classList.add('water-droplet-element')
    droplet.dataset.createTime = Date.now().toString()

    // Kích thước đa dạng hơn
    const dropletSize = Math.random() * 4 + 2
    droplet.style.width = `${dropletSize}px`
    droplet.style.height = `${dropletSize * 1.5}px`

    // Hình dạng đa dạng
    if (Math.random() > 0.4) {
      // Tăng tỉ lệ giọt tròn
      droplet.style.borderRadius = '50%'
    } else {
      droplet.style.borderRadius = '40% 40% 50% 50%'
    }

    // Màu sắc tự nhiên hơn
    const opacity = Math.random() * 0.3 + 0.6 // Tăng độ trong suốt
    droplet.style.backgroundColor = `rgba(191, 219, 254, ${opacity})`

    // Thêm bóng
    droplet.style.boxShadow = '0px 1px 2px rgba(0, 0, 0, 0.1)'
    droplet.style.zIndex = '15'
    droplet.style.pointerEvents = 'none'

    containerRef.appendChild(droplet)

    // Safety timeout to ensure element gets removed even if animation fails
    const dropletTimeout = setTimeout(() => {
      try {
        if (containerRef && containerRef.contains(droplet)) {
          containerRef.removeChild(droplet)
        }
      } catch (error) {
        console.debug('Water droplet cleanup error handled gracefully')
      }
    }, 2000) // 2 seconds should be enough for this animation

    // Hiệu ứng bắn tung tóe ngẫu nhiên hơn
    const angle = Math.random() * 360
    const distance = Math.random() * 60 + 20 // Tăng khoảng cách bắn
    const duration = Math.random() * 0.6 + 0.5

    gsap.to(droplet, {
      x: Math.cos((angle * Math.PI) / 180) * distance,
      y: Math.sin((angle * Math.PI) / 180) * distance - 15, // Bay cao hơn chút
      opacity: 0,
      duration: duration,
      ease: 'power2.out',
      onComplete: () => {
        try {
          clearTimeout(dropletTimeout)
          if (containerRef && containerRef.contains(droplet)) {
            containerRef.removeChild(droplet)
          }
        } catch (error) {
          console.debug(
            'Water droplet animation cleanup error handled gracefully'
          )
        }
      },
    })
  }

  // Thêm các mảnh nước vỡ bắn ra xa hơn
  const fragmentCount = Math.floor(Math.random() * 5) + 3
  for (let i = 0; i < fragmentCount; i++) {
    const fragment = document.createElement('div')
    fragment.style.position = 'absolute'
    fragment.style.left = `${x}px`
    fragment.style.top = `${y}px`
    fragment.classList.add('water-fragment-element')
    fragment.dataset.createTime = Date.now().toString()

    // Kích thước nhỏ hơn giọt nước
    const fragmentSize = Math.random() * 2 + 1
    fragment.style.width = `${fragmentSize}px`
    fragment.style.height = `${fragmentSize}px`

    // Mảnh vỡ có dạng bất kỳ
    if (Math.random() > 0.6) {
      fragment.style.borderRadius = '50%'
    } else if (Math.random() > 0.3) {
      fragment.style.borderRadius = '30% 70%'
    } else {
      fragment.style.borderRadius = '0'
    }

    const opacity = Math.random() * 0.4 + 0.4
    fragment.style.backgroundColor = `rgba(221, 241, 249, ${opacity})`

    fragment.style.zIndex = '15'
    fragment.style.pointerEvents = 'none'

    containerRef.appendChild(fragment)

    const fragmentTimeout = setTimeout(() => {
      try {
        if (containerRef && containerRef.contains(fragment)) {
          containerRef.removeChild(fragment)
        }
      } catch (error) {
        console.debug('Water fragment cleanup error handled gracefully')
      }
    }, 2000)

    // Bắn xa hơn và nhanh hơn
    const angle = Math.random() * 360
    const distance = Math.random() * 80 + 40
    const duration = Math.random() * 0.5 + 0.3

    gsap.to(fragment, {
      x: Math.cos((angle * Math.PI) / 180) * distance,
      y: Math.sin((angle * Math.PI) / 180) * distance,
      opacity: 0,
      duration: duration,
      ease: 'power3.out',
      onComplete: () => {
        try {
          clearTimeout(fragmentTimeout)
          if (containerRef && containerRef.contains(fragment)) {
            containerRef.removeChild(fragment)
          }
        } catch (error) {
          console.debug(
            'Water fragment animation cleanup error handled gracefully'
          )
        }
      },
    })
  }
}
