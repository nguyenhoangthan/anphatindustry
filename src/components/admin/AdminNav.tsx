'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, Wrench, BookOpen, Settings, LogOut,
  Images, Info, Star, GitBranch, Users, DollarSign, Handshake, Megaphone,
  type LucideIcon,
} from 'lucide-react'

const navSections: { label: string | null; items: { href: string; label: string; icon: LucideIcon; exact?: boolean }[] }[] = [
  {
    label: null,
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { href: '/admin/services', label: 'Dịch Vụ', icon: Wrench },
      { href: '/admin/posts', label: 'Bài Viết', icon: BookOpen },
    ],
  },
  {
    label: 'NỘI DUNG TRANG',
    items: [
      { href: '/admin/homepage/hero', label: 'Hero Slider', icon: Images },
      { href: '/admin/homepage/about', label: 'Giới Thiệu (Trang Chủ)', icon: Info },
      { href: '/admin/homepage/why-us', label: 'Tại Sao Chọn Chúng Tôi', icon: Star },
      { href: '/admin/homepage/process', label: 'Quy Trình Dịch Vụ', icon: GitBranch },
      { href: '/admin/homepage/partners', label: 'Đối Tác & Số Liệu', icon: Handshake },
      { href: '/admin/homepage/cta', label: 'Cam Kết & CTA', icon: Megaphone },
      { href: '/admin/pricing', label: 'Báo Giá', icon: DollarSign },
      { href: '/admin/team', label: 'Đội Ngũ & Về Chúng Tôi', icon: Users },
    ],
  },
  {
    label: 'HỆ THỐNG',
    items: [
      { href: '/admin/settings', label: 'Cài Đặt Công Ty', icon: Settings },
    ],
  },
]

export default function AdminNav({ username }: { username: string }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#0B2447] min-h-screen flex flex-col fixed top-0 left-0 z-40 border-r border-white/5 shadow-2xl">
      {/* Logo */}
      <div className="p-5 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E63312] rounded-xl flex items-center justify-center font-black text-white text-sm flex-shrink-0">
            AP
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">An Phát Industry</p>
            <p className="text-white/50 text-xs mt-0.5">Quản Trị Website</p>
          </div>
        </div>
      </div>

      {/* Nav – scrollable */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
        {navSections.map((section, si) => (
          <div key={si}>
            {section.label && (
              <p className="text-white/25 text-[10px] font-bold uppercase tracking-widest px-2 mb-1.5">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon, exact }) => {
                const isActive = exact ? pathname === href : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'text-white/55 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={14} className="flex-shrink-0" />
                    <span className="truncate">{label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-white/10 flex-shrink-0">
        <p className="text-white/40 text-xs mb-3 truncate">
          Xin chào, <span className="text-white/70 font-medium">{username}</span>
        </p>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors w-full"
        >
          <LogOut size={14} />
          Đăng Xuất
        </button>
      </div>
    </aside>
  )
}

