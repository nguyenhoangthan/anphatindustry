import { getSection } from '@/lib/content'
import { defaultProcessSteps } from '@/lib/defaultContent'
import ProcessForm from '@/components/admin/ProcessForm'

export const dynamic = 'force-dynamic'

export default async function ProcessAdminPage() {
  const data = await getSection('section_process', defaultProcessSteps)

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#0B2447]">Quy Trình Dịch Vụ</h1>
        <p className="text-sm text-gray-500 mt-1">Chỉnh sửa 6 bước quy trình dịch vụ.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <ProcessForm initialData={data} />
      </div>
    </div>
  )
}
