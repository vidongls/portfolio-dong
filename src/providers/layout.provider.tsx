import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '../components/layout/footer'
import SmootherProvider from './smoother.provider'
export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SmootherProvider>
      <Header />
      <main className='pt-20'>
        <div className='container space-y-40'>{children}</div>
      </main>
      <Footer />
    </SmootherProvider>
  )
}
