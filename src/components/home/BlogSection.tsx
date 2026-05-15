import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import BlogCard from '@/components/ui/BlogCard'
import type { BlogPost } from '@/types'

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  const featured = posts.slice(0, 3)

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container">
        <SectionHeader
          badge="Chia Sẻ Kinh Nghiệm"
          title="Kiến Thức Hữu Ích Cho Chủ Xe"
          subtitle="Những bài viết chất lượng từ đội ngũ kỹ thuật viên giàu kinh nghiệm giúp bạn chăm sóc và sử dụng xe đúng cách."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/thu-vien"
            className="inline-flex items-center gap-2 border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200"
          >
            Xem Tất Cả Bài Viết <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
