'use client'

import { Phone, MessageCircle, CalendarCheck } from 'lucide-react'
import Link from 'next/link'
import { siteConfig, PHONE_LINK } from '@/lib/constants'

export default function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      {/* Zalo */}
      {siteConfig.social.zalo && (
        <a
          href={siteConfig.social.zalo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat Zalo"
          className="group flex items-center gap-2 bg-[#0068FF] hover:brightness-110 text-white h-11 rounded-card shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden px-3.5"
        >
          <MessageCircle size={18} className="flex-shrink-0" />
          <span className="text-[13px] font-semibold whitespace-nowrap max-w-0 group-hover:max-w-[80px] overflow-hidden transition-all duration-300">
            Zalo
          </span>
        </a>
      )}

      {/* Đặt lịch */}
      <Link
        href="/lien-he"
        aria-label="Đặt lịch hẹn"
        className="group flex items-center gap-2 text-white h-11 rounded-card shadow-lg hover:shadow-primary transition-all duration-300 overflow-hidden px-3.5 bg-primary hover:brightness-110"
      >
        <CalendarCheck size={18} className="flex-shrink-0" />
        <span className="text-[13px] font-semibold whitespace-nowrap max-w-0 group-hover:max-w-[80px] overflow-hidden transition-all duration-300">
          Đặt lịch
        </span>
      </Link>

      {/* Phone */}
      <a
        href={PHONE_LINK}
        aria-label="Gọi điện"
        className="group flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white h-11 rounded-card shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden px-3.5 animate-bounce-slow"
      >
        <Phone size={18} className="flex-shrink-0" />
        <span className="text-[13px] font-semibold whitespace-nowrap max-w-0 group-hover:max-w-[100px] overflow-hidden transition-all duration-300">
          Gọi ngay
        </span>
      </a>
    </div>
  )
}

