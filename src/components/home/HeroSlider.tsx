'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react'
import { PHONE_LINK, PHONE_DISPLAY } from '@/lib/constants'
import { defaultHeroSlides } from '@/lib/defaultContent'
import type { WithSeason } from '@/types/season'
import { cn } from '@/lib/utils'

type Slide = typeof defaultHeroSlides[number]

interface Props extends WithSeason {
  slides?: Slide[]
}

export default function HeroSlider({ slides = defaultHeroSlides, season }: Props) {
  const autoplayRef = useRef(
    Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true })
  )
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayRef.current])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="relative overflow-hidden bg-dark-1" aria-label="Hero slider">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="relative flex-shrink-0 w-full"
              style={{ minHeight: 'clamp(480px, 78vh, 760px)' }}
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />

              {/* Dark gradient overlays */}
              <div className="absolute inset-0 gradient-edge-bottom" />
              <div className="absolute inset-0 gradient-edge-top opacity-60" />
              <div className="absolute inset-0 bg-dark-1/50" />

              {/* Slide Content â€“ bottom-anchored */}
              <div className="absolute inset-0 flex items-end">
                <div className="site-container w-full pb-16 lg:pb-20">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                    <div className="lg:col-span-8">
                      {/* Badge / subtitle */}
                      <div className="section-subtitle mb-4 animate-fade-in">
                        {slide.badge}
                      </div>

                      {/* H1 */}
                      <h1 className="font-heading text-white text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] leading-[1.1] font-bold mb-4 uppercase tracking-tight animate-fade-up">
                        {slide.title}{' '}
                        <span className="text-primary">{slide.subtitle}</span>
                      </h1>
                    </div>

                    <div className="lg:col-span-4 lg:text-right">
                      <p className="text-white/65 text-sm lg:text-base leading-relaxed mb-6 animate-fade-up">
                        {slide.description}
                      </p>
                      <div className="flex flex-wrap gap-3 lg:justify-end animate-fade-up">
                        <Link href="/bao-gia" className="btn-main">
                          Đặt Lịch Ngay
                        </Link>
                        <a href={PHONE_LINK} className="btn-outline">
                          <Phone size={14} />
                          {PHONE_DISPLAY}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-card bg-dark-2/70 hover:bg-primary border border-white/10 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-card bg-dark-2/70 hover:bg-primary border border-white/10 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              'h-1 rounded-full transition-all duration-300',
              i === selectedIndex ? 'w-8 bg-primary' : 'w-4 bg-white/30 hover:bg-white/60'
            )}
          />
        ))}
      </div>

      {/* Season greeting banner (Táº¿t / NoÃ«l) */}
      {season && season !== 'normal' && (
        <div className="absolute top-6 right-6 z-10 bg-dark-2/80 backdrop-blur-sm border border-primary/30 text-white text-xs font-semibold px-4 py-2 rounded-card">
          {season === 'tet' ? 'Chúc Mừng Năm Mới 🧧' : 'Merry Christmas 🎄'}
        </div>
      )}
    </section>
  )
}