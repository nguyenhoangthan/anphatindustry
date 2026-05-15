import prisma from '@/lib/prisma'
import { defaultPartnersSection } from '@/lib/defaultContent'
import PartnersForm from '@/components/admin/PartnersForm'

export const dynamic = 'force-dynamic'

export default async function PartnersAdminPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'section_partners' } })
  const data = setting ? JSON.parse(setting.value) : defaultPartnersSection

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#0B2447]">Đối Tác & Số Liệu</h1>
        <p className="text-sm text-gray-500 mt-1">Chỉnh sửa danh sách thương hiệu và các số liệu thống kê.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <PartnersForm initialData={data} />
      </div>
    </div>
  )
}
