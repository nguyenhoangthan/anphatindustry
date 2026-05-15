import { prisma } from '@/lib/prisma'
import { defaultAboutSection } from '@/lib/defaultContent'
import AboutHomepageForm from '@/components/admin/AboutHomepageForm'

export const dynamic = 'force-dynamic'

export default async function AboutAdminPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'section_about_home' } })
  const data = setting ? JSON.parse(setting.value) : defaultAboutSection

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#0B2447]">Giới Thiệu (Trang Chủ)</h1>
        <p className="text-sm text-gray-500 mt-1">Chỉnh sửa section giới thiệu công ty ở trang chủ.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <AboutHomepageForm initialData={data} />
      </div>
    </div>
  )
}
