import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, Phone, CalendarCheck } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactCTA from '@/components/home/ContactCTA'
import ServiceCard from '@/components/ui/ServiceCard'
import { prisma } from '@/lib/prisma'
import { PHONE_LINK, PHONE_DISPLAY } from '@/lib/constants'
import { defaultContactCTA } from '@/lib/defaultContent'
import { serviceCategories, services as staticServices } from '@/data/services'
import type { Service } from '@/types'

interface Props {
  params: { slug: string }
}

function toService(s: {
  id: string; slug: string; title: string; shortDescription: string
  description: string; category: string; categoryLabel: string; image: string; highlights: string
}): Service {
  return { ...s, category: s.category as Service['category'], icon: '', highlights: JSON.parse(s.highlights) as string[] }
}

const CATEGORY_IDS = serviceCategories.map((c) => c.id)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Category page
  const category = serviceCategories.find((c) => c.id === params.slug)
  if (category) {
    return {
      title: `${category.label} | Dịch Vụ | An Phát Industry`,
      description: category.description,
    }
  }
  // Service detail
  const service = await prisma.service.findUnique({ where: { slug: params.slug } }).catch(() => null)
  if (!service) return { title: 'Không tìm thấy | An Phát Industry' }
  return {
    title: `${service.title} | An Phát Industry`,
    description: service.description,
  }
}

export default async function ServiceSlugPage({ params }: Props) {
  const ctaRaw = await prisma.siteSetting.findUnique({ where: { key: 'section_contact_cta' } }).catch(() => null)
  const ctaData = ctaRaw ? JSON.parse(ctaRaw.value) as typeof defaultContactCTA : defaultContactCTA

  // ── CATEGORY VIEW ─────────────────────────────────────────────────────────
  if (CATEGORY_IDS.includes(params.slug)) {
    const category = serviceCategories.find((c) => c.id === params.slug)!
    const dbServices = await prisma.service
      .findMany({ where: { category: params.slug }, orderBy: { sortOrder: 'asc' } })
      .catch(() => [])
    const services = dbServices.length > 0
      ? dbServices.map(toService)
      : staticServices.filter((s) => s.category === params.slug).map((s) => ({ ...s, highlights: JSON.stringify(s.highlights) })).map(toService)

    return (
      <>
        <section className="bg-dark-1 border-b border-white/5 section-pt pb-12">
          <div className="site-container">
            <Breadcrumb items={[{ label: 'Dịch Vụ', href: '/dich-vu' }, { label: category.label }]} />
            <h1 className="font-heading font-bold text-white text-3xl lg:text-5xl mt-5 mb-3">
              {category.label}
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">{category.description}</p>
          </div>
        </section>

        <section className="section-py bg-dark-2">
          <div className="site-container">
            {services.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, i) => (
                  <ServiceCard key={service.id} service={service} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-white/40">Dịch vụ đang được cập nhật. Vui lòng quay lại sau.</p>
                <Link href="/lien-he" className="btn-main mt-6 inline-flex">Liên hệ tư vấn trực tiếp</Link>
              </div>
            )}

            <div className="text-center mt-12">
              <Link href="/dich-vu" className="btn-outline inline-flex">← Xem Tất Cả Dịch Vụ</Link>
            </div>
          </div>
        </section>

        <ContactCTA data={ctaData} />
      </>
    )
  }

  // ── SERVICE DETAIL VIEW ───────────────────────────────────────────────────
  const [dbService, dbRelated] = await Promise.all([
    prisma.service.findUnique({ where: { slug: params.slug } }).catch(() => null),
    prisma.service.findMany({ where: { slug: { not: params.slug } }, take: 3, orderBy: { sortOrder: 'asc' } }).catch(() => []),
  ])

  // Fallback to static data if DB returns nothing
  const rawService = dbService ?? (() => {
    const s = staticServices.find((sv) => sv.slug === params.slug)
    if (!s) return null
    return { ...s, highlights: JSON.stringify(s.highlights) }
  })()

  if (!rawService) notFound()

  const service = toService(rawService)
  const related = dbRelated.length > 0
    ? dbRelated.map(toService)
    : staticServices.filter((s) => s.slug !== params.slug).slice(0, 3).map((s) => ({ ...s, highlights: JSON.stringify(s.highlights) })).map(toService)

  return (
    <>
      {/* Hero */}
      <section className="bg-dark-1 border-b border-white/5 section-pt pb-12">
        <div className="site-container">
          <Breadcrumb
            items={[
              { label: 'Dịch Vụ', href: '/dich-vu' },
              { label: service.categoryLabel, href: `/dich-vu/${service.category}` },
              { label: service.title },
            ]}
          />
          <h1 className="font-heading font-bold text-white text-3xl lg:text-5xl mt-5 mb-3">
            {service.title}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">{service.shortDescription}</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-py bg-dark-2">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="relative rounded-card overflow-hidden aspect-video mb-8">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>

              <h2 className="font-heading font-bold text-white text-2xl mb-4">Mô Tả Dịch Vụ</h2>
              <p className="text-white/55 leading-relaxed mb-8 text-base lg:text-lg">
                {service.description}
              </p>

              <h2 className="font-heading font-bold text-white text-2xl mb-4">Điểm Nổi Bật</h2>
              <ul className="space-y-3 mb-8">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-white/60">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-primary/10 border border-primary/20 rounded-card p-6">
                <h3 className="font-heading font-bold text-white text-lg mb-2">Cam Kết Chất Lượng</h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  Tất cả dịch vụ tại An Phát Industry đều được thực hiện bởi kỹ thuật viên có
                  chứng chỉ, sử dụng phụ tùng chính hãng và bảo hành đầy đủ. Nếu quý khách chưa
                  hài lòng, chúng tôi cam kết hoàn tiền 100%.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-dark-1 border border-white/10 rounded-card p-6 text-white sticky top-24">
                <h3 className="font-heading font-bold text-xl mb-3">Đặt Lịch Dịch Vụ</h3>
                <p className="text-white/55 text-sm mb-5">
                  Liên hệ ngay để được tư vấn miễn phí và đặt lịch phục vụ nhanh nhất.
                </p>
                <Link
                  href="/lien-he"
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/85 text-white font-bold w-full py-3.5 rounded-lg transition-colors mb-3"
                >
                  <CalendarCheck size={18} />
                  Đặt Lịch Ngay
                </Link>
                <a
                  href={PHONE_LINK}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold w-full py-3.5 rounded-lg transition-colors"
                >
                  <Phone size={18} />
                  {PHONE_DISPLAY}
                </a>

                {related.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h3 className="font-heading font-bold text-white text-base mb-4">Dịch Vụ Liên Quan</h3>
                    <div className="space-y-4">
                      {related.map((s) => (
                        <ServiceCard key={s.id} service={s} compact />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ContactCTA data={ctaData} />
    </>
  )
}
