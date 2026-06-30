'use client'

import { useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { defaultPartnersSection } from '@/lib/defaultContent'
import type { WithSeason } from '@/types/season'

type PartnersData = typeof defaultPartnersSection

interface Props extends WithSeason {
  data?: PartnersData
}

export default function PartnersSection({ data = defaultPartnersSection }: Props) {
  const { partners } = data
  const autoplayRef = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }))
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [autoplayRef.current]
  )

  return (
    <section className="py-10 bg-dark-2 border-y border-border">
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
                <div className="w-10 h-10 rounded-card bg-accent flex items-center justify-center text-white font-bold text-sm">
                  {partner.abbr}
                </div>
                <span className="text-body text-[11px] font-medium text-center whitespace-nowrap">
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