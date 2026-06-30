import type { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'CÔNG TY CỔ PHẦN SẢN XUẤT THƯƠNG MẠI DỊCH VỤ TƯ VẤN AN PHÁT',
  shortName: 'An Phát',
  tagline: 'Bảo dưỡng ô tô | Mô hình đào tạo | Tư vấn giải pháp kỹ thuật',
  description:
    'AN PHÁT là tâm huyết kết tinh từ sự hợp tác giữa Công ty TNHH TM DV Ô tô Hoàng Phát (chuyên bảo dưỡng, sửa chữa) và Công ty CP SX TM DV Tư vấn An Lạc (chuyên mô hình động cơ và giải pháp đào tạo). Với nền tảng hơn 14 năm kinh nghiệm trong ngành ô tô, chúng tôi không ngừng nỗ lực và sáng tạo để mang đến những dịch vụ đa dạng cùng chất lượng hoàn hảo nhất cho khách hàng.',
  url: 'https://anphatindustry.com',
  phone: ['0977747178'],
  email: 'anphatcompany24@gmail.com',
  address: '78 Lê Tấn Bê, Phường An Lạc, Quận Bình Tân, TP. Hồ Chí Minh',
  locations: [
    {
      name: 'Trụ Sở Chính',
      address: '78 Lê Tấn Bê, Phường An Lạc, Quận Bình Tân, TP. Hồ Chí Minh',
    },
    {
      name: 'Chi Nhánh 1',
      address: '08 Nguyễn Ảnh Thủ, Phường Trung Mỹ Tây, TP. Hồ Chí Minh',
    },
  ],
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
  {
    label: 'GIỚI THIỆU',
    href: '/ve-chung-toi',
    children: [
      { label: 'Về Chúng Tôi', href: '/ve-chung-toi#gioi-thieu' },
      { label: 'Sơ Đồ Tổ Chức & Nhân Sự', href: '/ve-chung-toi#to-chuc' },
      { label: 'Năng Lực Công Ty', href: '/ve-chung-toi#nang-luc' },
    ],
  },
  {
    label: 'DỊCH VỤ',
    href: '/dich-vu',
    children: [
      { label: 'Bảo Dưỡng & Sửa Chữa', href: '/dich-vu/bao-duong-sua-chua' },
      { label: 'Đồng Sơn', href: '/dich-vu/dong-son' },
      { label: 'Chăm Sóc & Làm Đẹp Xe', href: '/dich-vu/cham-soc-lam-dep' },
      { label: 'Hỗ Trợ', href: '/dich-vu/ho-tro' },
      { label: 'Xe Điện', href: '/dich-vu/xe-dien' },
    ],
  },
  {
    label: 'MÔ HÌNH',
    href: '/mo-hinh',
    children: [
      { label: 'Thiết Bị Đào Tạo Kỹ Thuật', href: '/mo-hinh/thiet-bi-dao-tao' },
      { label: 'Thiết Bị Kiểm Tra Chẩn Đoán', href: '/mo-hinh/thiet-bi-chan-doan' },
    ],
  },
  {
    label: 'DỰ ÁN & ĐỐI TÁC',
    href: '/du-an',
    children: [
      { label: 'Dự Án Đã Thực Hiện', href: '/du-an/du-an-da-thuc-hien' },
      { label: 'Đối Tác & Khách Hàng', href: '/du-an/doi-tac-khach-hang' },
    ],
  },
  {
    label: 'THƯ VIỆN',
    href: '/thu-vien',
    children: [
      { label: 'Chia Sẻ Kinh Nghiệm', href: '/thu-vien/kinh-nghiem' },
      { label: 'Video Clip Phổ Biến', href: '/thu-vien/video' },
      { label: 'Bảng Tin Kỹ Thuật', href: '/thu-vien/bang-tin' },
      { label: 'Tuyển Dụng', href: '/thu-vien/tuyen-dung' },
    ],
  },
  { label: 'LIÊN HỆ', href: '/lien-he' },
]
