// Kiểm tra nhanh tất cả bài viết xem content có phải HTML thật hay văn bản
// thuần dán vào (không có thẻ HTML nào) — dấu hiệu sẽ hiển thị dính liền
// trên trang public. Chỉ đọc, không sửa gì. Chạy qua: npm run check-posts-format
const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } })

  console.log(`Tổng số bài viết: ${posts.length}\n`)

  for (const p of posts) {
    const hasHtmlTag = /<(p|h[1-6]|ul|ol|li|br|div|strong|em)[\s>]/i.test(p.content)
    const hasAsteriskBullets = /(^|\n)\s*\*\s+\S/.test(p.content)
    const status = hasHtmlTag ? 'OK - có thẻ HTML' : 'NGHI VẤN - có thể là văn bản thuần'
    console.log(`[${status}] ${p.title}`)
    console.log(`  slug: ${p.slug}`)
    console.log(`  id: ${p.id}`)
    console.log(`  content length: ${p.content.length}`)
    if (!hasHtmlTag) {
      console.log(`  dùng dấu * làm gạch đầu dòng: ${hasAsteriskBullets ? 'CÓ' : 'không'}`)
      console.log(`  preview: ${p.content.slice(0, 150).replace(/\n/g, ' ')}...`)
    }
    console.log('')
  }

  await prisma.$disconnect()
}

main().catch((err) => {
  console.log('LỖI:', err.message)
  process.exit(1)
})
