import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { defaultAboutSection } from '@/lib/defaultContent'
import StatsCounter from './StatsCounter'
import type { WithSeason } from '@/types/season'

type AboutData = typeof defaultAboutSection

interface Props extends WithSeason {
  data?: AboutData
}

// Stats shown beneath the about image
const defaultStats = [
  { icon: '🔧', value: 65250, suffix: '+', label: 'Giờ công phục vụ' },
  { icon: '😊', value: 5000,  suffix: '+', label: 'Khách hàng hài lòng' },
  { icon: '👨‍🔧', value: 45,   suffix: '+', label: 'Kỹ thuật viên' },
  { icon: '🏆', value: 9,     suffix: '+', label: 'Năm kinh nghiệm' },
]

export default function AboutSection({ data = defaultAboutSection }: Omit<Props, 'season'>) {
  const { badge, title, subtitle, body, image, highlights } = data

  return (
    <section className="section-py bg-dark-1">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* â”€â”€ Image column â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="relative">
            {/* Main image grid â€“ two staggered images like the theme */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-card overflow-hidden aspect-[3/4]">
                <Image
                  src={image}
                  alt="An PhÃ¡t Industry xÆ°á»Ÿng sá»­a chá»¯a"
                  fill={false}
                  width={400}
                  height={530}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="rounded-card overflow-hidden aspect-[3/4] mt-10">
                <Image
                  src={image.replace('w=800', 'w=400')}
                  alt="An PhÃ¡t Industry Ä‘á»™i ngÅ©"
                  fill={false}
                  width={400}
                  height={530}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>

            {/* Stats counter row overlapping the images */}
            <div className="mt-6">
              <StatsCounter stats={defaultStats} />
            </div>
          </div>

          {/* â”€â”€ Content column â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div>
            <div className="section-subtitle">{badge}</div>
            <h2 className="text-white font-heading font-bold leading-tight mb-4">{title}</h2>
            <p className="text-white/55 text-sm lg:text-base leading-relaxed mb-3">{subtitle}</p>
            <p className="text-white/45 text-sm leading-relaxed mb-7">{body}</p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-white/55 text-[13px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <Link href="/ve-chung-toi" className="btn-main inline-flex">
              Tìm Hiểu Thêm
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}