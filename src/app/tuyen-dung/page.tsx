import type { Metadata } from 'next'
import Image from 'next/image'
import { Phone, MapPin, Briefcase } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { siteConfig } from '@/lib/constants'
import {
  RECRUITMENT_POSTERS,
  RECRUIT_PHONE_DISPLAY,
  RECRUIT_PHONE_LINK,
  RECRUIT_ADDRESS,
} from '@/data/recruitment'

export const metadata: Metadata = {
  title: 'Tuyển Dụng | An Phát Industry',
  description:
    'Xưởng Dịch Vụ An Phát đang tuyển Kỹ Thuật Viên chuyên nghiệp và Kỹ Thuật Viên tập sự. Xem chi tiết vị trí, yêu cầu và quyền lợi.',
  alternates: { canonical: `${siteConfig.url}/tuyen-dung` },
}

export default function RecruitmentPage() {
  return (
    <>
      <section className="bg-dark-1 border-b border-border section-pt pb-12">
        <div className="site-container">
          <Breadcrumb items={[{ label: 'Tuyển Dụng' }]} />
          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mt-5 mb-4">
            <Briefcase size={14} />
            Tuyển Dụng
          </span>
          <h1 className="font-heading font-bold text-heading text-3xl lg:text-5xl leading-tight mb-3">
            Gia Nhập Đội Ngũ An Phát
          </h1>
          <p className="text-body text-lg max-w-2xl">
            Xưởng Dịch Vụ An Phát đang tìm kiếm Kỹ Thuật Viên chuyên nghiệp và Kỹ Thuật Viên tập
            sự. Xem chi tiết vị trí, yêu cầu và quyền lợi bên dưới.
          </p>
        </div>
      </section>

      <section className="section-py bg-dark-2">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {RECRUITMENT_POSTERS.map((p) => (
              <div
                key={p.src}
                className="overflow-hidden rounded-card border border-border bg-dark-3 shadow-md"
              >
                <div className="relative w-full">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={1414}
                    height={2000}
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <div className="p-4 text-center">
                  <h2 className="font-heading font-bold text-heading text-base">{p.title}</h2>
                </div>
              </div>
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
    </>
  )
}
