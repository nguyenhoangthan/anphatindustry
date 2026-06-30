'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown, Mail, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig, PHONE_DISPLAY, PHONE_LINK, NAV_ITEMS } from '@/lib/constants'
import Logo from './Logo'

// ─── TopBar ──────────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div className="hidden lg:block border-b border-border bg-dark-2">
      <div className="site-container flex items-center justify-between py-2.5">
        <div className="flex items-center gap-2 text-body text-xs">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>Chuyên nghiệp – Uy tín – Tận tâm tại TP. Hồ Chí Minh</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-body">
          <span className="flex items-center gap-1.5">
            <Clock size={11} className="text-primary" />
            {siteConfig.workingHours}
          </span>
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-heading transition-colors">
            <Mail size={11} className="text-primary" />
            {siteConfig.email}
          </a>
          <a href={PHONE_LINK} className="flex items-center gap-1.5 text-primary font-semibold hover:text-accent transition-colors">
            <Phone size={11} />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const toggleDropdown = useCallback(
    (href: string) => setOpenDropdown((prev) => (prev === href ? null : href)),
    []
  )

  return (
    <>
      <TopBar />

      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300 bg-dark-1',
          isScrolled ? 'shadow-card-dark' : ''
        )}
      >
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />

        <div className="site-container" ref={navRef}>
          <div className="flex items-center justify-between h-[72px] lg:h-20">

            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <Logo />
              <div className="hidden sm:block border-l border-border pl-3">
                <div className="font-heading font-bold text-heading text-sm lg:text-base leading-tight tracking-wide uppercase">
                  An Phát Industry
                </div>
                <div className="text-muted text-[10px] font-medium tracking-widest uppercase">
                  Bảo Dưỡng · Mô Hình · Đào Tạo
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                const isOpen = openDropdown === item.href
                return (
                  <div key={item.href} className="relative">
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.href)}
                          className={cn(
                            'flex items-center gap-1 px-3 py-2.5 text-[13px] font-semibold tracking-wide transition-colors rounded-btn whitespace-nowrap',
                            isActive || isOpen ? 'text-primary' : 'text-body hover:text-heading'
                          )}
                        >
                          {item.label}
                          <ChevronDown size={13} className={cn('transition-transform duration-200 mt-px', isOpen && 'rotate-180')} />
                        </button>
                        {isOpen && (
                          <div className="absolute top-full left-0 mt-2 min-w-[230px] rounded-card py-2 z-50 shadow-card-hover border border-border bg-white">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  'block px-5 py-2.5 text-[13px] font-medium transition-colors',
                                  pathname === child.href ? 'text-primary' : 'text-body hover:text-heading hover:bg-dark-2'
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'block px-3 py-2.5 text-[13px] font-semibold tracking-wide transition-colors rounded-btn whitespace-nowrap',
                          isActive ? 'text-primary' : 'text-body hover:text-heading'
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
                    )}
                  </div>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/lien-he" className="btn-main hidden lg:inline-flex text-[13px] py-2.5 px-5">
                Đặt Lịch Ngay
              </Link>
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className="lg:hidden w-10 h-10 rounded-card bg-dark-2 flex items-center justify-center text-heading transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col bg-dark-1">
          <div className="flex items-center justify-between px-5 h-[72px] border-b border-border bg-dark-2 flex-shrink-0">
            <span className="font-heading font-bold text-heading text-sm uppercase tracking-wide">An Phát Industry</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-9 h-9 rounded-card bg-white border border-border flex items-center justify-center text-heading transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3.5 rounded-card text-sm font-semibold tracking-wide transition-colors',
                    pathname === item.href ? 'text-primary bg-primary-dim' : 'text-body hover:text-heading hover:bg-dark-2'
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 mt-1 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2.5 rounded-card text-[13px] text-muted hover:text-heading hover:bg-dark-2 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex-shrink-0 p-5 border-t border-border space-y-3">
            <Link href="/lien-he" onClick={() => setIsMenuOpen(false)} className="btn-main w-full justify-center py-3.5 text-sm">
              Đặt Lịch Ngay
            </Link>
            <a href={PHONE_LINK} className="btn-outline w-full justify-center py-3 text-sm">
              <Phone size={15} /> Gọi: {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
