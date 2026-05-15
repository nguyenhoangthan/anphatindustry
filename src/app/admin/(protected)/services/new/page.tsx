import { Wrench } from 'lucide-react'
import ServiceForm from '@/components/admin/ServiceForm'

export default function NewServicePage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Wrench size={20} className="text-[#0B2447]" />
        <div>
          <h1 className="text-2xl font-black text-[#0B2447]">Thêm Dịch Vụ Mới</h1>
          <p className="text-gray-500 text-sm mt-0.5">Điền thông tin dịch vụ bên dưới</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-7">
        <ServiceForm mode="new" />
      </div>
    </div>
  )
}
