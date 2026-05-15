import Link from 'next/link'
import { Phone, CalendarCheck } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_LINK } from '@/lib/constants'
import { defaultContactCTA } from '@/lib/defaultContent'

export default function ContactCTA({ data = defaultContactCTA }: { data?: typeof defaultContactCTA }) {
  return (
    <section className="section-py bg-primary relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white" />
        <div className="absolute -bottom-12 -left-12 w-60 h-60 rounded-full bg-white" />
      </div>

      <div className="site-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
            Cam Kết Vàng
          </p>
          <h2 className="font-heading font-black text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            {data.headline}
          </h2>
          <p className="text-white text-lg font-bold mb-3">{data.quote}</p>
          <p className="text-white/70 text-base mb-10 max-w-xl mx-auto">{data.body}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={data.cta1Href}
              className="inline-flex items-center gap-2.5 bg-white text-primary font-bold px-8 py-4 rounded-btn shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-200 text-sm uppercase tracking-wide"
            >
              <CalendarCheck size={18} />
              {data.cta1Text}
            </Link>
            <a
              href={PHONE_LINK}
              className="inline-flex items-center gap-2.5 border-2 border-white/60 text-white font-bold px-8 py-4 rounded-btn hover:border-white hover:bg-white/10 transition-all duration-200 text-sm uppercase tracking-wide"
            >
              <Phone size={18} />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}