import gsap from '@/lib/gsap'

// Hàm tạo lá rơi
export const createLeaf = (
  containerRef: HTMLDivElement,
  leafArray: HTMLDivElement[],
  createWaterSplash: (x: number, y: number) => void
): HTMLDivElement => {
  if (!containerRef) return null as unknown as HTMLDivElement

  const containerWidth = containerRef.clientWidth
  const containerHeight = containerRef.clientHeight

  const leaf = document.createElement('div')
  leaf.style.position = 'absolute'
  leaf.style.pointerEvents = 'none'
  leaf.style.zIndex = '15' // Tăng z-index để đè lên chữ
  leaf.style.opacity = '0'
  leaf.className = 'leaf-element' // Thêm class để dễ nhận dạng

  // Thêm timestamp để xử lý cleanup các phần tử quá cũ
  leaf.dataset.createTime = Date.now().toString()

  // Tạo hình dạng lá ngẫu nhiên
  const leafType = Math.floor(Math.random() * 5) // Thêm loại lá và giọt nước

  if (leafType === 0) {
    // Lá hình elip - xanh
    leaf.style.width = `${Math.random() * 10 + 15}px`
    leaf.style.height = `${Math.random() * 5 + 10}px`
    leaf.style.borderRadius = '50%'
    leaf.style.backgroundColor = `rgba(101, 163, 13, ${Math.random() * 0.3 + 0.4})`
  } else if (leafType === 1) {
    // Lá hình maple - xanh
    leaf.style.width = `${Math.random() * 10 + 15}px`
    leaf.style.height = `${Math.random() * 10 + 15}px`
    leaf.style.backgroundColor = 'transparent'
    leaf.style.borderRadius = '0% 75% 0% 75%'
    leaf.style.transform = 'rotate(45deg)'
    leaf.style.backgroundImage =
      'radial-gradient(circle, #84CC16 0%, #4d7c00 100%)'
  } else if (leafType === 2) {
    // Lá hình giọt nước - xanh
    leaf.style.width = `${Math.random() * 8 + 10}px`
    leaf.style.height = `${Math.random() * 12 + 15}px`
    leaf.style.borderRadius = '0% 50% 50% 50%'
    leaf.style.backgroundColor = `rgba(132, 204, 22, ${Math.random() * 0.3 + 0.4})`
    leaf.style.transform = `rotate(${Math.random() * 360}deg)`
  } else if (leafType === 3) {
    // Lá vàng - thêm màu vàng
    const leafShape = Math.floor(Math.random() * 3)
    if (leafShape === 0) {
      // Lá hình elip - vàng
      leaf.style.width = `${Math.random() * 10 + 15}px`
      leaf.style.height = `${Math.random() * 5 + 10}px`
      leaf.style.borderRadius = '50%'
      leaf.style.backgroundColor = `rgba(234, 179, 8, ${Math.random() * 0.3 + 0.4})`
    } else if (leafShape === 1) {
      // Lá hình maple - vàng
      leaf.style.width = `${Math.random() * 10 + 15}px`
      leaf.style.height = `${Math.random() * 10 + 15}px`
      leaf.style.backgroundColor = 'transparent'
      leaf.style.borderRadius = '0% 75% 0% 75%'
      leaf.style.transform = 'rotate(45deg)'
      leaf.style.backgroundImage =
        'radial-gradient(circle, #FCD34D 0%, #CA8A04 100%)'
    } else {
      // Lá hình giọt nước - vàng
      leaf.style.width = `${Math.random() * 8 + 10}px`
      leaf.style.height = `${Math.random() * 12 + 15}px`
      leaf.style.borderRadius = '0% 50% 50% 50%'
      leaf.style.backgroundColor = `rgba(234, 179, 8, ${Math.random() * 0.3 + 0.4})`
      leaf.style.transform = `rotate(${Math.random() * 360}deg)`
    }
  } else {
    // Giọt nước - thiết kế lại hoàn toàn để giống nước thật hơn
    const dropSize = Math.random()
    leaf.className = 'water-drop-element' // Thêm class riêng cho giọt nước

    if (dropSize < 0.7) {
      // Giọt nước nhỏ và trung bình (70%)
      leaf.style.width = `${Math.random() * 8 + 8}px`
      leaf.style.height = `${Math.random() * 8 + 8}px`
    } else {
      // Giọt nước to (30%)
      leaf.style.width = `${Math.random() * 12 + 12}px`
      leaf.style.height = `${Math.random() * 12 + 12}px`
    }

    // Hoàn toàn tròn - giọt nước thật
    leaf.style.borderRadius = '50%'

    // Màu trong suốt, độ trong cao
    const opacity = Math.random() * 0.15 + 0.75 // 0.75-0.9 - rất trong suốt

    // Gần như trong suốt, màu trắng
    const baseColor = `rgba(255, 255, 255, ${opacity})`

    // Gradient tròn để tạo hiệu ứng khúc xạ ánh sáng trong giọt nước
    leaf.style.background = `radial-gradient(
      circle at 35% 35%, 
      rgba(255, 255, 255, 0.9) 0%, 
      rgba(255, 255, 255, 0.6) 20%, 
      ${baseColor} 50%, 
      rgba(210, 230, 255, ${opacity - 0.1}) 80%
    )`

    // Viền mỏng để tạo cảm giác về sự căng bề mặt của nước
    leaf.style.border = '1px solid rgba(255, 255, 255, 0.3)'

    // Bóng đổ và hiệu ứng thủy tinh cho giọt nước
    leaf.style.boxShadow = `
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 0 10px rgba(255, 255, 255, 0.2),
      inset 0 0 8px rgba(255, 255, 255, 0.4)
    `

    // Thêm filter để tạo hiệu ứng khúc xạ và phản chiếu
    leaf.style.filter = 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.15))'

    // Thêm backdrop filter cho hiệu ứng mờ phía sau
    if (Math.random() > 0.5) {
      leaf.style.backdropFilter = 'blur(1px)'
    }
  }

  // Vị trí xuất hiện hoàn toàn ngẫu nhiên trong phạm vi container
  const appearType = Math.random()

  if (appearType < 0.7) {
    // 70% xuất hiện ngẫu nhiên ở BẤT KỲ ĐÂU trong container
    leaf.style.left = `${Math.random() * containerWidth}px`
    leaf.style.top = `${Math.random() * containerHeight}px`
  } else if (appearType < 0.85) {
    // 15% từ trên xuống
    leaf.style.left = `${Math.random() * containerWidth}px`
    leaf.style.top = '-20px'
  } else {
    // 15% từ các cạnh
    const side = Math.floor(Math.random() * 2)
    if (side === 0) {
      // Từ trái
      leaf.style.left = '-20px'
      leaf.style.top = `${Math.random() * containerHeight}px`
    } else {
      // Từ phải
      leaf.style.left = `${containerWidth + 20}px`
      leaf.style.top = `${Math.random() * containerHeight}px`
    }
  }

  containerRef.appendChild(leaf)
  leafArray.push(leaf)

  // Animation rơi - thêm hiệu ứng scale từ nhỏ đến lớn khi hiện
  gsap.to(leaf, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: 'power1.out',
  })

  // Chỉnh quỹ đạo rơi ngẫu nhiên - giọt nước rơi nhanh và thẳng hơn
  const isWaterDrop = leafType === 4
  gsap.to(leaf, {
    y: '+=' + (Math.random() * containerHeight + 50),
    x:
      '+=' +
      (Math.random() * (isWaterDrop ? 100 : 200) - (isWaterDrop ? 50 : 100)), // Giọt nước ít bay ngang hơn
    rotation:
      Math.random() * (isWaterDrop ? 90 : 720) - (isWaterDrop ? 45 : 360), // Giọt nước ít xoay hơn
    duration: Math.random() * (isWaterDrop ? 2 : 3) + (isWaterDrop ? 3 : 3), // Nhanh hơn nữa
    ease: isWaterDrop ? 'power3.in' : 'power1.in', // Giọt nước rơi với gia tốc mạnh hơn
    onComplete: () => {
      try {
        if (containerRef && containerRef.contains(leaf)) {
          // Hiệu ứng giọt nước vỡ ra
          if (isWaterDrop) {
            createWaterSplash(
              parseFloat(leaf.style.left),
              parseFloat(leaf.style.top)
            )
          }

          // Xóa khỏi DOM
          containerRef.removeChild(leaf)

          // Xóa khỏi mảng quản lý
          const index = leafArray.indexOf(leaf)
          if (index > -1) {
            leafArray.splice(index, 1)
          }
        }
      } catch (error) {
        // Safely handle any errors during cleanup
        console.debug('Animation cleanup error handled gracefully')

        // Still try to remove from array if possible
        const index = leafArray.indexOf(leaf)
        if (index > -1) {
          leafArray.splice(index, 1)
        }
      }
    },
  })

  // Định kỳ dọn dẹp DOM
  if (Math.random() < 0.5) {
    // Tăng xác suất gọi cleanup từ 30% lên 50%
    // Chỉ chạy với xác suất 50% để không gây tải nặng
    cleanupLeafArray(containerRef, leafArray)
  }

  return leaf
}

// Biến lưu thời điểm lần cuối thực hiện cleanup toàn diện
let lastFullCleanupTime = 0

// Hàm dọn dẹp mảng lá và DOM
const cleanupLeafArray = (
  containerRef: HTMLDivElement,
  leafArray: HTMLDivElement[]
) => {
  if (!containerRef) return

  const now = Date.now()

  // Xóa các phần tử không còn trong DOM khỏi mảng
  for (let i = leafArray.length - 1; i >= 0; i--) {
    const leaf = leafArray[i]
    try {
      if (!containerRef.contains(leaf)) {
        leafArray.splice(i, 1)
      }
    } catch (error) {
      // Safety - remove from array if any error occurs
      leafArray.splice(i, 1)
      console.debug('Leaf array cleanup error handled gracefully')
    }
  }

  // Thực hiện cleanup cơ bản mỗi lần gọi
  // và cleanup toàn diện mỗi 5 giây
  const shouldDoFullCleanup = now - lastFullCleanupTime > 5000

  if (shouldDoFullCleanup) {
    lastFullCleanupTime = now

    // Xóa các phần tử lá và giọt nước không còn hiển thị hoặc nằm ngoài vùng nhìn
    const containerRect = containerRef.getBoundingClientRect()
    const maxVisibleElements = 40 // Giảm số lượng phần tử tối đa hiển thị

    // Nâng cao hiệu suất bằng cách dọn dẹp cả các phần tử nước khác
    // Lấy tất cả các phần tử lá, giọt nước và hiệu ứng nước
    const allEffectElements = containerRef.querySelectorAll(
      '.leaf-element, .water-drop-element, .water-splash-element, .water-droplet-element'
    )

    // Lọc ra các phần tử quá cũ (> 10s) hoặc nằm ngoài viewport
    const elementsToRemove: HTMLElement[] = []

    allEffectElements.forEach((element: Element) => {
      const htmlElement = element as HTMLElement

      // Kiểm tra tuổi của phần tử
      let isOld = false
      if (htmlElement.dataset.createTime) {
        const createTime = parseInt(htmlElement.dataset.createTime)
        const lifespan = now - createTime
        isOld = lifespan > 8000 // 8 seconds
      } else {
        // Nếu không có timestamp, coi như phần tử cũ và thêm timestamp
        htmlElement.dataset.createTime = now.toString()
        // Không đánh dấu là cũ ngay, cho nó cơ hội tồn tại
      }

      // Kiểm tra vị trí của phần tử
      let isOutsideViewport = false
      try {
        const rect = htmlElement.getBoundingClientRect()
        isOutsideViewport =
          rect.right < containerRect.left - 100 ||
          rect.left > containerRect.right + 100 ||
          rect.bottom < containerRect.top - 100 ||
          rect.top > containerRect.bottom + 100
      } catch (e) {
        // Nếu có lỗi khi lấy vị trí, coi như nằm ngoài viewport
        isOutsideViewport = true
      }

      // Kiểm tra độ trong suốt
      let isInvisible = false
      try {
        const computedStyle = window.getComputedStyle(htmlElement)
        const opacity = parseFloat(computedStyle.opacity)
        isInvisible = opacity <= 0.1
      } catch (e) {
        // Nếu có lỗi khi lấy opacity, coi như không nhìn thấy được
        isInvisible = true
      }

      // Nếu phần tử cũ, hoặc nằm ngoài viewport, hoặc không nhìn thấy được, xóa nó
      if (isOld || isOutsideViewport || isInvisible) {
        elementsToRemove.push(htmlElement)
      }
    })

    // Xóa tất cả các phần tử phù hợp với tiêu chí
    elementsToRemove.forEach((element) => {
      try {
        if (containerRef && containerRef.contains(element)) {
          containerRef.removeChild(element)

          // Xóa khỏi mảng leafArray nếu có
          const index = leafArray.indexOf(element as HTMLDivElement)
          if (index > -1) {
            leafArray.splice(index, 1)
          }
        }
      } catch (error) {
        // Ignore errors - element might have been removed by another process
        console.debug('Element cleanup error handled gracefully')
      }
    })

    // Nếu vẫn còn quá nhiều phần tử, xóa bớt các phần tử cũ nhất
    if (allEffectElements.length > maxVisibleElements) {
      // Lấy danh sách các phần tử tính theo thời gian tạo
      const elementsWithTimestamps = Array.from(allEffectElements)
        .map((el) => ({
          element: el as HTMLElement,
          createTime: parseInt((el as HTMLElement).dataset.createTime || '0'),
        }))
        .sort((a, b) => a.createTime - b.createTime) // Sắp xếp tăng dần theo thời gian tạo

      // Xóa các phần tử cũ nhất cho đến khi số lượng giảm xuống dưới ngưỡng
      const countToRemove = allEffectElements.length - maxVisibleElements
      elementsWithTimestamps.slice(0, countToRemove).forEach((item) => {
        try {
          if (containerRef && containerRef.contains(item.element)) {
            containerRef.removeChild(item.element)

            // Xóa khỏi mảng leafArray nếu có
            const index = leafArray.indexOf(item.element as HTMLDivElement)
            if (index > -1) {
              leafArray.splice(index, 1)
            }
          }
        } catch (error) {
          // Ignore errors - element might have been removed by another process
          console.debug('Element cleanup error handled gracefully')
        }
      })
    }
  }
}
