import type { Metadata } from 'next'
import Link from 'next/link'
import { Search } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BlogCard from '@/components/ui/BlogCard'
import { prisma } from '@/lib/prisma'
import type { BlogPost } from '@/types'

export const metadata: Metadata = {
  title: 'Thư Viện – Chia Sẻ Kinh Nghiệm | An Phát Industry',
  description:
    'Kiến thức hữu ích về bảo dưỡng, sửa chữa và chăm sóc ô tô từ đội ngũ kỹ thuật viên giàu kinh nghiệm tại An Phát Industry.',
}

const categories = [
  { label: 'Tất Cả', href: '/thu-vien', value: '' },
  { label: 'Kinh Nghiệm', href: '/thu-vien/kinh-nghiem', value: 'kinh-nghiem' },
  { label: 'Tin Tức', href: '/thu-vien/tin-tuc', value: 'tin-tuc' },
]

export default async function BlogPage() {
  const dbPosts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } }).catch(() => [])
  const blogPosts: BlogPost[] = dbPosts.map((p) => ({
    ...p,
    publishedAt: p.publishedAt.toISOString().substring(0, 10),
    tags: JSON.parse(p.tags) as string[],
  }))
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-900 py-14 lg:py-20">
        <div className="container">
          <Breadcrumb items={[{ label: 'Thư Viện' }]} />
          <h1 className="font-heading font-black text-white text-3xl lg:text-5xl mt-5 mb-3">
            Thư Viện Kiến Thức
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Những bài viết chia sẻ kinh nghiệm, kiến thức ô tô hữu ích từ đội ngũ kỹ thuật viên
            An Phát Industry.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="container">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={cat.href}
                className="bg-white hover:bg-primary-900 hover:text-white text-primary-900 border border-gray-200 hover:border-primary-900 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm"
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
              <Search size={40} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400">Chưa có bài viết nào.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
