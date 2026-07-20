import Image from 'next/image'
import Link from 'next/link'
import { Briefcase, Phone, MapPin } from 'lucide-react'
import {
  RECRUITMENT_POSTERS,
  RECRUIT_PHONE_DISPLAY,
  RECRUIT_PHONE_LINK,
  RECRUIT_ADDRESS,
} from '@/data/recruitment'

export default function RecruitmentSection() {
  return (
    <section className="section-py bg-dark-2 border-y border-border">
      <div className="site-container">
        <div className="max-w-4xl mx-auto">
          {/* Header gọn */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 text-lg font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              <Briefcase size={21} />
              Tuyển Dụng
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl leading-tight text-heading">
              Gia nhập đội ngũ An Phát
            </h2>
            <p className="text-body text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              Xưởng Dịch Vụ An Phát đang tìm kiếm Kỹ Thuật Viên chuyên nghiệp và Kỹ Thuật Viên tập sự. Xem chi tiết vị trí, yêu cầu và quyền lợi trong 2 thông báo bên dưới.
            </p>
          </div>

          {/* 2 poster cạnh nhau */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {RECRUITMENT_POSTERS.map((p) => (
              <Link
                key={p.src}
                href="/tuyen-dung"
                className="group block overflow-hidden rounded-card border border-border bg-dark-3 shadow-md hover:shadow-lg transition-all duration-200"
                aria-label={p.alt}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={1414}
                  height={2000}
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
                />
                <span className="block text-center text-body text-xs py-2.5 border-t border-border">
                  Xem chi tiết
                </span>
              </Link>
            ))}
          </div>

          {/* Liên hệ */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-center text-center sm:text-left">
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
      </div>
    </section>
  )
}
