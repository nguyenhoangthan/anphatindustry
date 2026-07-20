// Lấy nội dung thô của 1 bài viết theo slug để xem/định dạng lại.
// Chạy qua: npm run get-post -- <slug>   (hoặc sửa SLUG bên dưới rồi chạy env-check-style)
const { PrismaClient } = require('@prisma/client')

const slug = process.argv[2] || 'bao-duong-xe-o-to-dinh-ky-bao-nhieu-km'

async function main() {
  const prisma = new PrismaClient()
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post) {
    console.log('KHÔNG TÌM THẤY bài viết với slug:', slug)
    process.exit(1)
  }
  console.log('=== ID ===')
  console.log(post.id)
  console.log('=== TITLE ===')
  console.log(post.title)
  console.log('=== CONTENT (raw) ===')
  console.log(post.content)
  console.log('=== END ===')
  await prisma.$disconnect()
}

main().catch((err) => {
  console.log('LỖI:', err.message)
  process.exit(1)
})
