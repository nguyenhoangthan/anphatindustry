// In toàn bộ nội dung thô của tất cả bài viết, phân cách rõ ràng để dễ đọc.
// Chạy qua: npm run get-all-posts
const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } })

  for (const p of posts) {
    console.log('\n' + '='.repeat(80))
    console.log('ID:', p.id)
    console.log('SLUG:', p.slug)
    console.log('TITLE:', p.title)
    console.log('='.repeat(80))
    console.log(p.content)
  }

  await prisma.$disconnect()
}

main().catch((err) => {
  console.log('LỖI:', err.message)
  process.exit(1)
})
