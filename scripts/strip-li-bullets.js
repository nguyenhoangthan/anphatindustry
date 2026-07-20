// Bỏ ký hiệu/emoji thừa ở đầu mỗi <li> (✅ ❌ ☐ ☑ ✔ 🔸 🚗...) vì <ul> đã tự
// có dấu chấm tròn — để cả 2 sẽ bị lặp bullet. Chỉ tác động ngay sau <li>,
// không đụng emoji trong heading (h2/h3). Áp dụng cho toàn bộ 6 bài viết.
// Chạy qua: npm run strip-li-bullets
const { PrismaClient } = require('@prisma/client')

// Dải Unicode bao trùm các emoji/ký hiệu đã dùng làm gạch đầu dòng.
const LEADING_SYMBOL = /(<li>)\s*[\u{2190}-\u{27BF}\u{2B00}-\u{2BFF}\u{1F300}-\u{1FAFF}️]+\s*/gu

async function main() {
  const prisma = new PrismaClient()
  const posts = await prisma.blogPost.findMany()

  let changedCount = 0
  for (const p of posts) {
    const before = p.content
    const after = before.replace(LEADING_SYMBOL, '$1')
    if (after !== before) {
      await prisma.blogPost.update({ where: { id: p.id }, data: { content: after } })
      const diffCount = (before.match(LEADING_SYMBOL) || []).length
      console.log(`OK - ${p.title}: bỏ ${diffCount} ký hiệu thừa`)
      changedCount++
    } else {
      console.log(`Không đổi - ${p.title}`)
    }
  }

  console.log(`\nHoàn tất. Đã cập nhật ${changedCount}/${posts.length} bài.`)
  await prisma.$disconnect()
}

main().catch((err) => {
  console.log('LỖI:', err.message)
  process.exit(1)
})
