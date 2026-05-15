import Link from 'next/link'
import { Phone, CalendarCheck, MapPin } from 'lucide-react'
import { siteConfig, PHONE_DISPLAY, PHONE_LINK } from '@/lib/constants'
import { defaultContactCTA } from '@/lib/defaultContent'

type CTAData = typeof defaultContactCTA

export default function ContactCTA({ data = defaultContactCTA }: { data?: CTAData }) {
  return (
    <section className="py-16 lg:py-20 bg-accent-500 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-black text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            {data.headline}
          </h2>
          <p className="text-white/90 text-lg lg:text-xl font-semibold mb-3">
            {data.quote}
          </p>
          <p className="text-white/70 text-base mb-8 max-w-xl mx-auto">
            {data.body}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href={data.cta1Href}
              className="inline-flex items-center gap-2.5 bg-white text-accent-500 hover:bg-gray-50 font-black px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-base"
            >
              <CalendarCheck size={20} />
              {data.cta1Text}
            </Link>
            <a
              href={PHONE_LINK}
              className="inline-flex items-center gap-2.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-200 text-base"
            >
              <Phone size={20} />
              {PHONE_DISPLAY}
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
            <MapPin size={14} />
            <span>{siteConfig.address}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
