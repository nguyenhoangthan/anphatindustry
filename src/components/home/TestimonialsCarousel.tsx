'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { WithSeason } from '@/types/season'

interface Testimonial {
  id: number
  name: string
  date: string
  rating: number
  text: string
  avatar?: string
}

const defaultTestimonials: Testimonial[] = [
  { id: 1, name: 'Nguyễn Văn Hùng', date: '7 tháng 12, 2024', rating: 5, text: 'Xe tôi sau khi bảo dưỡng tại An Phát chạy êm hơn hẳn. Nhân viên tư vấn tận tình, giá cả minh bạch. Rất hài lòng!' },
  { id: 2, name: 'Trần Thị Mai', date: '12 tháng 1, 2025', rating: 5, text: 'Lần đầu tiên ra garage mà không bị "chặt chém". Kỹ thuật viên giải thích rõ từng hạng mục, chụp hình báo cáo đầy đủ.' },
  { id: 3, name: 'Lê Minh Tuấn', date: '2 tháng 2, 2025', rating: 5, text: 'Dịch vụ đồng sơn chuyên nghiệp, màu sơn khớp hoàn hảo. Xe như mới sau tai nạn. Cảm ơn đội An Phát rất nhiều!' },
  { id: 4, name: 'Phạm Thu Hà', date: '15 tháng 3, 2025', rating: 5, text: 'Đặt lịch online nhanh, đúng giờ hẹn. Phòng chờ thoáng mát, Wi-Fi ổn định. Làm xong trong 2 tiếng như cam kết.' },
  { id: 5, name: 'Hoàng Đức Long', date: '8 tháng 4, 2025', rating: 5, text: 'Phục hồi đèn pha bị mờ chỉ trong 30 phút, giá hợp lý. Xe nhìn sáng hơn hẳn, an toàn hơn khi lái ban đêm.' },
  { id: 6, name: 'Võ Thị Lan', date: '1 tháng 5, 2025', rating: 5, text: 'Gói chăm sóc nội thất rất tỉ mỉ. Xe sạch từ trong ra ngoài, mùi khử trùng dễ chịu. Sẽ quay lại và giới thiệu bạn bè.' },
]

interface Props extends WithSeason {
  testimonials?: Testimonial[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20 fill-white/20'}
        />
      ))}
    </div>
  )
}

export default function TestimonialsCarousel({ testimonials = defaultTestimonials, season }: Props) {
  const autoplayRef = useRef(Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }))
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [autoplayRef.current]
  )
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
    <section className="section-py bg-dark-2">
      <div className="site-container">
        <div className="text-center mb-10">
          <div className="section-subtitle">Khách Hàng Nói Gì</div>
          <h2 className="text-white font-heading font-bold">Đánh Giá Từ Khách Hàng</h2>
        </div>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden -mx-3">
            <div className="flex">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-3"
                >
                  <div className="card-dark p-6 h-full flex flex-col gap-4">
                    {/* Header row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Avatar placeholder */}
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm leading-tight">{t.name}</div>
                          <div className="text-white/35 text-xs mt-0.5">{t.date}</div>
                        </div>
                      </div>
                      {/* Google icon placeholder */}
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/50">
                        G
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-2">
                      <StarRating rating={t.rating} />
                      <span className="text-white font-semibold text-xs">{t.rating}.0</span>
                    </div>

                    {/* Text */}
                    <p className="text-white/50 text-[13px] leading-relaxed flex-1">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-3 hover:bg-primary border border-white/10 flex items-center justify-center text-white transition-all duration-200 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-3 hover:bg-primary border border-white/10 flex items-center justify-center text-white transition-all duration-200 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-1.5 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === selectedIndex ? 'w-6 bg-primary' : 'w-1.5 bg-white/20 hover:bg-white/40'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
