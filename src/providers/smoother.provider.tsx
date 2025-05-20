'use client'

import ReactLenis from 'lenis/react'

export default function SmootherProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ReactLenis root>{children}</ReactLenis>
}
