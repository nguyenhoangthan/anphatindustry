import Link from 'next/link'
import ServiceCard from '@/components/ui/ServiceCard'
import type { Service } from '@/types'
import type { WithSeason } from '@/types/season'

interface Props extends WithSeason {
  services: Service[]
}

export default function ServicesSection({ services, season }: Props) {
  return (
    <section className="section-py bg-dark-2">
      <div className="site-container">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-subtitle">Dịch Vụ Của Chúng Tôi</div>
          <h2 className="text-white font-heading font-bold">Giải Pháp Toàn Diện Cho Xe Ô Tô</h2>
          <p className="text-white/45 text-sm lg:text-base mt-3 max-w-2xl mx-auto">
            An Phát Industry cung cấp đầy đủ các dịch vụ bảo dưỡng, sửa chữa và chăm sóc ô tô với quy trình chuẩn và đội ngũ chuyên nghiệp.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(0, 6).map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} season={season} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/dich-vu" className="btn-outline inline-flex">
            Xem Tất Cả Dịch Vụ
          </Link>
        </div>
      </div>
    </section>
  )
}
