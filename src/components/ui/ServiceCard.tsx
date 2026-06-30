import Link from 'next/link'
import Image from 'next/image'
import type { Service } from '@/types'
import type { WithSeason } from '@/types/season'

interface ServiceCardProps extends WithSeason {
  service: Service
  /** Zero-based position for the number label (01, 02, …) */
  index?: number
  compact?: boolean
}

export default function ServiceCard({ service, index, compact = false }: Omit<ServiceCardProps, 'season'>) {
  const num = String((index ?? 0) + 1).padStart(2, '0')

  return (
    <article className="group relative rounded-card overflow-hidden hover-scale-img">
      {/* Thumbnail */}
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          width={600}
          height={450}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Number badge – top-left */}
      <span className="absolute top-4 left-4 font-heading font-bold text-white/30 text-3xl leading-none z-10 select-none">
        {num}
      </span>

      {/* Gradient overlay – always visible bottom */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 gradient-edge-bottom pointer-events-none" />

      {/* Default bottom label */}
      <div className="absolute inset-x-0 bottom-0 pb-4 px-4 z-10 transition-opacity duration-300 group-hover:opacity-0">
        <h3 className="text-white font-heading font-bold text-lg leading-snug">{service.title}</h3>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-accent/90 backdrop-blur-sm flex flex-col items-center justify-center px-5 text-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
        {!compact && (
          <p className="text-white/70 text-[13px] leading-relaxed mb-5">
            {service.shortDescription}
          </p>
        )}
        <Link href={`/dich-vu/${service.slug}`} className="btn-main text-sm py-2.5 px-6">
          Xem Chi Tiết
        </Link>
      </div>

      {/* Primary-color bottom gradient on hover */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 gradient-edge-bottom-color pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
    </article>
  )
}
