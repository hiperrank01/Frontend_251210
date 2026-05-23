import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "나인위닛 - 스마트스토어 SEO 최적화 솔루션",
  description: "데이터 기반 스마트스토어 SEO 분석 및 광고 최적화 서비스. 매출 성장을 위한 전문 솔루션을 제공합니다.",
  keywords: "스마트스토어, SEO, 네이버쇼핑, 광고최적화, 키워드분석",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
