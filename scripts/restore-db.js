// Khôi phục prod.db từ file backup vào đúng vị trí Prisma cần
// (prisma/prisma/prod.db). AN TOÀN: không ghi đè nếu đích đã tồn tại,
// và kiểm tra file nguồn đúng định dạng SQLite trước khi copy.
// Chạy qua: npm run restore-db
const fs = require('fs')
const path = require('path')

const projectRoot = path.join(__dirname, '..')
const destDir = path.join(projectRoot, 'prisma', 'prisma')
const dest = path.join(destDir, 'prod.db')

// Các vị trí khả dĩ của file backup người dùng nhắc tới.
const candidates = [
  path.join(projectRoot, 'prisma', 'prod-bk20072026.db'),
  path.join(projectRoot, 'prod-bk20072026.db'),
  path.join(projectRoot, 'prisma', 'prisma', 'prod-bk20072026.db'),
]

console.log('--- Tìm file backup ---')
let found = null
for (const c of candidates) {
  const exists = fs.existsSync(c)
  console.log(`${c}: ${exists ? 'TỒN TẠI' : 'không có'}`)
  if (exists && !found) found = c
}

if (!found) {
  console.log('\nKHÔNG TÌM THẤY file backup ở các vị trí trên. Dừng lại, không làm gì thêm.')
  process.exit(1)
}

console.log(`\n--- Kiểm tra "${found}" có phải file SQLite hợp lệ không ---`)
const buf = Buffer.alloc(16)
const fd = fs.openSync(found, 'r')
fs.readSync(fd, buf, 0, 16, 0)
fs.closeSync(fd)
const header = buf.toString('utf8', 0, 6)
if (header !== 'SQLite') {
  console.log(`Header đọc được: "${header}" — KHÔNG phải file SQLite hợp lệ. Dừng lại.`)
  process.exit(1)
}
const size = fs.statSync(found).size
console.log(`OK - header hợp lệ, size=${size} bytes`)

console.log(`\n--- Kiểm tra đích "${dest}" ---`)
if (fs.existsSync(dest)) {
  console.log('Đích ĐÃ TỒN TẠI — để an toàn, KHÔNG ghi đè. Dừng lại, không làm gì thêm.')
  console.log('Nếu anh chắc chắn muốn ghi đè, xoá thủ công file đích trước rồi chạy lại script này.')
  process.exit(1)
}

console.log('Đích chưa tồn tại — tiến hành tạo thư mục + copy...')
fs.mkdirSync(destDir, { recursive: true })
fs.copyFileSync(found, dest)
const destSize = fs.statSync(dest).size
console.log(`OK - đã copy "${found}" -> "${dest}" (${destSize} bytes)`)
console.log('\nXong. Chạy tiếp `npm run db-check` để xác nhận Prisma đọc/ghi được.')
