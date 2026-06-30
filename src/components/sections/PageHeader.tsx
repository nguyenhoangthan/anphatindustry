import Image from 'next/image'
import Link from 'next/link'
import type { WithSeason } from '@/types/season'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props extends WithSeason {
  title: string
  breadcrumbs?: BreadcrumbItem[]
  /** Optional full-URL or /images/... path for the background */
  backgroundSrc?: string
}

const DEFAULT_BG = '/images/background/9.webp'

export default function PageHeader({
  title,
  breadcrumbs = [],
  backgroundSrc = DEFAULT_BG,
  season,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-accent py-20 text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundSrc}
          alt={title}
          fill
          className="object-cover opacity-25"
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 gradient-edge-top" />
      <div className="absolute inset-0 gradient-edge-bottom" />

      {/* Thin primary-color top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />

      {/* Content */}
      <div className="relative z-10 site-container text-center">
        <h1 className="text-white font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
          {title}
        </h1>

        {breadcrumbs.length > 0 && (
          <>
            <div className="h-px w-16 bg-white/20 mx-auto mb-4" />
            <ul className="crumb justify-center">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className={i === breadcrumbs.length - 1 ? 'active' : undefined}>
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-primary transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    crumb.label
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Season decoration (Tết / Noël) */}
      {season === 'tet' && (
        <div className="absolute top-4 right-8 text-4xl opacity-30 select-none pointer-events-none">
          🧧🌸
        </div>
      )}
      {season === 'noel' && (
        <div className="absolute top-4 right-8 text-4xl opacity-30 select-none pointer-events-none">
          🎄❄️
        </div>
      )}
    </section>
  )
}
