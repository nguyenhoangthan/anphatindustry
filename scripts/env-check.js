// Chẩn đoán tạm thời: kiểm tra các biến môi trường bắt buộc có được set trên
// server hay không, và có file .env vật lý nào đang tồn tại không (vì Node
// thuần không tự load .env như Next.js làm — nếu .env tồn tại nhưng biến ở
// đây vẫn MISSING thì nghĩa là Plesk process không thấy .env đó, chỉ Next.js
// runtime mới thấy). Chạy qua: npm run env-check
const fs = require('fs')
const path = require('path')

function report(name, sensitive) {
  const v = process.env[name]
  if (!v) {
    console.log(`${name}: MISSING (process.env)`)
    return
  }
  const preview = sensitive ? `${v.slice(0, 6)}... (dài ${v.length} ký tự)` : v
  console.log(`${name}: SET -> ${preview}`)
}

console.log('--- process.env (những gì Plesk custom env vars cấp) ---')
report('DATABASE_URL', false)
report('NEXTAUTH_SECRET', true)
report('NEXTAUTH_URL', false)
report('PORT', false)
report('NODE_ENV', false)

console.log('')
console.log('--- File .env vật lý trên server ---')
for (const name of ['.env', '.env.local', '.env.production', '.env.production.local']) {
  const p = path.join(process.cwd(), name)
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf8')
    const keys = content
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#') && l.includes('='))
      .map((l) => l.split('=')[0])
    console.log(`${name}: TỒN TẠI -> các key: ${keys.join(', ') || '(rỗng)'}`)
  } else {
    console.log(`${name}: không tồn tại`)
  }
}
console.log('--- Hết ---')
