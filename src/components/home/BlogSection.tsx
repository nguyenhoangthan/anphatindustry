import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BlogCard from '@/components/ui/BlogCard'
import type { BlogPost } from '@/types'

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  const featured = posts.slice(0, 3)

  return (
    <section className="section-py bg-dark-2">
      <div className="site-container">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-subtitle mb-3">Chia Sẻ Kinh Nghiệm</div>
            <h2 className="text-white font-heading font-bold text-2xl lg:text-3xl leading-tight">
              Kiến Thức Hữu Ích Cho Chủ Xe
            </h2>
          </div>
          <Link
            href="/thu-vien"
            className="btn-outline inline-flex items-center gap-2 whitespace-nowrap flex-shrink-0 text-sm"
          >
            Xem Tất Cả <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}