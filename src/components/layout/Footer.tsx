import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Facebook, Youtube } from 'lucide-react'
import { siteConfig, NAV_ITEMS } from '@/lib/constants'
import Logo from './Logo'

const serviceLinks = [
  { label: 'Bảo Dưỡng & Sửa Chữa', href: '/dich-vu/bao-duong-sua-chua' },
  { label: 'Đồng Sơn', href: '/dich-vu/dong-son' },
  { label: 'Chăm Sóc & Làm Đẹp Xe', href: '/dich-vu/cham-soc-lam-dep' },
  { label: 'Hỗ Trợ', href: '/dich-vu/ho-tro' },
  { label: 'Xe Điện', href: '/dich-vu/xe-dien' },
  { label: 'Mô Hình Đào Tạo', href: '/mo-hinh' },
]

const legalLinks = [
  { label: 'Chính Sách Bảo Mật', href: '/chinh-sach-bao-mat' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-footer text-white">
      <div className="site-container py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 – Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Logo />
              <div className="border-l border-white/15 pl-3">
                <div className="font-heading font-bold text-white text-sm leading-tight uppercase tracking-wide">
                  An Phát Industry
                </div>
                <div className="text-white/35 text-[10px] uppercase tracking-widest">
                  Bảo Dưỡng · Mô Hình · Đào Tạo
                </div>
              </div>
            </Link>
            <p className="text-white/45 text-[13px] leading-relaxed mb-6">
              Trung tâm bảo dưỡng – sửa chữa ô tô chuyên nghiệp tại TP.HCM. Uy tín – Tận tâm – Minh bạch trong từng dịch vụ.
            </p>
            <div className="flex items-center gap-2.5">
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="w-9 h-9 rounded-card bg-white/10 hover:bg-primary flex items-center justify-center transition-colors text-white/70 hover:text-white">
                  <Facebook size={15} />
                </a>
              )}
              {siteConfig.social.youtube && (
                <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                  className="w-9 h-9 rounded-card bg-white/10 hover:bg-primary flex items-center justify-center transition-colors text-white/70 hover:text-white">
                  <Youtube size={15} />
                </a>
              )}
              {siteConfig.social.zalo && (
                <a href={siteConfig.social.zalo} target="_blank" rel="noopener noreferrer" aria-label="Zalo"
                  className="w-9 h-9 rounded-card bg-white/10 hover:bg-primary flex items-center justify-center transition-colors text-white/70 hover:text-white text-xs font-bold">
                  Z
                </a>
              )}
              {siteConfig.social.tiktok && (
                <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                  className="w-9 h-9 rounded-card bg-white/10 hover:bg-primary flex items-center justify-center transition-colors text-white/70 hover:text-white text-xs font-bold">
                  TT
                </a>
              )}
            </div>
          </div>

          {/* Col 2 – Services */}
          <div>
            <h5 className="text-white text-[13px] font-bold uppercase tracking-wider mb-5 pb-3 border-b border-white/10">
              Dịch Vụ
            </h5>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/45 text-[13px] hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Quick Links */}
          <div>
            <h5 className="text-white text-[13px] font-bold uppercase tracking-wider mb-5 pb-3 border-b border-white/10">
              Liên Kết Nhanh
            </h5>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/45 text-[13px] hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 – Contact */}
          <div>
            <h5 className="text-white text-[13px] font-bold uppercase tracking-wider mb-5 pb-3 border-b border-white/10">
              Liên Hệ
            </h5>
            <ul className="space-y-4">
              {siteConfig.locations.map((loc) => (
                <li key={loc.address} className="flex items-start gap-3">
                  <MapPin size={15} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-white/45 text-[13px] leading-relaxed">
                    <span className="text-white/70 font-semibold">{loc.name}:</span> {loc.address}
                  </span>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Clock size={15} className="text-primary flex-shrink-0" />
                <span className="text-white/45 text-[13px]">{siteConfig.workingHours}</span>
              </li>
              {siteConfig.phone.map((phone) => (
                <li key={phone} className="flex items-center gap-3">
                  <Phone size={15} className="text-primary flex-shrink-0" />
                  <a href={`tel:+84${phone.replace(/^0/, '').replace(/\s/g, '')}`}
                    className="text-white/45 text-[13px] hover:text-primary transition-colors">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-primary flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="text-white/45 text-[13px] hover:text-primary transition-colors">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-white/10 bg-accent-900">
        <div className="site-container py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {currentYear} {siteConfig.name}. All rights reserved. MSDN: {siteConfig.businessNumber}
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/30 text-xs hover:text-white/60 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
