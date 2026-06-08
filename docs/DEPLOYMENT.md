# Deployment Guide — An Phát Industry

## Môi trường

| Thành phần | Giá trị |
|---|---|
| Framework | Next.js 14.2 (App Router) |
| Database | SQLite via Prisma 5.22 |
| Hosting | Matbao Plesk shared hosting — `sg-premium7.cloudnetwork.vn` |
| Node.js trên server | v24 (nodenv) tại `/opt/plesk/node/24/bin/node` |
| Startup file (Plesk) | `server.js` |
| Port | 3001 |
| GitHub repo | https://github.com/nguyenhoangthan/anphatindustry |

---

## Kiến trúc deploy

```
Local machine (Windows)
  └─ npm run build        → tạo .next/
  └─ npx prisma generate  → tạo node_modules/.prisma/ (có Linux binaries)
  └─ git commit + push main

production branch push
  └─ GitHub Actions (FTP-only, không build trên CI)
       └─ FTP upload .next/ + source code → /httpdocs/
       └─ FTP upload node_modules/.prisma/ → /httpdocs/node_modules/.prisma/

Server (Plesk)
  └─ node server.js (chạy .next/ đã có sẵn, không cần build)
```

**Tại sao không build trên server hoặc CI?**
- Shared hosting không đủ resource để build (EAGAIN / SIGABRT)
- Build trên GitHub Actions (Ubuntu) phức tạp hơn (cần DB mock, env vars)
- Build local đơn giản, chắc chắn, kiểm soát được

## Quy trình deploy

### Khi có thay đổi code → deploy

```bash
# Bước 1: build local
npm run build

# Bước 2: commit (bao gồm .next/ đã build)
git add -A
git add -f .next/ node_modules/.prisma/
git commit -m "mô tả thay đổi"
git push origin main

# Bước 3: deploy (1 lệnh)
npm run deploy
```

`npm run deploy` tự động:
1. `git checkout production`
2. `git merge main`
3. `git push origin production`  ← trigger GitHub Actions
4. `git checkout main`

GitHub Actions chỉ FTP upload files lên server (~2–5 phút).  
Theo dõi tại: https://github.com/nguyenhoangthan/anphatindustry/actions

### Làm việc bình thường (không deploy)
```bash
git add . && git commit -m "..." && git push origin main
```

---

## Cấu hình server (chỉ setup một lần, không lặp lại)

### 1. Environment Variables trong Plesk
Vào Plesk → Node.js application → **Environment Variables**:

| Key | Value |
|---|---|
| `DATABASE_URL` | `file:./prisma/prod.db` |
| `NEXTAUTH_SECRET` | `anphat-industry-super-secret-key-2026-change-in-production` |
| `NEXTAUTH_URL` | `http://anphatindustry.com` |

> Không dùng file `.env` trên server — dùng Plesk env vars thay thế.

### 2. Database (upload một lần)
- File: `prod-db.zip` (chứa `prod.db`)
- Upload lên: `/httpdocs/prisma/prisma/`
- Extract → tạo ra `/httpdocs/prisma/prisma/prod.db`
- Database **không bao giờ bị ghi đè** bởi FTP deploy (đã exclude trong workflow)

### 3. GitHub Secrets (cần thiết cho GitHub Actions)
Vào: https://github.com/nguyenhoangthan/anphatindustry/settings/secrets/actions

| Secret | Giá trị |
|---|---|
| `FTP_SERVER` | `sg-premium7.cloudnetwork.vn` |
| `FTP_USERNAME` | `anp80439` |
| `FTP_PASSWORD` | *(mật khẩu Plesk)* |
| `NEXTAUTH_SECRET` | `anphat-industry-super-secret-key-2026-change-in-production` |

---

## Quản lý tiến trình (tránh leak nproc) — QUAN TRỌNG

Gói shared hosting có trần ~100 process. App động hoàn toàn nằm gọn trong đó **nếu vận
hành đúng**. Vài quy tắc bắt buộc:

1. **KHÔNG bao giờ gõ tay `npm start` / `npm restart`** trong tab "Run Node.js commands"
   của Plesk. Passenger đã chạy `server.js`; gõ `npm start` sẽ dựng **server thứ hai**
   chồng lên, tranh port và đẻ process rác. Muốn khởi động lại → chỉ dùng nút
   **Restart App** ở tab Dashboard.

2. **Sau khi đổi code → phải rebuild + redeploy** (`npm run build` local rồi deploy).
   `server.js` chạy raw nên đổi là ăn ngay sau Restart; nhưng `prisma.ts` và code app
   nằm trong `.next/` nên cần build lại mới có hiệu lực.

3. **Khi nghi process tăng bất thường:** vào Plesk → **Resource Usage → Snapshot/Current
   usage** để xem process nào đang chạy.
   - Nhiều `node`/`next` trùng lặp → có ai đó đã `npm start` thủ công → Stop hết, chỉ
     giữ 1 instance qua Restart App.
   - Nhiều `prisma`/`query-engine` → engine bị orphan; bản vá graceful shutdown đã xử,
     nhưng nếu vẫn còn, Restart App một lần để dọn sạch.

4. **Khởi động lại đúng cách:** **Stop App → đợi ~30s → Start App** (hoặc Restart App),
   đừng bấm liên tục — mỗi lần bấm dồn dập chỉ làm process chồng thêm.

## Issues đã gặp và cách giải quyết

### 1. `npm run build` thất bại — EAGAIN / SIGABRT
**Nguyên nhân:** Shared hosting không cho tạo OS thread hay fork process.  
**Giải pháp:**
- Thêm vào `next.config.mjs`:
  ```js
  experimental: { workerThreads: false, cpus: 1 }
  ```
- Build trên GitHub Actions (Ubuntu) thay vì trực tiếp trên server.

### 2. `npm install` thất bại — EAGAIN trên `postinstall`
**Nguyên nhân:** Package `unrs-resolver` chạy postinstall script, fork process → EAGAIN.  
**Giải pháp:** Tạo `.npmrc` với:
```
ignore-scripts=true
```
Package script `postinstall: prisma generate` cũng bị xóa khỏi `package.json`.

### 3. `EADDRINUSE: port 3000` khi khởi động
**Nguyên nhân:** Port 3000 đã bị chiếm, hoặc nhiều instance đang chạy.  
**Giải pháp:**
- Đổi sang port 3001 cố định.
- ~~Tạo `scripts/kill-port.js` + `prestart`~~ — **ĐÃ BỎ.** Cách này (bắn `fuser -k`)
  chỉ chữa triệu chứng và còn tự fork thêm process. Thay bằng **graceful shutdown**
  trong `server.js` (xem mục "Quản lý tiến trình" bên dưới): app tự đóng cleanly khi
  bị restart nên không còn instance treo chiếm port.

### 9. Chạm giới hạn process (nproc) — "reached the processes number limit" / `fork: Resource temporarily unavailable`
**Nguyên nhân (gốc rễ):** `server.js` cũ **không ngắt kết nối Prisma khi bị restart**.
Mỗi lần Passenger restart (sau deploy/crash) gửi `SIGTERM` → Node chết nhưng **tiến trình
Prisma Query Engine con bị bỏ rơi (orphan)**. Qua nhiều lần restart, các engine zombie
tích tụ → leo tới trần 100 process. Cộng thêm: vòng `process.exit(1)` trong request handler
gây crash→respawn, và việc gõ tay `npm start`/`npm restart` (chạy `next start` chồng lên
`server.js` của Passenger) → đẻ thêm process xung đột.
**Giải pháp (đã áp dụng):**
- `server.js`: bắt `SIGTERM`/`SIGINT` → đóng HTTP server + `prisma.$disconnect()` (kill
  engine con) rồi exit. Không còn `process.exit(1)` ở tầng request. `uncaughtException`
  cũng đi qua graceful shutdown.
- `src/lib/prisma.ts`: cache client lên `globalThis` ở **mọi môi trường** để (a) dev không
  tạo client mới mỗi lần HMR, (b) `server.js` với tới được client để disconnect lúc shutdown.
- `package.json`: bỏ `prestart`/kill-port, đổi `start` thành `node server.js` (thống nhất
  một entry point duy nhất với Passenger).
- `UV_THREADPOOL_SIZE=2` đặt ở đầu `server.js` để giảm số OS thread tính vào nproc.

> Một app cấu hình đúng chỉ tiêu ~5–15 process. Nếu sau khi vá vẫn thấy process tăng dần,
> xem mục "Quản lý tiến trình" để kiểm tra.

### 4. Plesk không tìm thấy startup file
**Nguyên nhân:** Plesk cần một file cụ thể làm entry point, mặc định là `app.js`.  
**Giải pháp:** Tạo `server.js` (custom Next.js HTTP server), config Plesk startup file = `server.js`.

### 5. 500 Internal Server Error — Prisma client không có Linux binary
**Nguyên nhân:** Prisma client được generate trên Windows → `.dll.node` không chạy được trên Linux server.  
**Giải pháp:**
- Thêm `binaryTargets` vào `prisma/schema.prisma`:
  ```prisma
  generator client {
    provider      = "prisma-client-js"
    binaryTargets = ["native", "debian-openssl-3.0.x", "debian-openssl-1.1.x", "rhel-openssl-1.0.x"]
  }
  ```
- GitHub Actions generate Prisma client trên Ubuntu → có Linux `.so.node` → FTP upload lên server.

### 6. `nodenv: node: command not found` khi npm scripts chạy
**Nguyên nhân:** PATH của Plesk app không bao gồm `/opt/plesk/node/24/bin`.  
**Giải pháp:** Không chạy `npm run build` trên server — GitHub Actions lo hết.

### 7. ZIP file Windows không extract được trên Linux
**Nguyên nhân:** PowerShell `Compress-Archive` tạo backslash paths (`node_modules\.prisma\`) — Linux `unzip` không nhận.  
**Giải pháp:** Dùng `git archive --format=zip` thay thế (tạo Unix-compatible paths).

### 8. `.next/` và `node_modules/.prisma/` commit vào git gây repo nặng
**Nguyên nhân:** Cách tạm thời ban đầu — commit build output để server `git pull` là có ngay.  
**Giải pháp:** Xóa khỏi git tracking, để GitHub Actions build và FTP deploy thay thế. Repo giờ chỉ chứa source code.

---

## Cấu trúc file quan trọng

```
.
├── server.js                        # Plesk startup file (custom Next.js server + graceful shutdown)
├── .npmrc                           # ignore-scripts=true (fix EAGAIN)
├── next.config.mjs                  # workerThreads:false, cpus:1
├── prisma/schema.prisma             # binaryTargets cho Linux
├── .github/workflows/deploy.yml    # GitHub Actions CI/CD
└── .gitignore                       # exclude .next/, node_modules/, *.db
```

---

## Checklist khi có thay đổi schema Prisma

Nếu thêm/sửa model trong `prisma/schema.prisma`:

```bash
# 1. Tạo migration mới (local)
npx prisma migrate dev --name ten_migration

# 2. Apply lên prod.db local
npx prisma migrate deploy

# 3. Upload prod.db mới lên server (Plesk File Manager)
#    /httpdocs/prisma/prisma/prod.db

# 4. Deploy code như bình thường
git checkout production
git merge main
git push origin production
```
