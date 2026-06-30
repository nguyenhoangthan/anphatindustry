import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import {
  defaultHeroSlides, defaultAboutSection, defaultWhyChooseUs, defaultProcessSteps,
  defaultPartnersSection, defaultContactCTA, defaultPricingPackages, defaultTeamSection,
} from '../src/lib/defaultContent'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ── Admin User ────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('AnPhat@2026', 12)
  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', passwordHash },
  })
  console.log('✅ Admin user created: admin / AnPhat@2026')

  // ── Services ─────────────────────────────────────────────────────────────
  const services = [
    {
      slug: 'bao-duong-dinh-ky',
      title: 'Bảo Dưỡng Định Kỳ',
      shortDescription: '4 cấp độ bảo dưỡng tổng quát định kỳ (5 – 200 ngàn km)',
      description:
        'Dịch vụ bảo dưỡng định kỳ tại An Phát Industry giúp xe luôn vận hành ổn định, kéo dài tuổi thọ và đảm bảo an toàn khi di chuyển. Chúng tôi áp dụng 4 cấp độ bảo dưỡng chuẩn từ 5.000 đến 200.000 km theo khuyến nghị của nhà sản xuất.',
      category: 'bao-duong-sua-chua',
      categoryLabel: 'Bảo Dưỡng & Sửa Chữa',
      image: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=800&q=80',
      highlights: JSON.stringify(['Thay dầu động cơ và lọc dầu', 'Kiểm tra toàn bộ hệ thống xe', 'Kiểm tra áp suất lốp', 'Vệ sinh buồng đốt và họng gió']),
      sortOrder: 1,
    },
    {
      slug: 'dien-dien-lanh',
      title: 'Điện & Điện Lạnh',
      shortDescription: 'Kiểm tra giàn lạnh, vệ sinh bảo dưỡng hệ thống điều hòa',
      description:
        'Đội ngũ kỹ thuật viên điện – điện lạnh chuyên nghiệp của An Phát Industry xử lý mọi vấn đề từ hệ thống điện ô tô đến điều hòa, đảm bảo xe luôn mát lạnh và an toàn.',
      category: 'bao-duong-sua-chua',
      categoryLabel: 'Bảo Dưỡng & Sửa Chữa',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80',
      highlights: JSON.stringify(['Vệ sinh dàn lạnh & dàn nóng', 'Bơm ga điều hòa', 'Sửa chữa hệ thống điện toàn xe', 'Chẩn đoán lỗi ECU bằng máy scan']),
      sortOrder: 2,
    },
    {
      slug: 'sua-chua-may-gam',
      title: 'Sửa Chữa Máy Gầm',
      shortDescription: 'Chuyên tiểu tu, trung tu, đại tu máy & gầm ô tô',
      description:
        'An Phát Industry chuyên sửa chữa máy và gầm xe từ đơn giản đến phức tạp, từ tiểu tu đến đại tu động cơ, hộp số, hệ thống truyền động và toàn bộ gầm xe.',
      category: 'bao-duong-sua-chua',
      categoryLabel: 'Bảo Dưỡng & Sửa Chữa',
      image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&q=80',
      highlights: JSON.stringify(['Đại tu động cơ, hộp số', 'Sửa chữa hệ thống treo, lái', 'Thay thế phụ tùng chính hãng', 'Bảo hành dịch vụ 12 tháng']),
      sortOrder: 3,
    },
    {
      slug: 'quy-trinh-dich-vu',
      title: 'Quy Trình Dịch Vụ',
      shortDescription: 'Chuẩn 12 bước quy trình dịch vụ sửa chữa, bảo dưỡng',
      description:
        'Quy trình dịch vụ 12 bước chuẩn tại An Phát Industry đảm bảo minh bạch, chính xác từ khi tiếp nhận xe đến khi bàn giao.',
      category: 'bao-duong-sua-chua',
      categoryLabel: 'Bảo Dưỡng & Sửa Chữa',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
      highlights: JSON.stringify(['Tiếp nhận xe và lắng nghe yêu cầu', 'Kiểm tra tổng quát miễn phí', 'Báo giá rõ ràng, không phát sinh', 'Bàn giao xe sạch sẽ, đúng hẹn']),
      sortOrder: 4,
    },
    {
      slug: 'cham-soc-noi-that',
      title: 'Chăm Sóc Nội Thất',
      shortDescription: 'Bảo dưỡng & vệ sinh nội thất ô tô chuyên sâu, khử mùi hiệu quả',
      description:
        'Dịch vụ chăm sóc nội thất toàn diện tại An Phát Industry giúp xe luôn sạch sẽ, thơm tho và bảo vệ các vật liệu nội thất khỏi ẩm mốc, bụi bẩn theo thời gian.',
      category: 'cham-soc-lam-dep',
      categoryLabel: 'Chăm Sóc & Làm Đẹp Xe',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      highlights: JSON.stringify(['Vệ sinh thảm, ghế, trần xe', 'Khử mùi bằng máy ozone', 'Bọc ghế da cao cấp', 'Bảo dưỡng taplo và cửa xe']),
      sortOrder: 5,
    },
    {
      slug: 'cham-soc-ngoai-that',
      title: 'Chăm Sóc Ngoại Thất',
      shortDescription: 'Tránh xuống cấp màu sắc và chất lượng vật liệu bên ngoài xe',
      description:
        'Dịch vụ chăm sóc ngoại thất chuyên nghiệp giúp sơn xe luôn bóng mượt, bảo vệ lớp sơn gốc, chống trầy xước.',
      category: 'cham-soc-lam-dep',
      categoryLabel: 'Chăm Sóc & Làm Đẹp Xe',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80',
      highlights: JSON.stringify(['Đánh bóng xe bằng máy', 'Phủ nano ceramic bảo vệ sơn', 'Dán phim cách nhiệt', 'Vệ sinh khoang bánh xe']),
      sortOrder: 6,
    },
    {
      slug: 've-sinh-phanh',
      title: 'Vệ Sinh Bảo Dưỡng Phanh',
      shortDescription: 'Bôi trơn – làm sạch – kiểm tra ống dẫn dầu – bảo dưỡng toàn diện',
      description: 'Hệ thống phanh là bộ phận quan trọng nhất đảm bảo an toàn khi di chuyển. An Phát Industry cung cấp dịch vụ bảo dưỡng phanh toàn diện, giúp xe luôn phanh hiệu quả.',
      category: 'cham-soc-lam-dep',
      categoryLabel: 'Chăm Sóc & Làm Đẹp Xe',
      image: 'https://images.unsplash.com/photo-1617531653332-bd46c16f7d61?w=800&q=80',
      highlights: JSON.stringify(['Vệ sinh kẹp phanh, đĩa phanh', 'Thay dầu phanh định kỳ', 'Kiểm tra độ dày má phanh', 'Xả khí hệ thống phanh']),
      sortOrder: 7,
    },
    {
      slug: 'son-dam-va',
      title: 'Sơn Dặm Vá & Toàn Thân',
      shortDescription: 'Sơn dặm điểm trầy xước, cụng đụng hoặc sơn lại toàn thân xe',
      description: 'An Phát Industry cung cấp dịch vụ sơn ô tô chuyên nghiệp từ sơn dặm vá các vết trầy nhỏ đến sơn lại toàn bộ thân xe. Sử dụng sơn 2K cao cấp, buồng sơn chuẩn.',
      category: 'dong-son',
      categoryLabel: 'Đồng Sơn',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80',
      highlights: JSON.stringify(['Sơn 2K chuẩn OEM', 'Buồng sơn áp suất chuẩn', 'Pha màu chính xác theo mã', 'Bảo hành sơn 12 tháng']),
      sortOrder: 8,
    },
    {
      slug: 'sua-chua-dong',
      title: 'Sửa Chữa Đồng Thân Xe',
      shortDescription: 'Nắn chỉnh, hàn, thay thế các chi tiết thân xe bị móp méo',
      description: 'Dịch vụ sửa chữa đồng thân xe chuyên nghiệp tại An Phát Industry giúp phục hồi các hư hỏng về thân vỏ xe sau va chạm, cụng đụng.',
      category: 'dong-son',
      categoryLabel: 'Đồng Sơn',
      image: 'https://images.unsplash.com/photo-1632823470781-15dd9a1bfa07?w=800&q=80',
      highlights: JSON.stringify(['Nắn chỉnh khung xe bằng máy kéo', 'Hàn điểm chuyên nghiệp', 'Thay thế panel thân xe', 'Kiểm tra độ lệch khung']),
      sortOrder: 9,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    })
  }
  console.log(`✅ ${services.length} services seeded`)

  // ── Blog Posts ────────────────────────────────────────────────────────────
  const posts = [
    {
      slug: 'bao-duong-xe-o-to-dinh-ky-bao-nhieu-km',
      title: 'Bảo Dưỡng Xe Ô Tô Định Kỳ Bao Nhiêu Km? Lịch Chuẩn Từng Cấp Độ',
      excerpt: 'Nhiều chủ xe chưa nắm rõ khi nào cần bảo dưỡng định kỳ cho ô tô. Bài viết này cung cấp lịch bảo dưỡng chuẩn từng cấp độ từ 5.000 đến 200.000 km.',
      content: '',
      author: 'An Phát Industry',
      publishedAt: new Date('2026-04-10'),
      category: 'kinh-nghiem',
      image: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=800&q=80',
      tags: JSON.stringify(['bảo dưỡng', 'định kỳ', 'kinh nghiệm']),
      readingTime: 6,
    },
    {
      slug: 'dau-hieu-nhan-biet-dieu-hoa-o-to-can-bao-duong',
      title: 'Dấu Hiệu Nhận Biết Điều Hòa Ô Tô Cần Bảo Dưỡng Ngay',
      excerpt: 'Điều hòa yếu, có mùi lạ hay phát tiếng ồn đều là dấu hiệu cảnh báo. Tìm hiểu ngay để tránh hỏng hóc nặng hơn.',
      content: '',
      author: 'An Phát Industry',
      publishedAt: new Date('2026-03-25'),
      category: 'kinh-nghiem',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80',
      tags: JSON.stringify(['điều hòa', 'bảo dưỡng', 'điện lạnh']),
      readingTime: 5,
    },
    {
      slug: 'kiem-tra-xe-truoc-khi-di-du-lich-xa',
      title: 'Checklist Kiểm Tra Xe Ô Tô Trước Khi Đi Du Lịch Xa – Đủ 10 Hạng Mục',
      excerpt: 'Chuẩn bị kỹ lưỡng trước mỗi chuyến đi dài giúp bạn an tâm trên đường. Dưới đây là danh sách 10 hạng mục cần kiểm tra.',
      content: '',
      author: 'An Phát Industry',
      publishedAt: new Date('2026-03-10'),
      category: 'kinh-nghiem',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
      tags: JSON.stringify(['kiểm tra xe', 'du lịch', 'an toàn']),
      readingTime: 7,
    },
    {
      slug: 'nen-chon-son-xe-1k-hay-son-2k',
      title: 'Nên Chọn Sơn Xe 1K Hay 2K? So Sánh Chi Tiết Cho Chủ Xe',
      excerpt: 'Sơn 1K và sơn 2K có sự khác biệt rõ rệt về chất lượng và chi phí. Bài viết giúp bạn hiểu rõ và đưa ra lựa chọn phù hợp.',
      content: '',
      author: 'An Phát Industry',
      publishedAt: new Date('2026-02-20'),
      category: 'kinh-nghiem',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80',
      tags: JSON.stringify(['sơn xe', 'đồng sơn', 'kinh nghiệm']),
      readingTime: 5,
    },
    {
      slug: 'cach-bao-quan-xe-mua-mua-hieu-qua',
      title: 'Cách Bảo Quản Xe Ô Tô Mùa Mưa Hiệu Quả – Phòng Ngừa Gỉ Sét',
      excerpt: 'Mùa mưa là thời điểm ô tô dễ bị ảnh hưởng nhất. Hãy áp dụng ngay những biện pháp bảo vệ xe đơn giản nhưng hiệu quả.',
      content: '',
      author: 'An Phát Industry',
      publishedAt: new Date('2026-02-05'),
      category: 'kinh-nghiem',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      tags: JSON.stringify(['mùa mưa', 'bảo quản xe', 'gỉ sét']),
      readingTime: 4,
    },
    {
      slug: 'phan-biet-dau-dong-co-chinh-hang-va-hang-kem-chat-luong',
      title: 'Phân Biệt Dầu Động Cơ Chính Hãng Và Hàng Kém Chất Lượng',
      excerpt: 'Dầu động cơ giả là mối nguy hiểm tiềm ẩn mà nhiều chủ xe không biết. Bài viết hướng dẫn cách phân biệt và lựa chọn dầu đúng chuẩn.',
      content: '',
      author: 'An Phát Industry',
      publishedAt: new Date('2026-01-15'),
      category: 'kinh-nghiem',
      image: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=800&q=80',
      tags: JSON.stringify(['dầu động cơ', 'phụ tùng', 'kinh nghiệm']),
      readingTime: 5,
    },
  ]

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    })
  }
  console.log(`✅ ${posts.length} blog posts seeded`)

  // ── Section Content ───────────────────────────────────────────────────────
  const sections = [
    { key: 'section_hero', value: JSON.stringify(defaultHeroSlides) },
    { key: 'section_about_home', value: JSON.stringify(defaultAboutSection) },
    { key: 'section_why_us', value: JSON.stringify(defaultWhyChooseUs) },
    { key: 'section_process', value: JSON.stringify(defaultProcessSteps) },
    { key: 'section_partners', value: JSON.stringify(defaultPartnersSection) },
    { key: 'section_contact_cta', value: JSON.stringify(defaultContactCTA) },
    { key: 'section_pricing', value: JSON.stringify(defaultPricingPackages) },
    { key: 'section_team', value: JSON.stringify(defaultTeamSection) },
  ]
  for (const s of sections) {
    await prisma.siteSetting.upsert({ where: { key: s.key }, update: {}, create: s })
  }
  console.log(`✅ ${sections.length} section content entries seeded`)

  console.log('\n🎉 Done! Admin credentials:')
  console.log('   URL:      http://localhost:3000/admin')
  console.log('   Username: admin')
  console.log('   Password: AnPhat@2026')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
