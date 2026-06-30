import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center flex-wrap gap-1.5 text-sm">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-body hover:text-heading transition-colors"
          >
            <Home size={13} />
            <span>Trang chủ</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight size={12} className="text-muted" />
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="text-body hover:text-heading transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-heading font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
