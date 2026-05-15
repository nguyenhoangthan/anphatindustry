import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Calendar, User } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BlogCard from '@/components/ui/BlogCard'
import ContactCTA from '@/components/home/ContactCTA'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { defaultContactCTA } from '@/lib/defaultContent'
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
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } }).catch(() => null)
  if (!post) return { title: 'Không tìm thấy | An Phát Industry' }
  return { title: `${post.title} | An Phát Industry`, description: post.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const [dbPost, dbRelated, ctaRaw] = await Promise.all([
    prisma.blogPost.findUnique({ where: { slug: params.slug } }).catch(() => null),
    prisma.blogPost.findMany({ where: { slug: { not: params.slug } }, take: 3, orderBy: { publishedAt: 'desc' } }).catch(() => []),
    prisma.siteSetting.findUnique({ where: { key: 'section_contact_cta' } }).catch(() => null),
  ])

  if (!dbPost) notFound()

  const post = toPost(dbPost)
  const related = dbRelated.map(toPost)
  const ctaData = ctaRaw ? JSON.parse(ctaRaw.value) as typeof defaultContactCTA : defaultContactCTA

  return (
    <>
      {/* Hero */}
      <section className="bg-dark-1 border-b border-white/5 section-pt pb-12">
        <div className="site-container">
          <Breadcrumb
            items={[
              { label: 'Thư Viện', href: '/thu-vien' },
              { label: post.title },
            ]}
          />
        </div>
      </section>

      {/* Article */}
      <section className="section-py bg-dark-2">
        <div className="site-container">
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-white/40">
              <span className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full capitalize border border-primary/20">
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

            <h1 className="font-heading font-bold text-white text-2xl lg:text-4xl leading-tight mb-6">
              {post.title}
            </h1>

            <div className="relative rounded-card overflow-hidden aspect-video mb-8">
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
            <p className="text-white/60 text-lg leading-relaxed mb-6 font-medium border-l-4 border-primary pl-5 italic">
              {post.excerpt}
            </p>

            {/* Content */}
            <div className="prose max-w-none text-white/55 space-y-4">
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
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-dark-1 border border-white/10 text-white/50 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Back link */}
            <div className="mt-8">
              <Link
                href="/thu-vien"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-sm"
              >
                ← Quay lại Thư Viện
              </Link>
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-white/5">
              <h2 className="font-heading font-bold text-white text-xl mb-8 text-center">
                Bài Viết Liên Quan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <ContactCTA data={ctaData} />
    </>
  )
}
