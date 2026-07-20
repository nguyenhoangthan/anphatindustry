import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, MapPin } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { siteConfig } from '@/lib/constants'
import {
  RECRUITMENT_POSTERS,
  RECRUIT_PHONE_DISPLAY,
  RECRUIT_PHONE_LINK,
  RECRUIT_ADDRESS,
} from '@/data/recruitment'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return RECRUITMENT_POSTERS.map((job) => ({ slug: job.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const job = RECRUITMENT_POSTERS.find((j) => j.slug === params.slug)
  if (!job) return { title: 'Không tìm thấy | An Phát Industry' }
  return {
    title: `${job.title} | Tuyển Dụng | An Phát Industry`,
    description: job.summary,
    alternates: { canonical: `${siteConfig.url}/tuyen-dung/${job.slug}` },
  }
}

export default function RecruitmentJobPage({ params }: Props) {
  const job = RECRUITMENT_POSTERS.find((j) => j.slug === params.slug)
  if (!job) notFound()

  const otherJobs = RECRUITMENT_POSTERS.filter((j) => j.slug !== job.slug)

  return (
    <>
      <section className="bg-dark-1 border-b border-border section-pt pb-12">
        <div className="site-container">
          <Breadcrumb
            items={[
              { label: 'Tuyển Dụng', href: '/tuyen-dung' },
              { label: job.title },
            ]}
          />
          <h1 className="font-heading font-bold text-heading text-3xl lg:text-5xl leading-tight mt-5 mb-3">
            {job.title}
          </h1>
          <p className="text-body text-lg max-w-2xl">{job.summary}</p>
        </div>
      </section>

      <section className="section-py bg-dark-2">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-card border border-border bg-dark-3 shadow-md">
                <Image
                  src={job.src}
                  alt={job.alt}
                  width={1414}
                  height={2000}
                  unoptimized
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-primary/10 border border-primary/30 rounded-card p-6">
                  <h2 className="font-heading font-bold text-heading text-lg mb-4">Ứng Tuyển Ngay</h2>
                  <a
                    href={RECRUIT_PHONE_LINK}
                    className="inline-flex items-center justify-center gap-2 w-full bg-primary text-white font-bold px-6 py-3 rounded-btn shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-200 text-sm uppercase tracking-wide mb-4"
                  >
                    <Phone size={16} />
                    Anh Lành – {RECRUIT_PHONE_DISPLAY}
                  </a>
                  <p className="flex items-start gap-1.5 text-body text-sm">
                    <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                    {RECRUIT_ADDRESS}
                  </p>
                </div>

                {otherJobs.length > 0 && (
                  <div className="bg-dark-1 border border-border rounded-card p-6">
                    <h3 className="font-heading font-bold text-heading text-base mb-4">Vị Trí Khác</h3>
                    <div className="space-y-4">
                      {otherJobs.map((j) => (
                        <Link key={j.slug} href={`/tuyen-dung/${j.slug}`} className="flex gap-3 group">
                          <div className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden">
                            <Image src={j.src} alt={j.alt} fill unoptimized className="object-cover group-hover:scale-105 transition-transform" />
                          </div>
                          <div>
                            <p className="text-body text-sm font-medium group-hover:text-primary transition-colors">{j.title}</p>
                            <p className="text-muted text-xs mt-1 line-clamp-2">{j.summary}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
