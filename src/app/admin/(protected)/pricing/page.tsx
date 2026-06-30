import { prisma } from '@/lib/prisma'
import { defaultPricingPackages } from '@/lib/defaultContent'
import PricingForm from '@/components/admin/PricingForm'

export const dynamic = 'force-dynamic'

export default async function PricingAdminPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'section_pricing' } })
  const data = setting ? JSON.parse(setting.value) : defaultPricingPackages

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#0B2447]">Báo Giá</h1>
        <p className="text-sm text-gray-500 mt-1">Chỉnh sửa các gói dịch vụ và bảng giá.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <PricingForm initialData={data} />
      </div>
    </div>
  )
}
