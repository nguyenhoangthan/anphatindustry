import { Settings } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import SettingsForm from '@/components/admin/SettingsForm'
import { siteConfig } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export default async function SettingsAdminPage() {
  // Load from DB, merge over constants (đảm bảo luôn đủ field kể cả khi DB cũ thiếu)
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'siteConfig' } }).catch(() => null)
  const db = setting ? JSON.parse(setting.value) : {}
  const currentConfig = {
    name: db.name ?? siteConfig.name,
    shortName: db.shortName ?? siteConfig.shortName,
    tagline: db.tagline ?? siteConfig.tagline,
    description: db.description ?? siteConfig.description,
    url: db.url ?? siteConfig.url,
    phone: Array.isArray(db.phone) && db.phone.length ? db.phone : siteConfig.phone,
    email: db.email ?? siteConfig.email,
    address: db.address ?? siteConfig.address,
    locations: Array.isArray(db.locations) && db.locations.length ? db.locations : siteConfig.locations,
    workingHours: db.workingHours ?? siteConfig.workingHours,
    businessNumber: db.businessNumber ?? siteConfig.businessNumber,
    social: {
      facebook: db.social?.facebook ?? siteConfig.social.facebook ?? '',
      zalo: db.social?.zalo ?? siteConfig.social.zalo ?? '',
      youtube: db.social?.youtube ?? siteConfig.social.youtube ?? '',
    },
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Settings size={20} className="text-[#0B2447]" />
        <div>
          <h1 className="text-2xl font-black text-[#0B2447]">Cài Đặt Website</h1>
          <p className="text-gray-500 text-sm mt-0.5">Thông tin công ty và liên hệ</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-7">
        <SettingsForm initialData={currentConfig} />
      </div>
    </div>
  )
}
