import { Building2 } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import ProjectsForm from '@/components/admin/ProjectsForm'
import { defaultProjects } from '@/lib/defaultContent'

export const dynamic = 'force-dynamic'

export default async function ProjectsAdminPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'section_projects' } }).catch(() => null)
  const data = setting ? JSON.parse(setting.value) : defaultProjects

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Building2 size={20} className="text-[#0B2447]" />
        <div>
          <h1 className="text-2xl font-black text-[#0B2447]">Dự Án & Đối Tác</h1>
          <p className="text-gray-500 text-sm mt-0.5">Dự án đã thực hiện và mạng lưới đối tác / khách hàng</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
        <ProjectsForm initialData={data} />
      </div>
    </div>
  )
}
