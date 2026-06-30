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
    prisma.siteSetting.findUnique({ where: { key: 'section_pricing' } }).catch(() => null),
    prisma.siteSetting.findUnique({ where: { key: 'section_contact_cta' } }).catch(() => null),
  ])
  const pricing = pricingRaw ? JSON.parse(pricingRaw.value) as typeof defaultPricingPackages : defaultPricingPackages
  const ctaData = ctaRaw ? JSON.parse(ctaRaw.value) as typeof defaultContactCTA : defaultContactCTA
  const { badge, title, subtitle, packages: pricingPackages, notes } = pricing

  return (
    <>
      {/* Hero */}
      <section className="bg-dark-1 border-b border-border section-pt pb-12">
        <div className="site-container">
          <Breadcrumb items={[{ label: 'Báo Giá' }]} />
          <h1 className="font-heading font-bold text-heading text-3xl lg:text-5xl mt-5 mb-3">
            Báo Giá Dịch Vụ
          </h1>
          <p className="text-body text-lg max-w-2xl">
            Minh bạch – không phát sinh. Xem giá tham khảo các gói dịch vụ phổ biến tại An Phát
            Industry.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="section-py bg-dark-2">
        <div className="site-container">
          <SectionHeader badge={badge} title={title} subtitle={subtitle} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pricingPackages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-card p-6 lg:p-8 flex flex-col border ${
                  pkg.highlight
                    ? 'bg-primary/10 border-primary/40 scale-[1.02]'
                    : 'bg-dark-1 border-border'
                }`}
              >
                {pkg.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-4 py-1.5 rounded-full bg-primary text-white">
                    <Star size={10} />
                    {pkg.badge}
                  </span>
                )}

                <h3 className="font-heading font-bold text-heading text-xl mb-1 mt-2">
                  {pkg.name}
                </h3>
                <p className="text-muted text-sm mb-5">{pkg.description}</p>

                <div className="font-heading font-black text-3xl text-primary mb-6">
                  {pkg.price}
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-body text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/lien-he"
                  className={`flex items-center justify-center gap-2 font-bold py-3.5 rounded-lg transition-all duration-200 ${
                    pkg.highlight
                      ? 'bg-primary hover:bg-primary/85 text-white'
                      : 'bg-dark-2 hover:bg-dark-2 text-heading border border-border'
                  }`}
                >
                  <CalendarCheck size={16} />
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="mt-12 bg-dark-1 rounded-card p-6 border border-border max-w-2xl mx-auto">
            <h3 className="font-heading font-bold text-heading mb-4 text-lg">
              Lưu Ý Quan Trọng
            </h3>
            <ul className="space-y-2.5">
              {notes.map((note) => (
                <li key={note} className="flex items-start gap-2.5 text-sm text-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Guarantee Banner */}
      <section className="section-py bg-dark-1">
        <div className="site-container text-center">
          <h2 className="font-heading font-black text-heading text-2xl lg:text-3xl mb-3">
            CAM KẾT VÀNG
          </h2>
          <p className="text-primary text-lg font-bold mb-6">
            &quot;Không sửa xong – Không thu phí – Hoàn tiền 100% nếu khách không hài lòng!&quot;
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/lien-he" className="btn-main">
              <CalendarCheck size={16} />
              Đặt Lịch Ngay
            </Link>
            <a href={PHONE_LINK} className="btn-outline">
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
