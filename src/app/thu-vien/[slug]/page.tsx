import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Calendar, User, Briefcase, Phone, MapPin } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BlogCard from '@/components/ui/BlogCard'
import ContactCTA from '@/components/home/ContactCTA'
import { prisma } from '@/lib/prisma'
import { getSection } from '@/lib/content'
import { formatDate, safeJsonArray } from '@/lib/utils'
import { sanitizeContent } from '@/lib/sanitize'
import { defaultContactCTA, defaultVideos } from '@/lib/defaultContent'
import { parseVideo } from '@/lib/video'
import {
  RECRUITMENT_POSTERS,
  RECRUIT_PHONE_DISPLAY,
  RECRUIT_PHONE_LINK,
  RECRUIT_ADDRESS,
} from '@/data/recruitment'
import type { BlogPost } from '@/types'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

const BLOG_CATEGORIES: Record<string, { label: string; description: string }> = {
  'kinh-nghiem': {
    label: 'Chia Sẻ Kinh Nghiệm',
    description: 'Những kinh nghiệm thực tế từ đội ngũ kỹ thuật viên An Phát Industry',
  },
  'video': {
    label: 'Video Clip Phổ Biến',
    description: 'Video hướng dẫn, chia sẻ kỹ thuật và giới thiệu dịch vụ của An Phát Industry',
  },
  'bang-tin': {
    label: 'Bảng Tin Kỹ Thuật',
    description: 'Cập nhật tin tức, thông tin kỹ thuật và công nghệ ô tô mới nhất',
  },
  'tuyen-dung': {
    label: 'Tuyển Dụng',
    description: 'Thông tin tuyển dụng và cơ hội nghề nghiệp tại An Phát Industry',
  },
}

function toPost(p: {
  id: string; slug: string; title: string; excerpt: string; content: string
  author: string; publishedAt: Date; category: string; image: string; tags: string; readingTime: number; featured: boolean
}): BlogPost {
  return { ...p, publishedAt: p.publishedAt.toISOString().substring(0, 10), tags: safeJsonArray(p.tags) }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blogCat = BLOG_CATEGORIES[params.slug]
  if (blogCat) {
    return {
      title: `${blogCat.label} | Thư Viện | An Phát Industry`,
      description: blogCat.description,
    }
  }
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } }).catch(() => null)
  if (!post) return { title: 'Không tìm thấy | An Phát Industry' }
  return { title: `${post.title} | An Phat Industry`, description: post.excerpt }
}

export default async function BlogSlugPage({ params }: Props) {
  const ctaData = await getSection('section_contact_cta', defaultContactCTA)

  // VIDEO LIBRARY VIEW
  if (params.slug === 'video') {
    const vid = await getSection('section_videos', defaultVideos)
    const items = (vid.items ?? []).filter((v) => v.url)
    return (
      <>
        <section className="bg-dark-1 border-b border-border section-pt pb-12">
          <div className="site-container">
            <Breadcrumb items={[{ label: 'Thư Viện', href: '/thu-vien' }, { label: vid.intro?.title || 'Video Clip Phổ Biến' }]} />
            <h1 className="font-heading font-bold text-heading text-3xl lg:text-5xl mt-5 mb-3">
              {vid.intro?.title || 'Video Clip Phổ Biến'}
            </h1>
            <p className="text-body text-lg max-w-2xl">{vid.intro?.subtitle}</p>
          </div>
        </section>
        <section className="section-py bg-dark-2">
          <div className="site-container">
            {items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((v, i) => {
                  const pv = parseVideo(v.url)
                  return (
                    <div key={i} className="bg-dark-1 rounded-card border border-border overflow-hidden">
                      <div className="relative aspect-video bg-black">
                        {pv.type === 'youtube' ? (
                          <iframe src={pv.src} title={v.title} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        ) : pv.type === 'file' ? (
                          <video src={pv.src} controls className="absolute inset-0 w-full h-full object-cover" />
                        ) : null}
                      </div>
                      {(v.title || v.description) && (
                        <div className="p-5">
                          {v.title && <h3 className="font-heading font-bold text-heading text-base mb-1">{v.title}</h3>}
                          {v.description && <p className="text-body text-sm leading-relaxed">{v.description}</p>}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted mb-4">Video đang được cập nhật.</p>
                <Link href="/thu-vien" className="btn-outline inline-flex">← Về Thư Viện</Link>
              </div>
            )}
          </div>
        </section>
        <ContactCTA data={ctaData} />
      </>
    )
  }

  // TUYỂN DỤNG VIEW
  if (params.slug === 'tuyen-dung') {
    return (
      <>
        <section className="bg-dark-1 border-b border-border section-pt pb-12">
          <div className="site-container">
            <Breadcrumb items={[{ label: 'Thư Viện', href: '/thu-vien' }, { label: 'Tuyển Dụng' }]} />
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mt-5 mb-4">
              <Briefcase size={14} />
              Tuyển Dụng
            </span>
            <h1 className="font-heading font-bold text-heading text-3xl lg:text-5xl mt-2 mb-3">
              Gia Nhập Đội Ngũ An Phát
            </h1>
            <p className="text-body text-lg max-w-2xl">
              Xưởng Dịch Vụ An Phát đang tìm kiếm Kỹ Thuật Viên chuyên nghiệp và Kỹ Thuật Viên
              tập sự. Xem chi tiết vị trí, yêu cầu và quyền lợi bên dưới.
            </p>
          </div>
        </section>
        <section className="section-py bg-dark-2">
          <div className="site-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {RECRUITMENT_POSTERS.map((p) => (
                <Link
                  key={p.slug}
                  href={`/tuyen-dung/${p.slug}`}
                  className="group overflow-hidden rounded-card border border-border bg-dark-3 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <div className="relative w-full">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={1414}
                      height={2000}
                      unoptimized
                      className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h2 className="font-heading font-bold text-heading text-base">{p.title}</h2>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 justify-center text-center sm:text-left">
              <a
                href={RECRUIT_PHONE_LINK}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-btn shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-200 text-sm uppercase tracking-wide"
              >
                <Phone size={16} />
                Anh Lành – {RECRUIT_PHONE_DISPLAY}
              </a>
              <span className="inline-flex items-center justify-center gap-1.5 text-body text-sm">
                <MapPin size={16} className="text-primary shrink-0" />
                {RECRUIT_ADDRESS}
              </span>
            </div>
          </div>
        </section>
        <ContactCTA data={ctaData} />
      </>
    )
  }

  // BLOG CATEGORY VIEW
  const blogCat = BLOG_CATEGORIES[params.slug]
  if (blogCat) {
    const dbPosts = await prisma.blogPost
      .findMany({ where: { category: params.slug }, orderBy: { publishedAt: 'desc' } })
      .catch(() => [])
    const posts = dbPosts.map(toPost)

    return (
      <>
        <section className="bg-dark-1 border-b border-border section-pt pb-12">
          <div className="site-container">
            <Breadcrumb items={[{ label: 'Thư Viện', href: '/thu-vien' }, { label: blogCat.label }]} />
            <h1 className="font-heading font-bold text-heading text-3xl lg:text-5xl mt-5 mb-3">
              {blogCat.label}
            </h1>
            <p className="text-body text-lg max-w-2xl">{blogCat.description}</p>
          </div>
        </section>

        <section className="section-py bg-dark-2">
          <div className="site-container">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted mb-4">Chưa có bài viết trong chuyên mục này.</p>
                <Link href="/thu-vien" className="btn-main inline-flex">Xem Tất Cả Bài Viết</Link>
              </div>
            )}
            <div className="text-center mt-12">
              <Link href="/thu-vien" className="btn-outline inline-flex">← Xem Tất Cả Bài Viết</Link>
            </div>
          </div>
        </section>

        <ContactCTA data={ctaData} />
      </>
    )
  }

  // BLOG POST DETAIL VIEW
  const [dbPost, dbRelated] = await Promise.all([
    prisma.blogPost.findUnique({ where: { slug: params.slug } }).catch(() => null),
    prisma.blogPost.findMany({ where: { slug: { not: params.slug } }, take: 3, orderBy: { publishedAt: 'desc' } }).catch(() => []),
  ])

  if (!dbPost) notFound()

  const post = toPost(dbPost)
  const related = dbRelated.map(toPost)

  return (
    <>
      <section className="bg-dark-1 border-b border-border section-pt pb-12">
        <div className="site-container">
          <Breadcrumb
            items={[
              { label: 'Thư Viện', href: '/thu-vien' },
              { label: BLOG_CATEGORIES[post.category]?.label ?? post.category, href: `/thu-vien/${post.category}` },
              { label: post.title },
            ]}
          />
          <h1 className="font-heading font-bold text-heading text-3xl lg:text-5xl mt-5 mb-4 max-w-3xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted text-sm">
            <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{post.readingTime} phút đọc</span>
          </div>
        </div>
      </section>

      <section className="section-py bg-dark-2">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            <article className="lg:col-span-2">
              {post.image && (
                <div className="relative rounded-card overflow-hidden aspect-video mb-8">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
              )}
              <p className="text-body text-lg leading-relaxed mb-6 italic">{post.excerpt}</p>
              <div
                className="prose prose-lg max-w-none prose-headings:font-heading"
                dangerouslySetInnerHTML={{ __html: sanitizeContent(post.content) }}
              />
              {post.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-dark-2 text-body px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-dark-1 border border-border rounded-card p-6">
                  <h3 className="font-heading font-bold text-heading text-base mb-4">Bài Viết Liên Quan</h3>
                  {related.length > 0 ? (
                    <div className="space-y-4">
                      {related.map((r) => (
                        <Link key={r.id} href={`/thu-vien/${r.slug}`} className="flex gap-3 group">
                          <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden">
                            <Image src={r.image} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="80px" />
                          </div>
                          <div>
                            <p className="text-body text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">{r.title}</p>
                            <p className="text-muted text-xs mt-1">{formatDate(r.publishedAt)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted text-sm">Chưa có bài viết liên quan.</p>
                  )}
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-card p-6 text-heading">
                  <h3 className="font-heading font-bold text-lg mb-2">Cần Tư Vấn?</h3>
                  <p className="text-body text-sm mb-4">Liên hệ đội ngũ chuyên gia An Phát Industry để được hỗ trợ ngay.</p>
                  <Link href="/lien-he" className="btn-main inline-flex w-full justify-center">Liên Hệ Ngay</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ContactCTA data={ctaData} />
    </>
  )
}