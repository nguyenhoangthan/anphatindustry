// Chẩn đoán tạm thời: thử đúng thao tác đọc + ghi mà route PUT
// /api/admin/content/[key] đang làm, để bắt lỗi thật khi nó thất bại.
// Không đụng dữ liệu thật — ghi vào key riêng __diagnostic_test__ rồi xoá.
// Chạy qua: npm run db-check
const { PrismaClient } = require('@prisma/client')

async function main() {
  console.log('DATABASE_URL (theo Prisma thấy):', process.env.DATABASE_URL || '(rỗng, Prisma sẽ tự đọc .env)')

  const prisma = new PrismaClient({ log: ['error', 'warn'] })

  try {
    console.log('--- Test 1: đọc section_about_home ---')
    const existing = await prisma.siteSetting.findUnique({ where: { key: 'section_about_home' } })
    console.log('OK - đọc được, value length:', existing ? existing.value.length : '(không có row)')
  } catch (err) {
    console.log('LỖI khi đọc:', err.name, '-', err.message)
    if (err.code) console.log('Prisma error code:', err.code)
  }

  try {
    console.log('--- Test 2: ghi thử vào key __diagnostic_test__ ---')
    await prisma.siteSetting.upsert({
      where: { key: '__diagnostic_test__' },
      create: { key: '__diagnostic_test__', value: JSON.stringify({ ts: 'test' }) },
      update: { value: JSON.stringify({ ts: 'test' }) },
    })
    console.log('OK - ghi thành công')
    await prisma.siteSetting.delete({ where: { key: '__diagnostic_test__' } }).catch(() => {})
  } catch (err) {
    console.log('LỖI khi ghi:', err.name, '-', err.message)
    if (err.code) console.log('Prisma error code:', err.code)
    console.log('Stack:', err.stack)
  }

  await prisma.$disconnect()
}

main().catch((err) => {
  console.log('LỖI KHỞI TẠO PRISMA CLIENT:', err.name, '-', err.message)
  console.log('Stack:', err.stack)
  process.exit(1)
})
