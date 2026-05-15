import type { Service } from '@/types'

export const services: Service[] = [
  // ── SỬA CHỮA CHUNG ──────────────────────────────────────────────────────────
  {
    id: 'bao-duong-dinh-ky',
    slug: 'bao-duong-dinh-ky',
    title: 'Bảo Dưỡng Định Kỳ',
    shortDescription: '4 cấp độ bảo dưỡng tổng quát định kỳ (5 – 200 ngàn km)',
    description:
      'Dịch vụ bảo dưỡng định kỳ tại An Phát Industry giúp xe luôn vận hành ổn định, kéo dài tuổi thọ và đảm bảo an toàn khi di chuyển. Chúng tôi áp dụng 4 cấp độ bảo dưỡng chuẩn từ 5.000 đến 200.000 km theo khuyến nghị của nhà sản xuất.',
    category: 'sua-chua-chung',
    categoryLabel: 'Sửa Chữa Chung',
    icon: 'wrench',
    image: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=800&q=80',
    highlights: [
      'Thay dầu động cơ và lọc dầu',
      'Kiểm tra toàn bộ hệ thống xe',
      'Kiểm tra áp suất lốp',
      'Vệ sinh buồng đốt và họng gió',
    ],
  },
  {
    id: 'dien-dien-lanh',
    slug: 'dien-dien-lanh',
    title: 'Điện & Điện Lạnh',
    shortDescription: 'Kiểm tra giàn lạnh, vệ sinh bảo dưỡng hệ thống điều hòa',
    description:
      'Đội ngũ kỹ thuật viên điện – điện lạnh chuyên nghiệp của An Phát Industry xử lý mọi vấn đề từ hệ thống điện ô tô đến điều hòa, đảm bảo xe luôn mát lạnh và an toàn.',
    category: 'sua-chua-chung',
    categoryLabel: 'Sửa Chữa Chung',
    icon: 'zap',
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80',
    highlights: [
      'Vệ sinh dàn lạnh & dàn nóng',
      'Bơm ga điều hòa',
      'Sửa chữa hệ thống điện toàn xe',
      'Chẩn đoán lỗi ECU bằng máy scan',
    ],
  },
  {
    id: 'sua-chua-may-gam',
    slug: 'sua-chua-may-gam',
    title: 'Sửa Chữa Máy Gầm',
    shortDescription: 'Chuyên tiểu tu, trung tu, đại tu máy & gầm ô tô',
    description:
      'An Phát Industry chuyên sửa chữa máy và gầm xe từ đơn giản đến phức tạp, từ tiểu tu đến đại tu động cơ, hộp số, hệ thống truyền động và toàn bộ gầm xe.',
    category: 'sua-chua-chung',
    categoryLabel: 'Sửa Chữa Chung',
    icon: 'settings',
    image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&q=80',
    highlights: [
      'Đại tu động cơ, hộp số',
      'Sửa chữa hệ thống treo, lái',
      'Thay thế phụ tùng chính hãng',
      'Bảo hành dịch vụ 12 tháng',
    ],
  },
  {
    id: 'quy-trinh-dich-vu',
    slug: 'quy-trinh-dich-vu',
    title: 'Quy Trình Dịch Vụ',
    shortDescription: 'Chuẩn 12 bước quy trình dịch vụ sửa chữa, bảo dưỡng',
    description:
      'Quy trình dịch vụ 12 bước chuẩn tại An Phát Industry đảm bảo minh bạch, chính xác từ khi tiếp nhận xe đến khi bàn giao – giúp quý khách hoàn toàn yên tâm.',
    category: 'sua-chua-chung',
    categoryLabel: 'Sửa Chữa Chung',
    icon: 'clipboard-list',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
    highlights: [
      'Tiếp nhận xe và lắng nghe yêu cầu',
      'Kiểm tra tổng quát miễn phí',
      'Báo giá rõ ràng, không phát sinh',
      'Bàn giao xe sạch sẽ, đúng hẹn',
    ],
  },

  // ── CHĂM SÓC XE ─────────────────────────────────────────────────────────────
  {
    id: 'cham-soc-noi-that',
    slug: 'cham-soc-noi-that',
    title: 'Chăm Sóc Nội Thất',
    shortDescription: 'Bảo dưỡng & vệ sinh nội thất ô tô chuyên sâu, khử mùi hiệu quả',
    description:
      'Dịch vụ chăm sóc nội thất toàn diện tại An Phát Industry giúp xe luôn sạch sẽ, thơm tho và bảo vệ các vật liệu nội thất khỏi ẩm mốc, bụi bẩn theo thời gian.',
    category: 'cham-soc-xe',
    categoryLabel: 'Chăm Sóc Xe Hơi',
    icon: 'sofa',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    highlights: [
      'Vệ sinh thảm, ghế, trần xe',
      'Khử mùi bằng máy ozone',
      'Bọc ghế da cao cấp',
      'Bảo dưỡng taplo và cửa xe',
    ],
  },
  {
    id: 'cham-soc-ngoai-that',
    slug: 'cham-soc-ngoai-that',
    title: 'Chăm Sóc Ngoại Thất',
    shortDescription: 'Tránh xuống cấp màu sắc và chất lượng vật liệu bên ngoài xe',
    description:
      'Dịch vụ chăm sóc ngoại thất chuyên nghiệp giúp sơn xe luôn bóng mượt, bảo vệ lớp sơn gốc, chống trầy xước và duy trì vẻ đẹp nguyên bản của xe.',
    category: 'cham-soc-xe',
    categoryLabel: 'Chăm Sóc Xe Hơi',
    icon: 'sparkles',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80',
    highlights: [
      'Đánh bóng xe bằng máy',
      'Phủ nano ceramic bảo vệ sơn',
      'Dán phim cách nhiệt',
      'Vệ sinh khoang bánh xe',
    ],
  },
  {
    id: 've-sinh-phanh',
    slug: 've-sinh-phanh',
    title: 'Vệ Sinh Bảo Dưỡng Phanh',
    shortDescription: 'Bôi trơn – làm sạch – kiểm tra ống dẫn dầu – bảo dưỡng toàn diện',
    description:
      'Hệ thống phanh là yếu tố an toàn tối quan trọng. An Phát Industry thực hiện vệ sinh và bảo dưỡng phanh theo đúng quy trình kỹ thuật, đảm bảo an toàn tối đa.',
    category: 'cham-soc-xe',
    categoryLabel: 'Chăm Sóc Xe Hơi',
    icon: 'shield-check',
    image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=800&q=80',
    highlights: [
      'Vệ sinh cụm phanh đĩa, phanh tang',
      'Kiểm tra dầu phanh và ống dẫn',
      'Thay má phanh, đĩa phanh',
      'Căn chỉnh và test an toàn',
    ],
  },

  // ── ĐỒNG SƠN ────────────────────────────────────────────────────────────────
  {
    id: 'son-dam-va',
    slug: 'son-dam-va',
    title: 'Sơn Dặm Vá & Toàn Thân',
    shortDescription: 'Kỹ thuật pha sơn điêu luyện – không nhận ra vết sơn mới và cũ',
    description:
      'Xưởng sơn An Phát Industry trang bị hệ thống buồng sơn hiện đại, đội ngũ thợ sơn lành nghề với kỹ năng pha màu chính xác, đảm bảo màu sơn hoàn toàn đồng nhất.',
    category: 'dong-son',
    categoryLabel: 'Đồng Sơn',
    icon: 'paintbrush',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80',
    highlights: [
      'Pha màu sơn bằng máy đo màu quang học',
      'Buồng sơn chuẩn châu Âu',
      'Sơn 2K bền màu, bền đẹp',
      'Bảo hành màu sơn 12 tháng',
    ],
  },
  {
    id: 'sua-chua-dong',
    slug: 'sua-chua-dong',
    title: 'Sửa Chữa Đồng Thân Xe',
    shortDescription: 'Sửa chữa từ đơn giản đến phức tạp, phục hồi xe tai nạn đảm bảo',
    description:
      'Đội thợ đồng tay nghề cao của An Phát Industry có khả năng phục hồi thân xe sau tai nạn, nắn chỉnh khung gầm, thay thế panel và các chi tiết thân vỏ đúng tiêu chuẩn.',
    category: 'dong-son',
    categoryLabel: 'Đồng Sơn',
    icon: 'hammer',
    image: 'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=800&q=80',
    highlights: [
      'Nắn chỉnh khung xe bằng máy 3D',
      'Hàn đắp, thay panel thân xe',
      'Phục hồi xe sau tai nạn',
      'Xử lý bảo hiểm nhanh chóng',
    ],
  },
]

export const serviceCategories = [
  {
    id: 'sua-chua-chung',
    label: 'Sửa Chữa Chung',
    description: 'Bảo dưỡng định kỳ, sửa chữa điện, máy và gầm xe',
    icon: 'wrench',
  },
  {
    id: 'cham-soc-xe',
    label: 'Chăm Sóc Xe Hơi',
    description: 'Chăm sóc nội thất, ngoại thất, khoang máy toàn diện',
    icon: 'car',
  },
  {
    id: 'dong-son',
    label: 'Đồng Sơn',
    description: 'Sơn dặm vá, sửa chữa đồng và phục hồi thân vỏ xe',
    icon: 'paintbrush',
  },
]
