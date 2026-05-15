import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'accent' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: Variant
  size?: Size
  className?: string
  external?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-primary-900 hover:bg-primary-800 text-white border-transparent shadow-sm hover:shadow-md',
  accent:
    'bg-accent-500 hover:bg-accent-600 text-white border-transparent shadow-sm hover:shadow-md',
  outline:
    'bg-transparent border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white',
  ghost: 'bg-transparent border-transparent text-primary-900 hover:bg-primary-50',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
}

const baseStyles =
  'inline-flex items-center justify-center font-bold border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

export default function Button({
  children,
  href,
  onClick,
  variant = 'accent',
  size = 'md',
  className,
  external = false,
  disabled = false,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className
  )

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
