import { prisma } from '@/lib/prisma'
import { defaultHeroSlides } from '@/lib/defaultContent'
import HeroForm from '@/components/admin/HeroForm'

export const dynamic = 'force-dynamic'

export default async function HeroAdminPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'section_hero' } })
  const data = setting ? JSON.parse(setting.value) : defaultHeroSlides

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#0B2447]">Hero Slider</h1>
        <p className="text-sm text-gray-500 mt-1">Chỉnh sửa các slide banner đầu trang chủ.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <HeroForm initialData={data} />
      </div>
    </div>
  )
}
