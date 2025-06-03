import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EVM-7702 Aggregator',
  description: '通过拖拽方式组合多个交易模块，构建复杂的链上交易流程',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
