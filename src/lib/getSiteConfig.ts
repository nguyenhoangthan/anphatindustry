import { prisma } from './prisma'
import { siteConfig as fallback } from './constants'
import type { SiteConfig } from '@/types'

/**
 * Lấy cấu hình site: ưu tiên giá trị admin lưu trong DB (key 'siteConfig'),
 * trộn lên trên giá trị mặc định trong constants.ts. Luôn an toàn nhờ fallback.
 * Dùng cho Header/Footer/Liên hệ... để trang Cài Đặt thực sự điều khiển site.
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const s = await prisma.siteSetting.findUnique({ where: { key: 'siteConfig' } })
    if (!s) return fallback
    const db = JSON.parse(s.value) as Partial<SiteConfig>
    return {
      ...fallback,
      ...db,
      social: { ...fallback.social, ...(db.social || {}) },
      phone: Array.isArray(db.phone) && db.phone.length ? db.phone : fallback.phone,
      locations:
        Array.isArray(db.locations) && db.locations.length ? db.locations : fallback.locations,
    }
  } catch {
    return fallback
  }
}
