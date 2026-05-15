'use client'

import { useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { defaultPartnersSection } from '@/lib/defaultContent'
import type { WithSeason } from '@/types/season'

type PartnersData = typeof defaultPartnersSection

interface Props extends WithSeason {
  data?: PartnersData
}

export default function PartnersSection({ data = defaultPartnersSection, season }: Props) {
  const { partners } = data
  const autoplayRef = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }))
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [autoplayRef.current]
  )

  return (
    <section className="py-10 bg-dark-2 border-y border-white/5">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8 items-center">
          {/* Duplicate for seamless loop */}
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="flex-shrink-0 flex items-center justify-center px-6 py-2 opacity-30 hover:opacity-70 transition-opacity duration-300"
              style={{ minWidth: '120px' }}
            >
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-card bg-dark-3 flex items-center justify-center text-white font-bold text-sm">
                  {partner.abbr}
                </div>
                <span className="text-white/50 text-[11px] font-medium text-center whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 lg:mb-20"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
            >
              <div className="font-heading font-black text-3xl lg:text-4xl text-accent-500 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Partners */}
        <SectionHeader
          badge={badge}
          title={title}
          subtitle={subtitle}
        />

        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all duration-200 aspect-square"
            >
              <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                {partner.abbr}
              </div>
              <span className="text-gray-500 text-[10px] font-medium text-center leading-tight">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          {footnote}
        </p>
      </div>
    </section>
  )
}
