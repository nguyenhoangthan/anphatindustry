'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown, Mail, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig, PHONE_DISPLAY, PHONE_LINK, NAV_ITEMS } from '@/lib/constants'

// ─── TopBar ──────────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div className="hidden lg:block border-b border-white/5 bg-dark-2">
      <div className="site-container flex items-center justify-between py-2.5">
        <div className="flex items-center gap-2 text-white/40 text-xs">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>Chuyên nghiệp – Uy tín – Tận tâm tại TP. Hồ Chí Minh</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <Clock size={11} className="text-primary" />
            {siteConfig.workingHours}
          </span>
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={11} className="text-primary" />
            {siteConfig.email}
          </a>
          <a href={PHONE_LINK} className="flex items-center gap-1.5 text-primary font-semibold hover:text-white transition-colors">
            <Phone size={11} />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Main Header ─────────────────────────────────────────────────────────────
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
          isScrolled ? 'shadow-lg shadow-black/40' : 'backdrop-blur-sm'
        )}
      >
        {/* Primary color underline */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-primary opacity-20" />

        <div className="site-container" ref={navRef}>
          <div className="flex items-center justify-between h-[72px] lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-card bg-primary flex items-center justify-center font-heading font-black text-white text-lg flex-shrink-0">
                AP
              </div>
              <div className="hidden sm:block">
                <div className="font-heading font-bold text-white text-sm lg:text-base leading-tight tracking-wide uppercase">
                  An Phát Industry
                </div>
                <div className="text-white/35 text-[10px] font-medium tracking-widest uppercase">
                  Bảo Dưỡng · Sửa Chữa · Chăm Sóc
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
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
                            'flex items-center gap-1 px-4 py-2.5 text-[13px] font-semibold tracking-wide transition-colors rounded-btn',
                            isActive || isOpen ? 'text-primary' : 'text-white/65 hover:text-white'
                          )}
                        >
                          {item.label}
                          <ChevronDown size={13} className={cn('transition-transform duration-200 mt-px', isOpen && 'rotate-180')} />
                        </button>
                        {isOpen && (
                          <div className="absolute top-full left-0 mt-2 min-w-[200px] rounded-card py-2 z-50 shadow-card-dark border border-white/5 bg-dark-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  'block px-5 py-2.5 text-[13px] font-medium transition-colors',
                                  pathname === child.href ? 'text-primary' : 'text-white/55 hover:text-white hover:bg-white/5'
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
                          'block px-4 py-2.5 text-[13px] font-semibold tracking-wide transition-colors rounded-btn',
                          isActive ? 'text-primary' : 'text-white/65 hover:text-white'
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-primary" />
                    )}
                  </div>
                )
              })}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Link href="/bao-gia" className="btn-main hidden lg:inline-flex text-[13px] py-2.5 px-5">
                Đặt Lịch Ngay
              </Link>
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className="lg:hidden w-10 h-10 rounded-card bg-dark-3 flex items-center justify-center text-white/65 hover:text-white transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col bg-dark-1">
          <div className="flex items-center justify-between px-5 h-[72px] border-b border-white/5 bg-dark-2 flex-shrink-0">
            <span className="font-heading font-bold text-white text-sm uppercase tracking-wide">An Phát Industry</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-9 h-9 rounded-card bg-dark-3 flex items-center justify-center text-white/65 hover:text-white transition-colors"
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
                    pathname === item.href ? 'text-primary bg-primary-dim' : 'text-white/65 hover:text-white hover:bg-white/5'
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
                        className="block px-4 py-2.5 rounded-card text-[13px] text-white/45 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex-shrink-0 p-5 border-t border-white/5 space-y-3">
            <Link href="/bao-gia" onClick={() => setIsMenuOpen(false)} className="btn-main w-full justify-center py-3.5 text-sm">
              Đặt Lịch Bảo Dưỡng
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

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-primary-900 text-white/80 text-sm py-2">
        <div className="container flex items-center justify-between">
          <span className="text-xs">{siteConfig.workingHours}</span>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-white transition-colors text-xs"
            >
              {siteConfig.email}
            </a>
            <a
              href={PHONE_LINK}
              className="flex items-center gap-1.5 text-accent-400 font-semibold hover:text-accent-300 transition-colors"
            >
              <Phone size={13} />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-primary-900 shadow-lg shadow-black/20'
            : 'bg-primary-900/95 backdrop-blur-sm'
        )}
      >
        <div className="container" ref={dropdownRef}>
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-accent-500 rounded-lg flex items-center justify-center font-heading font-black text-white text-lg lg:text-xl">
                AP
              </div>
              <div className="hidden sm:block">
                <div className="font-heading font-bold text-white text-base lg:text-lg leading-tight">
                  AN PHÁT INDUSTRY
                </div>
                <div className="text-white/60 text-[10px] lg:text-xs font-medium tracking-wide uppercase">
                  Bảo Dưỡng · Sửa Chữa · Chăm Sóc Ô Tô
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.href} className="relative">
                  {item.children ? (
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.href ? null : item.href)
                      }
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 text-sm font-semibold tracking-wide rounded transition-colors',
                        pathname.startsWith(item.href) && item.href !== '/'
                          ? 'text-accent-400'
                          : 'text-white/85 hover:text-white',
                        openDropdown === item.href && 'text-accent-400'
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform duration-200',
                          openDropdown === item.href && 'rotate-180'
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'px-3 py-2 text-sm font-semibold tracking-wide rounded transition-colors block',
                        (pathname === item.href ||
                          (item.href !== '/' && pathname.startsWith(item.href)))
                          ? 'text-accent-400'
                          : 'text-white/85 hover:text-white'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.children && openDropdown === item.href && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 min-w-[220px] bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block px-4 py-2.5 text-sm font-medium transition-colors',
                              pathname === child.href
                                ? 'text-accent-500 bg-accent-50'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-primary-900'
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href={PHONE_LINK}
                className="hidden lg:flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
              >
                <Phone size={14} />
                Đặt Lịch Ngay
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-primary-950 border-t border-white/10 overflow-hidden"
            >
              <nav className="container py-4 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-colors',
                        pathname === item.href
                          ? 'text-accent-400 bg-white/5'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="pl-4 flex flex-col gap-0.5 mt-0.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-3 mt-1 border-t border-white/10">
                  <a
                    href={PHONE_LINK}
                    className="flex items-center justify-center gap-2 bg-accent-500 text-white px-4 py-3 rounded-lg font-bold transition-colors"
                  >
                    <Phone size={16} />
                    Gọi Ngay: {PHONE_DISPLAY}
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
