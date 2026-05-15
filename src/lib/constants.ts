import type { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'An Phát Industry',
  shortName: 'An Phát',
  tagline: 'Trung Tâm Bảo Dưỡng – Sửa Chữa Ô Tô Uy Tín, Chuyên Nghiệp',
  description:
    'An Phát Industry – Trung tâm bảo dưỡng, sửa chữa, chăm sóc ô tô chuyên nghiệp tại TP.HCM. Đội ngũ kỹ thuật viên giàu kinh nghiệm, công nghệ hiện đại, cam kết chất lượng.',
  url: 'https://anphatindustry.com',
  phone: ['0901 234 567', '0912 345 678'],
  email: 'info@anphatindustry.com',
  address: '123 Nguyễn Văn Linh, Phường Tân Phong, Quận 7, TP. Hồ Chí Minh',
  workingHours: '07:30 – 17:30 từ Thứ 2 đến Chủ Nhật',
  social: {
    facebook: 'https://facebook.com/anphatindustry',
    zalo: 'https://zalo.me/0901234567',
    youtube: 'https://youtube.com/@anphatindustry',
    tiktok: 'https://tiktok.com/@anphatindustry',
  },
  businessNumber: '0315XXXXXX',
}

export const PHONE_DISPLAY = siteConfig.phone[0]
export const PHONE_LINK = `tel:+84${siteConfig.phone[0].replace(/^0/, '').replace(/\s/g, '')}`

export interface NavChild {
  label: string
  href: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavChild[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'TRANG CHỦ', href: '/' },
  { label: 'GIỚI THIỆU', href: '/ve-chung-toi' },
  {
    label: 'DỊCH VỤ',
    href: '/dich-vu',
    children: [
      { label: 'Sửa Chữa Chung', href: '/dich-vu/sua-chua-chung' },
      { label: 'Chăm Sóc Xe Hơi', href: '/dich-vu/cham-soc-xe' },
      { label: 'Đồng Sơn', href: '/dich-vu/dong-son' },
      { label: 'Sửa Chữa Lưu Động', href: '/dich-vu/sua-chua-luu-dong' },
    ],
  },
  { label: 'BÁO GIÁ', href: '/bao-gia' },
  {
    label: 'THƯ VIỆN',
    href: '/thu-vien',
    children: [
      { label: 'Chia Sẻ Kinh Nghiệm', href: '/thu-vien/kinh-nghiem' },
      { label: 'Tin Tức Ô Tô', href: '/thu-vien/tin-tuc' },
    ],
  },
  { label: 'LIÊN HỆ', href: '/lien-he' },
]
