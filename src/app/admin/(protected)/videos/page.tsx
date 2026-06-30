import { Video } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import VideosForm from '@/components/admin/VideosForm'
import { defaultVideos } from '@/lib/defaultContent'

export const dynamic = 'force-dynamic'

export default async function VideosAdminPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'section_videos' } }).catch(() => null)
  const data = setting ? JSON.parse(setting.value) : defaultVideos

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Video size={20} className="text-[#0B2447]" />
        <div>
          <h1 className="text-2xl font-black text-[#0B2447]">Video Clip Phổ Biến</h1>
          <p className="text-gray-500 text-sm mt-0.5">Thư viện video (YouTube hoặc file tải lên)</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
        <VideosForm initialData={data} />
      </div>
    </div>
  )
}
