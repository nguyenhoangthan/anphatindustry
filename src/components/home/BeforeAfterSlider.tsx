'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import type { WithSeason } from '@/types/season'

interface Props extends WithSeason {
  beforeSrc?: string
  afterSrc?: string
  beforeAlt?: string
  afterAlt?: string
}

const DEFAULT_BEFORE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
const DEFAULT_AFTER  = 'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=800&q=80'

export default function BeforeAfterSlider({
  beforeSrc = DEFAULT_BEFORE,
  afterSrc  = DEFAULT_AFTER,
  beforeAlt = 'Trước khi xử lý',
  afterAlt  = 'Sau khi xử lý',
}: Omit<Props, 'season'>) {
  const [position, setPosition] = useState(50) // percentage 0–100
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    const pct = Math.min(Math.max(((clientX - left) / width) * 100, 0), 100)
    setPosition(pct)
  }, [])

  // Mouse
  const onMouseDown = () => { isDragging.current = true }
  const onMouseUp   = () => { isDragging.current = false }
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX)
  }

  // Touch
  const onTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX)
  }

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)
    return () => window.removeEventListener('mouseup', onMouseUp)
  }, [])

  return (
    <section className="section-py bg-dark-1">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="section-subtitle">Kết Quả Thực Tế</div>
            <h2 className="text-heading font-heading font-bold leading-tight mb-4">
              Trước &amp; Sau: Sự Biến Đổi Hoàn Toàn
            </h2>
            <p className="text-body text-sm leading-relaxed mb-6">
              Chứng kiến sự khác biệt rõ rệt mà đội ngũ An Phát Industry mang lại — từ việc phục hồi độ bóng sơn xe, làm mới nội thất đến xử lý vết trầy xước sâu, thân xe méo.
            </p>
            <ul className="space-y-3">
              {['Phục hồi độ bóng sơn xe', 'Xử lý vết trầy – lõm thân xe', 'Đánh bóng & phủ nano bảo vệ', 'Vệ sinh khoang máy chuyên sâu'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-body text-[13px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Slider */}
          <div
            ref={containerRef}
            className="relative rounded-card overflow-hidden select-none cursor-ew-resize"
            style={{ aspectRatio: '4/3' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
          >
            {/* After (base layer) */}
            <Image
              src={afterSrc}
              alt={afterAlt}
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />

            {/* Before (clipped on top) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                src={beforeSrc}
                alt={beforeAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Labels */}
            <span className="absolute top-4 left-4 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm z-10">
              Trước
            </span>
            <span className="absolute top-4 right-4 bg-primary/90 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
              Sau
            </span>

            {/* Divider handle */}
            <div
              className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
              style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
            >
              {/* Line */}
              <div className="w-0.5 h-full bg-white/80 absolute" />
              {/* Drag knob */}
              <div className="relative w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center z-10">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M5 9H13M5 9L7.5 6.5M5 9L7.5 11.5M13 9L10.5 6.5M13 9L10.5 11.5" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
