import { Settings } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import SettingsForm from '@/components/admin/SettingsForm'
import { siteConfig } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export default async function SettingsAdminPage() {
  // Load from DB, fallback to constants
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'siteConfig' } }).catch(() => null)
  const currentConfig = setting
    ? JSON.parse(setting.value)
    : {
        name: siteConfig.name,
        shortName: siteConfig.shortName,
        tagline: siteConfig.tagline,
        description: siteConfig.description,
        url: siteConfig.url,
        phone: siteConfig.phone,
        email: siteConfig.email,
        address: siteConfig.address,
        workingHours: siteConfig.workingHours,
        businessNumber: siteConfig.businessNumber,
        social: {
          facebook: siteConfig.social.facebook ?? '',
          zalo: siteConfig.social.zalo ?? '',
          youtube: siteConfig.social.youtube ?? '',
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
