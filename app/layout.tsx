import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'remixicon/fonts/remixicon.css'
import { Providers } from './providers'
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PathTx',
  description: 'Build complex transaction flows by combining multiple transaction modules through drag and drop',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Analytics/>
      </body>
    </html>
  )
}
