'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import FloatingContact from '@/components/shared/FloatingContact'
import ScrollToTop from '@/components/shared/ScrollToTop'
import type { SiteConfig } from '@/types'

/**
 * Bọc giao diện public (Header/Footer/nút nổi). Ẩn hoàn toàn trên khu vực
 * /admin để không đè lên giao diện quản trị.
 */
export default function SiteChrome({
  config,
  children,
}: {
  config: SiteConfig
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <>
      <Header config={config} />
      <main>{children}</main>
      <Footer config={config} />
      <FloatingContact />
      <ScrollToTop />
    </>
  )
}
