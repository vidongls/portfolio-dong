import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import './globals.css'
import { LayoutProvider } from '../providers/layout.provider'

const InterTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Dong-Portfolio',
  description: 'Vi Truong Dong Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='antialiased will-change-transform'>
      <body
        className={`${InterTight.variable} antialiased will-change-transform`}
      >
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  )
}
