/**
 * Đồng bộ các section nội dung trong DB về giá trị chuẩn mới nhất.
 * Dùng khi DB hiện có vẫn giữ thông tin cũ (seed.ts dùng `update:{}` nên không tự ghi đè).
 *
 * Chạy (không cần tsx — chạy thẳng node, mọi phiên bản Node):
 *   DATABASE_URL="file:./prisma/prod.db" node prisma/sync-content.mjs
 *
 * Lưu ý: đường dẫn SQLite tính tương đối từ thư mục prisma/, nên "file:./prisma/prod.db"
 * trỏ tới prisma/prisma/prod.db.
 *
 * Chỉ cập nhật 3 section đã sửa thông tin công ty/nhân sự/đối tác.
 */
import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

const sectionAbout = {
  badge: 'Về Chúng Tôi',
  title: 'Công Ty Cổ Phần An Phát',
  subtitle: 'Bảo dưỡng – sửa chữa ô tô, mô hình đào tạo kỹ thuật và tư vấn giải pháp tại TP. Hồ Chí Minh.',
  body: 'An Phát là tâm huyết kết tinh từ sự hợp tác giữa Công ty TNHH TM DV Ô tô Hoàng Phát (chuyên bảo dưỡng, sửa chữa) và Công ty CP SX TM DV Tư vấn An Lạc (chuyên mô hình động cơ và giải pháp đào tạo). Với nền tảng hơn 14 năm kinh nghiệm trong ngành ô tô, chúng tôi không ngừng nỗ lực và sáng tạo để mang đến dịch vụ đa dạng cùng chất lượng hoàn hảo nhất cho khách hàng.',
  image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
  highlights: [
    'Thành lập đầu năm 2024, kế thừa hơn 14 năm kinh nghiệm ngành ô tô',
    'Đội ngũ kỹ sư và kỹ thuật viên được đào tạo bài bản',
    'Thiết bị chẩn đoán và sửa chữa hiện đại, chuẩn châu Âu',
    'Sử dụng phụ tùng chính hãng, có nguồn gốc rõ ràng',
    'Mô hình đào tạo kỹ thuật và tư vấn giải pháp chuyên sâu',
    'Cam kết bảo hành dịch vụ, hoàn tiền nếu không hài lòng',
  ],
  stat1Value: '14+',
  stat1Label: 'Năm kinh nghiệm',
  stat2Value: '5K+',
  stat2Label: 'Khách hàng tin tưởng',
}

const sectionPartners = {
  badge: 'Đối Tác',
  title: 'Các Thương Hiệu Chúng Tôi Phục Vụ',
  subtitle: 'An Phát Industry có đội ngũ kỹ thuật viên chuyên biệt cho từng dòng xe của các thương hiệu uy tín.',
  stats: [
    { value: '14+', label: 'Năm kinh nghiệm' },
    { value: '5.000+', label: 'Khách hàng' },
    { value: '20.000+', label: 'Xe đã phục vụ' },
    { value: '98%', label: 'Khách hài lòng' },
  ],
  partners: [
    { id: 1, name: 'Toyota', abbr: 'TYT' },
    { id: 2, name: 'Honda', abbr: 'HND' },
    { id: 3, name: 'Mazda', abbr: 'MZD' },
    { id: 4, name: 'Mercedes-Benz', abbr: 'MB' },
    { id: 5, name: 'BMW', abbr: 'BMW' },
    { id: 6, name: 'Hyundai', abbr: 'HYD' },
    { id: 7, name: 'Kia', abbr: 'KIA' },
    { id: 8, name: 'VinFast', abbr: 'VFS' },
  ],
  footnote: '*Và nhiều thương hiệu khác: Mitsubishi, Ford, Nissan, Audi, Lexus, Volvo, Subaru...',
}

const sectionTeam = {
  intro: {
    badge: 'Công Ty Cổ Phần An Phát',
    title: 'Bảo Dưỡng – Sửa Chữa Ô Tô & Mô Hình Đào Tạo Kỹ Thuật',
    body1: 'An Phát là tâm huyết kết tinh từ sự hợp tác giữa Công ty TNHH TM DV Ô tô Hoàng Phát (chuyên bảo dưỡng, sửa chữa) và Công ty CP SX TM DV Tư vấn An Lạc (chuyên mô hình động cơ và giải pháp đào tạo). Chúng tôi hiểu rằng chiếc xe không chỉ là phương tiện đi lại mà còn là tài sản giá trị và người bạn đồng hành đáng tin cậy.',
    body2: 'Với nền tảng hơn 14 năm kinh nghiệm trong ngành ô tô, An Phát sở hữu đội ngũ kỹ sư và kỹ thuật viên tay nghề cao, hệ thống thiết bị chẩn đoán hiện đại và quy trình dịch vụ chuẩn hóa.',
    image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&q=80',
    stats: [
      { value: '14+', label: 'Năm kinh nghiệm' },
      { value: '5K+', label: 'Khách hàng' },
      { value: '20K+', label: 'Xe đã phục vụ' },
      { value: '98%', label: 'Hài lòng' },
    ],
  },
  missions: [
    { title: 'Sứ Mệnh', description: 'Cung cấp dịch vụ bảo dưỡng và sửa chữa ô tô đạt chuẩn kỹ thuật cao nhất, giúp quý khách yên tâm trên từng hành trình.' },
    { title: 'Tầm Nhìn', description: 'Trở thành trung tâm dịch vụ ô tô hàng đầu tại TP.HCM, được tin tưởng bởi hàng chục nghìn khách hàng trên toàn thành phố.' },
    { title: 'Năng Lực Cốt Lõi', description: 'Đội ngũ kỹ sư và kỹ thuật viên được đào tạo bài bản, thiết bị chẩn đoán và sửa chữa hiện đại, quy trình dịch vụ chuẩn hóa.' },
    { title: 'Giá Trị Cốt Lõi', description: 'Trung thực – Tận tâm – Trách nhiệm – Chia sẻ. Bốn giá trị này định hướng mọi quyết định và hành động của An Phát Industry.' },
  ],
  fields: [
    'Bảo dưỡng sửa chữa tổng quát',
    'Điện & hệ thống điều hòa ô tô',
    'Sửa chữa máy gầm – tiểu tu, trung tu, đại tu',
    'Chăm sóc nội thất và ngoại thất chuyên sâu',
    'Đồng sơn và phục hồi thân vỏ xe',
    'Dịch vụ sửa chữa lưu động tại nhà 24/7',
    'Cứu hộ xe, xử lý bảo hiểm ô tô',
  ],
  team: [
    { name: 'Hoàng Anh Tuấn', role: 'Giám Đốc', description: 'Người đứng đầu An Phát, dẫn dắt đội ngũ với hơn 14 năm kinh nghiệm trong ngành ô tô.' },
    { name: 'Đang cập nhật', role: 'Quản Lý Xưởng Dịch Vụ', description: 'Thông tin nhân sự đang được cập nhật.' },
    { name: 'Đang cập nhật', role: 'Trưởng Xưởng Đồng Sơn', description: 'Thông tin nhân sự đang được cập nhật.' },
  ],
}

const SECTIONS = [
  { key: 'section_about_home', value: sectionAbout },
  { key: 'section_partners', value: sectionPartners },
  { key: 'section_team', value: sectionTeam },
]

// Remap category dịch vụ cũ -> mới (theo đầu mục CSV)
const SERVICE_CAT = {
  'sua-chua-chung':    { category: 'bao-duong-sua-chua', categoryLabel: 'Bảo Dưỡng & Sửa Chữa' },
  'cham-soc-xe':       { category: 'cham-soc-lam-dep',   categoryLabel: 'Chăm Sóc & Làm Đẹp Xe' },
  'sua-chua-luu-dong': { category: 'ho-tro',             categoryLabel: 'Hỗ Trợ' },
}
// Remap category bài viết cũ -> mới
const POST_CAT = { 'tin-tuc': 'bang-tin', 'huong-dan': 'bang-tin' }

async function main() {
  // 1) Sections nội dung
  for (const s of SECTIONS) {
    const value = JSON.stringify(s.value)
    await prisma.siteSetting.upsert({
      where: { key: s.key }, update: { value }, create: { key: s.key, value },
    })
    console.log(`✓ section ${s.key}`)
  }

  // 2) Category dịch vụ
  for (const [oldCat, m] of Object.entries(SERVICE_CAT)) {
    const r = await prisma.service.updateMany({ where: { category: oldCat }, data: m })
    if (r.count) console.log(`✓ service ${oldCat} -> ${m.category} (${r.count})`)
  }

  // 3) Category bài viết
  for (const [oldCat, newCat] of Object.entries(POST_CAT)) {
    const r = await prisma.blogPost.updateMany({ where: { category: oldCat }, data: { category: newCat } })
    if (r.count) console.log(`✓ post ${oldCat} -> ${newCat} (${r.count})`)
  }

  console.log('Done.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
