import { getSection } from '@/lib/content'
import { defaultContactCTA } from '@/lib/defaultContent'
import CTAForm from '@/components/admin/CTAForm'

export const dynamic = 'force-dynamic'

export default async function CTAAdminPage() {
  const data = await getSection('section_contact_cta', defaultContactCTA)

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#0B2447]">Cam Kết & CTA</h1>
        <p className="text-sm text-gray-500 mt-1">Chỉnh sửa banner kêu gọi hành động cuối trang chủ.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <CTAForm initialData={data} />
      </div>
    </div>
  )
}
