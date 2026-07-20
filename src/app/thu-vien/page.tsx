import type { Metadata } from 'next'
import Link from 'next/link'
import { Search } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BlogCard from '@/components/ui/BlogCard'
import { prisma } from '@/lib/prisma'
import { safeJsonArray } from '@/lib/utils'
import type { BlogPost } from '@/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Thư Viện – Chia Sẻ Kinh Nghiệm | An Phát Industry',
  description:
    'Kiến thức hữu ích về bảo dưỡng, sửa chữa và chăm sóc ô tô từ đội ngũ kỹ thuật viên giàu kinh nghiệm tại An Phát Industry.',
}

const categories = [
  { label: 'Tất Cả', href: '/thu-vien', value: '' },
  { label: 'Chia Sẻ Kinh Nghiệm', href: '/thu-vien/kinh-nghiem', value: 'kinh-nghiem' },
  { label: 'Video Clip Phổ Biến', href: '/thu-vien/video', value: 'video' },
  { label: 'Bảng Tin Kỹ Thuật', href: '/thu-vien/bang-tin', value: 'bang-tin' },
  { label: 'Tuyển Dụng', href: '/thu-vien/tuyen-dung', value: 'tuyen-dung' },
]

export default async function BlogPage() {
  const dbPosts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } }).catch(() => [])
  const blogPosts: BlogPost[] = dbPosts.map((p) => ({
    ...p,
    publishedAt: p.publishedAt.toISOString().substring(0, 10),
    tags: safeJsonArray(p.tags),
  }))

  return (
    <>
      {/* Hero */}
      <section className="bg-dark-1 border-b border-white/5 section-pt pb-12">
        <div className="site-container">
          <Breadcrumb items={[{ label: 'Thư Viện' }]} />
          <h1 className="font-heading font-bold text-white text-3xl lg:text-5xl mt-5 mb-3">
            Thư Viện Kiến Thức
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Những bài viết chia sẻ kinh nghiệm, kiến thức ô tô hữu ích từ đội ngũ kỹ thuật viên
            An Phát Industry.
          </p>
        </div>
      </section>

      <section className="section-py bg-dark-2">
        <div className="site-container">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={cat.href}
                className="bg-dark-1 hover:bg-primary hover:text-white text-body border border-border hover:border-primary text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200"
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {blogPosts.length === 0 && (
            <div className="text-center py-20">
              <Search size={40} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/40">Chưa có bài viết nào.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
