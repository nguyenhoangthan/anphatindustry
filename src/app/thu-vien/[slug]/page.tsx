import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowLeft, Calendar, User } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BlogCard from '@/components/ui/BlogCard'
import ContactCTA from '@/components/home/ContactCTA'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types'

interface Props {
  params: { slug: string }
}

function toPost(p: {
  id: string; slug: string; title: string; excerpt: string; content: string
  author: string; publishedAt: Date; category: string; image: string; tags: string; readingTime: number; featured: boolean
}): BlogPost {
  return { ...p, publishedAt: p.publishedAt.toISOString().substring(0, 10), tags: JSON.parse(p.tags) as string[] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } })
  if (!post) return { title: 'Không tìm thấy | An Phát Industry' }
  return { title: `${post.title} | An Phát Industry`, description: post.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const [dbPost, dbRelated] = await Promise.all([
    prisma.blogPost.findUnique({ where: { slug: params.slug } }),
    prisma.blogPost.findMany({ where: { slug: { not: params.slug } }, take: 3, orderBy: { publishedAt: 'desc' } }),
  ])

  if (!dbPost) notFound()

  const post = toPost(dbPost)
  const related = dbRelated.map(toPost)

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-900 py-14 lg:py-20">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Thư Viện', href: '/thu-vien' },
              { label: post.title },
            ]}
          />
        </div>
      </section>

      {/* Article */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-400">
              <span className="bg-accent-50 text-accent-600 font-semibold px-3 py-1 rounded-full capitalize">
                {post.category === 'kinh-nghiem' ? 'Kinh nghiệm' : post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <User size={13} />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.readingTime} phút đọc
              </span>
            </div>

            <h1 className="font-heading font-black text-primary-900 text-2xl lg:text-4xl leading-tight mb-6">
              {post.title}
            </h1>

            <div className="relative rounded-2xl overflow-hidden aspect-video mb-8 shadow-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>

            {/* Excerpt as lead */}
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium border-l-4 border-accent-500 pl-5 italic">
              {post.excerpt}
            </p>

            {/* Content placeholder */}
            <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
              <p>
                Nội dung bài viết chi tiết sẽ được cập nhật từ hệ thống CMS. Liên hệ nhóm quản trị
                để thêm nội dung đầy đủ cho bài viết này.
              </p>
              <p>
                Trong thời gian chờ đợi, quý khách có thể gọi đến số hotline hoặc ghé trực tiếp
                xưởng An Phát Industry để được tư vấn trực tiếp bởi đội ngũ kỹ thuật viên giàu
                kinh nghiệm.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Link
              href="/thu-vien"
              className="inline-flex items-center gap-2 text-primary-900 font-semibold mt-8 hover:text-accent-500 transition-colors"
            >
              <ArrowLeft size={16} />
              Quay lại thư viện
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-14 bg-light-gray">
          <div className="container">
            <h2 className="font-heading font-bold text-primary-900 text-2xl mb-8">
              Bài Viết Liên Quan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </>
  )
}
