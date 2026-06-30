import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingContact from '@/components/shared/FloatingContact'
import ScrollToTop from '@/components/shared/ScrollToTop'
import SeasonProvider from '@/components/shared/SeasonProvider'
import { siteConfig } from '@/lib/constants'
import { getActiveSeason } from '@/lib/season'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'bảo dưỡng ô tô',
    'sửa chữa ô tô',
    'chăm sóc ô tô',
    'đồng sơn ô tô',
    'mô hình đào tạo ô tô',
    'thiết bị đào tạo kỹ thuật ô tô',
    'thiết bị chẩn đoán ô tô',
    'sửa chữa xe điện',
    'garage ô tô TP HCM',
    'An Phát Industry',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} – ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} – ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const season = getActiveSeason()

  return (
    <html lang="vi" data-season={season}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SeasonProvider initialSeason={season}>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingContact />
          <ScrollToTop />
        </SeasonProvider>
      </body>
    </html>
  )
}
