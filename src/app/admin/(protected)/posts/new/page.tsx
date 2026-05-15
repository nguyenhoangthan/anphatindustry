import { BookOpen } from 'lucide-react'
import PostForm from '@/components/admin/PostForm'

export default function NewPostPage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen size={20} className="text-[#0B2447]" />
        <div>
          <h1 className="text-2xl font-black text-[#0B2447]">Đăng Bài Viết Mới</h1>
          <p className="text-gray-500 text-sm mt-0.5">Điền thông tin bài viết bên dưới</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-7">
        <PostForm mode="new" />
      </div>
    </div>
  )
}
