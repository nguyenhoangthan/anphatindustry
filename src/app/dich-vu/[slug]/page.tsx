import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { CheckCircle, Phone, CalendarCheck } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactCTA from '@/components/home/ContactCTA'
import ServiceCard from '@/components/ui/ServiceCard'
import { prisma } from '@/lib/prisma'
import { PHONE_LINK, PHONE_DISPLAY } from '@/lib/constants'
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await prisma.service.findUnique({ where: { slug: params.slug } })
  if (!service) return { title: 'Không tìm thấy | An Phát Industry' }
  return {
    title: `${service.title} | An Phát Industry`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const [dbService, dbRelated] = await Promise.all([
    prisma.service.findUnique({ where: { slug: params.slug } }),
    prisma.service.findMany({ where: { slug: { not: params.slug } }, take: 3, orderBy: { sortOrder: 'asc' } }),
  ])

  if (!dbService) notFound()

  const service = toService(dbService)
  const related = dbRelated.map(toService)

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-900 py-14 lg:py-20">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Dịch Vụ', href: '/dich-vu' },
              { label: service.categoryLabel, href: `/dich-vu/${service.category}` },
              { label: service.title },
            ]}
          />
          <h1 className="font-heading font-black text-white text-3xl lg:text-5xl mt-5 mb-3">
            {service.title}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">{service.shortDescription}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden aspect-video mb-8 shadow-lg">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>

              <h2 className="font-heading font-bold text-primary-900 text-2xl mb-4">
                Mô Tả Dịch Vụ
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-base lg:text-lg">
                {service.description}
              </p>

              <h2 className="font-heading font-bold text-primary-900 text-2xl mb-4">
                Điểm Nổi Bật
              </h2>
              <ul className="space-y-3 mb-8">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-accent-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
                <h3 className="font-heading font-bold text-primary-900 text-lg mb-2">
                  Cam Kết Chất Lượng
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tất cả dịch vụ tại An Phát Industry đều được thực hiện bởi kỹ thuật viên có
                  chứng chỉ, sử dụng phụ tùng chính hãng và bảo hành đầy đủ. Nếu quý khách chưa
                  hài lòng, chúng tôi cam kết hoàn tiền 100%.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* CTA Box */}
              <div className="bg-primary-900 rounded-2xl p-6 text-white mb-6 sticky top-24">
                <h3 className="font-heading font-bold text-xl mb-3">Đặt Lịch Dịch Vụ</h3>
                <p className="text-white/70 text-sm mb-5">
                  Liên hệ ngay để được tư vấn miễn phí và đặt lịch phục vụ nhanh nhất.
                </p>
                <a
                  href="/lien-he"
                  className="flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold w-full py-3.5 rounded-xl transition-colors mb-3"
                >
                  <CalendarCheck size={18} />
                  Đặt Lịch Ngay
                </a>
                <a
                  href={PHONE_LINK}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold w-full py-3.5 rounded-xl transition-colors"
                >
                  <Phone size={18} />
                  {PHONE_DISPLAY}
                </a>
              </div>

              {/* Related Services */}
              {related.length > 0 && (
                <div>
                  <h3 className="font-heading font-bold text-primary-900 text-lg mb-4">
                    Dịch Vụ Liên Quan
                  </h3>
                  <div className="space-y-4">
                    {related.map((s) => (
                      <ServiceCard key={s.id} service={s} compact />
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
