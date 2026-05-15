import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, CalendarCheck, Star } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactCTA from '@/components/home/ContactCTA'
import { PHONE_LINK, PHONE_DISPLAY } from '@/lib/constants'
import { prisma } from '@/lib/prisma'
import { defaultPricingPackages, defaultContactCTA } from '@/lib/defaultContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Báo Giá Dịch Vụ | An Phát Industry',
  description:
    'Bảng giá dịch vụ bảo dưỡng, sửa chữa ô tô tại An Phát Industry. Báo giá minh bạch, không phát sinh chi phí ngoài thỏa thuận.',
}

export default async function PricingPage() {
  const [pricingRaw, ctaRaw] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { key: 'section_pricing' } }),
    prisma.siteSetting.findUnique({ where: { key: 'section_contact_cta' } }),
  ])
  const pricing = pricingRaw ? JSON.parse(pricingRaw.value) as typeof defaultPricingPackages : defaultPricingPackages
  const ctaData = ctaRaw ? JSON.parse(ctaRaw.value) as typeof defaultContactCTA : defaultContactCTA
  const { badge, title, subtitle, packages: pricingPackages, notes } = pricing

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-900 py-14 lg:py-20">
        <div className="container">
          <Breadcrumb items={[{ label: 'Báo Giá' }]} />
          <h1 className="font-heading font-black text-white text-3xl lg:text-5xl mt-5 mb-3">
            Báo Giá Dịch Vụ
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Minh bạch – không phát sinh. Xem giá tham khảo các gói dịch vụ phổ biến tại An Phát
            Industry.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="container">
          <SectionHeader
            badge={badge}
            title={title}
            subtitle={subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pricingPackages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-6 lg:p-8 flex flex-col ${
                  pkg.highlight
                    ? 'bg-primary-900 text-white shadow-2xl scale-105'
                    : 'bg-white shadow-sm border border-gray-100'
                }`}
              >
                {pkg.badge && (
                  <span
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full ${
                      pkg.highlight
                        ? 'bg-accent-500 text-white'
                        : 'bg-primary-900 text-white'
                    }`}
                  >
                    <Star size={10} />
                    {pkg.badge}
                  </span>
                )}

                <h3
                  className={`font-heading font-bold text-xl mb-1 mt-2 ${
                    pkg.highlight ? 'text-white' : 'text-primary-900'
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`text-sm mb-5 ${
                    pkg.highlight ? 'text-white/70' : 'text-gray-500'
                  }`}
                >
                  {pkg.description}
                </p>

                <div
                  className={`font-heading font-black text-3xl mb-6 ${
                    pkg.highlight ? 'text-accent-400' : 'text-accent-500'
                  }`}
                >
                  {pkg.price}
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle
                        size={16}
                        className={`flex-shrink-0 mt-0.5 ${
                          pkg.highlight ? 'text-accent-400' : 'text-accent-500'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          pkg.highlight ? 'text-white/80' : 'text-gray-600'
                        }`}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/lien-he"
                  className={`flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-all duration-200 ${
                    pkg.highlight
                      ? 'bg-accent-500 hover:bg-accent-600 text-white'
                      : 'bg-primary-900 hover:bg-primary-800 text-white'
                  }`}
                >
                  <CalendarCheck size={16} />
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="mt-12 bg-white rounded-2xl p-6 border border-gray-200 max-w-2xl mx-auto">
            <h3 className="font-heading font-bold text-primary-900 mb-4 text-lg">
              Lưu Ý Quan Trọng
            </h3>
            <ul className="space-y-2.5">
              {notes.map((note) => (
                <li key={note} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0 mt-1.5" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Guarantee Banner */}
      <section className="py-12 bg-primary-900">
        <div className="container text-center">
          <h2 className="font-heading font-black text-white text-2xl lg:text-3xl mb-3">
            CAM KẾT VÀNG
          </h2>
          <p className="text-accent-400 text-lg font-bold mb-6">
            "Không sửa xong – Không thu phí – Hoàn tiền 100% nếu khách không hài lòng!"
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
            >
              <CalendarCheck size={16} />
              Đặt Lịch Ngay
            </Link>
            <a
              href={PHONE_LINK}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
            >
              <Phone size={16} />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <ContactCTA data={ctaData} />
    </>
  )
}
