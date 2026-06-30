import Image from 'next/image'
import { cn } from '@/lib/utils'

// Logo thật (A xám + P đỏ) trích từ logo.cdr, đặt trong badge nền trắng bo góc.
// File: public/images/logo.png (362×193). Thay file này nếu có bản logo mới.
interface Props {
  /** kept for compatibility; badge trắng hợp cả nền sáng (header) lẫn nền indigo (footer) */
  variant?: 'light' | 'dark'
  className?: string
}

export default function Logo({ className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center bg-white rounded-xl border border-border shadow-card-dark',
        'h-10 lg:h-11 px-2.5',
        className
      )}
    >
      <Image
        src="/images/logo.png"
        alt="An Phát"
        width={362}
        height={193}
        priority
        className="h-6 lg:h-7 w-auto"
      />
    </span>
  )
}
