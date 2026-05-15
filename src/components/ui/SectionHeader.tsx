import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  light?: boolean
  className?: string
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 lg:mb-14',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        align === 'right' && 'text-right',
        className
      )}
    >
      {badge && (
        <span className="inline-block bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
          {badge}
        </span>
      )}
      <h2
        className={cn(
          'font-heading font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4',
          light ? 'text-white' : 'text-heading-text'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-base lg:text-lg leading-relaxed max-w-2xl',
            align === 'center' && 'mx-auto',
            light ? 'text-white/70' : 'text-gray-500'
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          'mt-5 h-1 w-16 bg-primary rounded-full',
          align === 'center' && 'mx-auto',
          align === 'right' && 'ml-auto'
        )}
      />
    </div>
  )
}
