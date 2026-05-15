import type { Metadata } from 'next'
import SectionHeader from '@/components/ui/SectionHeader'
import ServiceCard from '@/components/ui/ServiceCard'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactCTA from '@/components/home/ContactCTA'
import { serviceCategories } from '@/data/services'
import { prisma } from '@/lib/prisma'
import { defaultContactCTA } from '@/lib/defaultContent'
import type { Service } from '@/types'

export const metadata: Metadata = {
  title: 'Dịch Vụ | An Phát Industry',
  description:
    'Danh sách đầy đủ các dịch vụ bảo dưỡng, sửa chữa, chăm sóc và đồng sơn ô tô chuyên nghiệp tại An Phát Industry – TP.HCM.',
}

export default async function ServicesPage() {
  const [dbServices, ctaRaw] = await Promise.all([
    prisma.service.findMany({ orderBy: { sortOrder: 'asc' } }).catch(() => []),
    prisma.siteSetting.findUnique({ where: { key: 'section_contact_cta' } }).catch(() => null),
  ])
  const services: Service[] = dbServices.map((s) => ({
    ...s,
    category: s.category as Service['category'],
    icon: '',
    highlights: JSON.parse(s.highlights) as string[],
  }))
  const ctaData = ctaRaw ? JSON.parse(ctaRaw.value) as typeof defaultContactCTA : defaultContactCTA

  return (
    <>
      {/* Hero */}
      <section className="bg-dark-1 border-b border-white/5 section-pt pb-12">
        <div className="site-container">
          <Breadcrumb items={[{ label: 'Dịch Vụ' }]} />
          <h1 className="font-heading font-bold text-white text-3xl lg:text-5xl mt-5 mb-3">
            Dịch Vụ Của Chúng Tôi
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Đầy đủ các giải pháp chăm sóc ô tô từ bảo dưỡng định kỳ, sửa chữa máy gầm đến đồng
            sơn và chăm sóc xe chuyên sâu.
          </p>
        </div>
      </section>

      {/* Services by Category */}
      {serviceCategories.map((category, idx) => {
        const categoryServices = services.filter((s) => s.category === category.id)
        return (
          <section key={category.id} className={`section-py ${idx % 2 === 0 ? 'bg-dark-2' : 'bg-dark-1'}`}>
            <div className="site-container">
              <SectionHeader
                badge={category.label}
                title={category.label}
                subtitle={category.description}
                align="left"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <ContactCTA data={ctaData} />
    </>
  )
}
