import { getSection } from '@/lib/content'
import { defaultTeamSection } from '@/lib/defaultContent'
import TeamForm from '@/components/admin/TeamForm'

export const dynamic = 'force-dynamic'

export default async function TeamAdminPage() {
  const data = await getSection('section_team', defaultTeamSection)

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#0B2447]">Đội Ngũ & Về Chúng Tôi</h1>
        <p className="text-sm text-gray-500 mt-1">Chỉnh sửa trang Về Chúng Tôi – giới thiệu công ty, sứ mệnh, đội ngũ.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <TeamForm initialData={data} />
      </div>
    </div>
  )
}
