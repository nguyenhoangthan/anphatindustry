import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import DeleteButton from '../services/DeleteButton'
import { formatDate } from '@/lib/utils'

export default async function PostsAdminPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#0B2447]">Bài Viết</h1>
          <p className="text-gray-500 text-sm mt-0.5">{posts.length} bài viết trong hệ thống</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-[#0B2447] text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-[#0B2447]/90 transition-colors"
        >
          <Plus size={15} />
          Đăng Bài Viết
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Tiêu Đề
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Danh Mục
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Ngày Đăng
              </th>
              <th className="px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-5 py-3.5">
                  <div className="font-medium text-sm text-gray-800">{post.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5 line-clamp-1">{post.excerpt}</div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                    {post.category === 'kinh-nghiem' ? 'Kinh nghiệm' : post.category}
                  </span>
                  {post.featured && (
                    <span className="ml-1.5 inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-2 py-1 rounded-full">
                      ★ Nổi bật
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-500">
                  {formatDate(post.publishedAt.toISOString())}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2 justify-end">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="p-2 text-gray-400 hover:text-[#0B2447] hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Pencil size={14} />
                    </Link>
                    <DeleteButton id={post.id} type="post" name={post.title} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-gray-400 text-sm">
                  Chưa có bài viết nào.{' '}
                  <Link href="/admin/posts/new" className="text-[#0B2447] font-medium underline">
                    Đăng ngay
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
