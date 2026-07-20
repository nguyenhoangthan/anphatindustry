import { GraduationCap } from 'lucide-react'
import { getSection } from '@/lib/content'
import ModelsForm from '@/components/admin/ModelsForm'
import { modelCategories } from '@/data/models'

export const dynamic = 'force-dynamic'

export default async function ModelsAdminPage() {
  const data = await getSection('section_models', modelCategories)

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <GraduationCap size={20} className="text-[#0B2447]" />
        <div>
          <h1 className="text-2xl font-black text-[#0B2447]">Mô Hình Đào Tạo</h1>
          <p className="text-gray-500 text-sm mt-0.5">Thiết bị đào tạo kỹ thuật & thiết bị kiểm tra chẩn đoán</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
        <ModelsForm initialData={data} />
      </div>
    </div>
  )
}
