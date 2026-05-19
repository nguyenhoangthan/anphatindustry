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

## Quy trình deploy

### Làm việc bình thường (không deploy)
```bash
git add .
git commit -m "..."
git push origin main       # KHÔNG trigger deploy
```

### Khi muốn deploy lên production
```bash
git checkout production
git merge main
git push origin production  # trigger GitHub Actions → auto deploy
git checkout main
```

GitHub Actions (`ubuntu-latest`) sẽ tự động:
1. `npm ci --ignore-scripts`
2. `npx prisma generate` (tạo Linux binary)
3. `npm run build` (tạo `.next/`)
4. FTP upload toàn bộ lên `/httpdocs/` (trừ `node_modules/`, `.env`, `*.db`)
5. FTP upload `node_modules/.prisma/` (Linux Prisma client) lên server

**Thời gian**: ~5–10 phút. Theo dõi tại:  
https://github.com/nguyenhoangthan/anphatindustry/actions

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
- Tạo `scripts/kill-port.js` để free port trước khi start.
- Thêm `"prestart": "node scripts/kill-port.js"` vào `package.json`.

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
├── server.js                        # Plesk startup file (custom Next.js server)
├── .npmrc                           # ignore-scripts=true (fix EAGAIN)
├── scripts/kill-port.js             # free port trước khi start
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
