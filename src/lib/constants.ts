import type { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'CÔNG TY CỔ PHẦN SẢN XUẤT THƯƠNG MẠI DỊCH VỤ TƯ VẤN AN PHÁT',
  shortName: 'An Phát',
  tagline: 'Bảo dưỡng ô tô | Mô hình đào tạo | Tư vấn giải pháp kỹ thuật',
  description:
    'AN PHÁT là tâm huyết kết tinh từ sự hợp tác giữa Công ty TNHH TM DV Ô tô Hoàng Phát (chuyên bảo dưỡng, sửa chữa) và Công ty CP SX TM DV Tư vấn An Lạc (chuyên mô hình động cơ và giải pháp đào tạo). Với nền tảng hơn 14 năm kinh nghiệm trong ngành ô tô, chúng tôi không ngừng nỗ lực và sáng tạo để mang đến những dịch vụ đa dạng cùng chất lượng hoàn hảo nhất cho khách hàng.',
  url: 'https://anphatindustry.com',
  phone: ['0908643528', '0977747178'],
  email: 'sales@anphatindustry.com',
  address: '78 Lê Tấn Bê, Phường An Lạc, Quận Bình Tân, TP. Hồ Chí Minh',
  workingHours: '07:30 – 17:30 từ Thứ 2 đến Chủ Nhật',
  social: {
    facebook: 'https://facebook.com/anphatindustry',
    zalo: '',
    youtube: 'https://youtube.com/@anphatindustry',
    tiktok: '',
  },
  businessNumber: '0318365059',
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
