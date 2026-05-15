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

export default function AboutSection({ data = defaultAboutSection, season }: Props) {
  const { badge, title, subtitle, body, image, highlights } = data

  return (
    <section className="section-py bg-dark-1">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Image column ───────────────────────────── */}
          <div className="relative">
            {/* Main image grid – two staggered images like the theme */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-card overflow-hidden aspect-[3/4]">
                <Image
                  src={image}
                  alt="An Phát Industry xưởng sửa chữa"
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
                  alt="An Phát Industry đội ngũ"
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
              <StatsCounter stats={defaultStats} season={season} />
            </div>
          </div>

          {/* ── Content column ─────────────────────────── */}
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

  const { badge, title, subtitle, body, image, highlights, stat1Value, stat1Label, stat2Value, stat2Label } = data
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <Image
                src={image}
                alt="An Phát Industry – Xưởng sửa chữa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-accent-500 text-white rounded-2xl p-5 shadow-2xl hidden sm:block">
              <div className="text-4xl font-black font-heading leading-none">{stat1Value}</div>
              <div className="text-sm font-semibold mt-1 text-white/90">{stat1Label}</div>
            </div>
            {/* Second Floating Card */}
            <div className="absolute -top-6 -left-6 bg-primary-900 text-white rounded-2xl p-5 shadow-2xl hidden sm:block">
              <div className="text-4xl font-black font-heading leading-none">{stat2Value}</div>
              <div className="text-sm font-semibold mt-1 text-white/90">{stat2Label}</div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              badge={badge}
              title={title}
              subtitle={subtitle}
              align="left"
            />

            <p className="text-gray-600 leading-relaxed mb-6 text-sm lg:text-base">
              {body}
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="text-accent-500 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-gray-700 text-sm lg:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/ve-chung-toi"
              className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white font-bold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              Tìm Hiểu Thêm <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
