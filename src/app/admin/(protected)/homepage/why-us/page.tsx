import { prisma } from '@/lib/prisma'
import { defaultWhyChooseUs } from '@/lib/defaultContent'
import WhyUsForm from '@/components/admin/WhyUsForm'

export const dynamic = 'force-dynamic'

export default async function WhyUsAdminPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'section_why_us' } })
  const data = setting ? JSON.parse(setting.value) : defaultWhyChooseUs

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#0B2447]">Tại Sao Chọn Chúng Tôi</h1>
        <p className="text-sm text-gray-500 mt-1">Chỉnh sửa 4 giá trị cốt lõi hiển thị trên trang chủ.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <WhyUsForm initialData={data} />
      </div>
    </div>
  )
}
