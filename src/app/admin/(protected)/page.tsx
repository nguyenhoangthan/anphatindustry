import Link from 'next/link'
import { LayoutDashboard, Wrench, BookOpen, Settings, ArrowRight, GraduationCap, Building2, Video } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [serviceCount, postCount] = await Promise.all([
    prisma.service.count().catch(() => 0),
    prisma.blogPost.count().catch(() => 0),
  ])

  const stats = [
    {
      label: 'Dịch Vụ',
      value: serviceCount,
      icon: Wrench,
      href: '/admin/services',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Bài Viết',
      value: postCount,
      icon: BookOpen,
      href: '/admin/posts',
      color: 'bg-green-50 text-green-600',
    },
  ]

  const quickLinks = [
    { label: 'Thêm Dịch Vụ Mới', href: '/admin/services/new', icon: Wrench },
    { label: 'Đăng Bài Viết Mới', href: '/admin/posts/new', icon: BookOpen },
    { label: 'Quản Lý Mô Hình Đào Tạo', href: '/admin/models', icon: GraduationCap },
    { label: 'Quản Lý Dự Án & Đối Tác', href: '/admin/projects', icon: Building2 },
    { label: 'Quản Lý Video Clip', href: '/admin/videos', icon: Video },
    { label: 'Cài Đặt Công Ty', href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <LayoutDashboard size={22} className="text-[#0B2447]" />
          <h1 className="text-2xl font-black text-[#0B2447]">Dashboard</h1>
        </div>
        <p className="text-gray-500 text-sm">Tổng quan nội dung website An Phát Industry</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
              <Icon size={20} />
            </div>
            <div className="text-3xl font-black text-[#0B2447] mb-1">{value}</div>
            <div className="text-sm text-gray-500 font-medium">{label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <h2 className="font-bold text-[#0B2447]">Thao Tác Nhanh</h2>
        </div>
        {quickLinks.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group"
          >
            <div className="flex items-center gap-3">
              <Icon size={16} className="text-[#0B2447]" />
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>
            <ArrowRight size={15} className="text-gray-300 group-hover:text-[#E63312] transition-colors" />
          </Link>
        ))}
      </div>

      {/* Info */}
      <div className="mt-6 bg-[#0B2447]/5 rounded-2xl p-5">
        <p className="text-sm text-[#0B2447] font-semibold mb-1">💡 Ghi chú</p>
        <p className="text-sm text-gray-600">
          Mọi thay đổi sẽ có hiệu lực ngay lập tức trên website public.
          Nhớ cập nhật ảnh thực tế thay cho ảnh placeholder.
        </p>
      </div>
    </div>
  )
}
