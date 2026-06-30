# Vận hành & Xử lý sự cố — An Phát Industry

Tài liệu tổng hợp cách hệ thống chạy, cách giám sát, và sổ tay xử lý mọi sự cố đã gặp.
Phần cơ chế **deploy** xem riêng tại [DEPLOYMENT.md](./DEPLOYMENT.md).

Cập nhật lần cuối: 2026-06-08.

---

## 1. Tổng quan hệ thống

Website + CMS tự viết cho An Phát Industry. Là **app Next.js động** (không phải static),
cần một tiến trình Node chạy để render và phục vụ trang.

### Tech stack
| Tầng | Công nghệ |
|---|---|
| Framework | Next.js 14 (App Router) + React 18 + TypeScript |
| CSS / UI | Tailwind CSS, Framer Motion, Embla Carousel, lucide-react |
| Database | **SQLite** (1 file trên đĩa) qua **Prisma ORM 5** |
| Auth (admin) | NextAuth 4 (Credentials) + bcryptjs |
| Validation | Zod + React Hook Form |

### Hạ tầng
| Mục | Giá trị |
|---|---|
| Hosting | Matbao shared hosting (panel **Plesk**), server `sg-premium7.cloudnetwork.vn`, IP **172.236.153.33** |
| Web server | **LiteSpeed**; app Node chạy qua **lsnode** (LiteSpeed Node SAPI) — KHÔNG phải Passenger |
| Gói | Premium Cloud Hosting **Essential** — HĐ **069653/2026-MBHD** (19/05/2026 → 2029) |
| Giới hạn process (NPROC) | **100** (Entry Process: 30, RAM: 2GB) |
| System user | `anp80439` |
| Startup file | `server.js` · Port `3001` · `NODE_ENV=production` |
| Domain | anphatindustry.com (mua tại Mật Bão; NS: `ns1.matbao.com` / `ns2.matbao.com`) |

### Luồng request (end-to-end)
```
Trình duyệt
  → DNS (anphatindustry.com → 172.236.153.33)   ← NS phải là ns1/ns2.matbao.com
  → LiteSpeed (port 80/443) trên server
  → lsnode  (LiteSpeed Node SAPI)
  → server.js  (custom Next.js HTTP server, port 3001)
  → Next.js (render trang, đọc dữ liệu)
  → Prisma Client → Prisma Query Engine (tiến trình con) → SQLite (file .db)
```

---

## 2. Truy cập & thông tin đăng nhập

| Kênh | Cách vào | Ghi chú |
|---|---|---|
| **Plesk panel** | `https://sg-premium7.cloudnetwork.vn:8443` | Quản trị hosting, Node app, Resource Usage |
| **SSH (web)** | Plesk → **SSH Terminal** (trong trình duyệt) | Hoạt động. Shell **chroot** nên `top`/`ps` chỉ thấy một phần |
| **SSH (ngoài)** | `ssh anp80439@172.236.153.33` | ❌ **Bị firewall chặn từ bên ngoài** — mọi cổng SSH timeout. Dùng SSH web của Plesk thay thế |
| **FTP** | server `sg-premium7.cloudnetwork.vn`, user `anp80439` | Dùng cho GitHub Actions deploy |
| **GitHub secrets** | repo → Settings → Secrets → Actions | `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `NEXTAUTH_SECRET` |
| **Quản lý tên miền** | `https://manage.matbao.net` (hoặc id.matbao.net) | DNS records, nameserver, xác minh chủ thể |

### ⚠️ Quy tắc mật khẩu (rất hay quên → gây lỗi)
**Mật khẩu của system user `anp80439` = mật khẩu SSH = mật khẩu FTP — LÀ MỘT.**
Mỗi khi đổi mật khẩu system user trong Plesk (Hosting Settings → System user's credentials),
**phải cập nhật lại secret `FTP_PASSWORD` trên GitHub**, nếu không deploy sẽ lỗi `530 Login incorrect`.

---

## 3. Deploy (tóm tắt)

Build **local** → commit (kèm `.next/` + `node_modules/.prisma/`) → `npm run deploy` (push branch
`production`) → GitHub Actions **FTP-only** upload lên `/httpdocs/`. Chi tiết: [DEPLOYMENT.md](./DEPLOYMENT.md).

```bash
npm run build            # build local (server không build được — thiếu resource)
git add -A
git commit -m "..."
npm run deploy           # merge main→production, push → trigger Actions FTP
```
Sau khi Actions xanh → vào Plesk bấm **Restart App** một lần để nạp `server.js` mới.

---

## 4. Quản lý tiến trình / NPROC

### Cách lsnode quản lý vòng đời app
LiteSpeed **tự bật app khi có request, tự tắt khi rảnh (idle)**. Nên số process dao động:
- **Idle (không traffic):** ~**10** process (app đã được thu về).
- **Active (đang phục vụ):** ~**30–40** process — đây là **MỘT** tiến trình lsnode (`lsnode:.../httpdocs/`)
  với nhiều **thread** (Node + libuv + V8). Hệ thống LVE **đếm mỗi thread như một process**, nên NPROC cao.

### ✅ Dấu hiệu KHỎE MẠNH
- NPROC dao động ~10 (idle) ↔ ~40 (active), **luôn dưới 100**, **Fault = 0**.
- Snapshot chỉ có **MỘT PID** `lsnode` (cùng một số PID lặp lại = các thread của nó).

### 🔴 Dấu hiệu LEAK (không được tái diễn)
- NPROC **tăng dần không tụt** (50 → 70 → 90 → chạm 100).
- Snapshot có **NHIỀU PID node/prisma KHÁC NHAU** chồng chất.
- Xuất hiện cảnh báo "reached the processes number limit" / `fork: Resource temporarily unavailable`.

### Bản vá đã áp dụng (chống leak — 2026-06-08)
Gốc rễ leak cũ: `server.js` không ngắt Prisma khi restart → engine con bị orphan, tích tụ qua mỗi lần restart.
- **`server.js`**: bắt `SIGTERM`/`SIGINT`/`uncaughtException` → đóng HTTP server + `prisma.$disconnect()`
  (giết engine con) rồi exit gọn. Bỏ `process.exit(1)` ở tầng request (1 request lỗi không làm sập app).
  Đặt `UV_THREADPOOL_SIZE=2` đầu file (giảm thread libuv).
- **`src/lib/prisma.ts`**: cache client lên `globalThis` ở **mọi môi trường** → dev không tạo client mới mỗi
  HMR; prod để `server.js` với tới client mà disconnect lúc shutdown.
- **`package.json`**: bỏ `prestart`/`kill-port.js`, đổi `start` → `node server.js` (một entry point duy nhất).

### 📏 Quy tắc vận hành (BẮT BUỘC)
1. ❌ **KHÔNG bao giờ gõ `npm start` / `npm restart`** trong Plesk "Run Node.js commands" —
   sẽ dựng server thứ hai chồng lên lsnode, tranh port, đẻ process rác.
2. ✅ Khởi động lại **chỉ** bằng nút **Restart App** (hoặc Stop → đợi ~30s → Start). Đừng bấm dồn dập.
3. ✅ Sau khi đổi code → **rebuild local + redeploy** (`prisma.ts`/code app nằm trong `.next/`, phải build lại).

---

## 5. Giám sát (Monitoring)

### Qua Plesk
**Resource Usage** (LVE Manager):
- Tab **Current usage**: xem NPROC / Entry Processes / RAM hiện tại so với Limit + cột **Fault** (phải = 0).
- Tab **Snapshot**: xem **danh sách process** từng thời điểm (PID + CMD) — để soi leak (đếm số PID khác nhau).
- Tab **Dashboard**: cảnh báo "reached the limit ... times" trong 24h.

### Qua SSH Terminal (trong Plesk)
```bash
ps -u anp80439 --no-headers | wc -l                                   # đếm tổng process
ps -u anp80439 -o pid,ppid,rss,etime,cmd                              # chi tiết
ps -u anp80439 -o pid,ppid,rss,cmd | grep -iE 'node|next|prisma|lsnode' | grep -v grep
top -u anp80439                                                       # realtime (q để thoát)
curl -sI http://127.0.0.1:3001                                        # đánh thức + test app (mong 200/redirect)
```
> Lưu ý: shell SSH bị **chroot** nên `top`/`ps` có thể chỉ thấy một phần process. Con số chuẩn lấy ở
> **Resource Usage → Current usage** (NPROC).

### Kiểm tra app phục vụ đúng (từ máy bất kỳ)
```powershell
curl.exe -sS -k -L -o NUL -w "%{http_code}" -H "Host: anphatindustry.com" "https://172.236.153.33/"
# Mong: 200  → app + LiteSpeed OK (bỏ qua DNS)
```

---

## 6. Sự cố tên miền — Verification Hold (ICANN)

### Đã xảy ra
Sau khi vá xong nproc và app trả HTTP 200, web vẫn `ERR_CONNECTION_TIMED_OUT`. Nguyên nhân: **tên miền
bị treo (suspended)** ở cấp đăng ký vì **chưa xác minh email chủ thể** trong 15 ngày (quy định ICANN).
Khi bị treo, registry **bỏ qua nameserver Mật Bão** và trỏ sang server treo:
```
SOA → ns1.verification-hold.suspended-domain.com   (IP chết 74.119.239.234 → timeout)
```
→ Dù bản ghi DNS trong panel đúng (`@ → 172.236.153.33`) cũng **vô tác dụng** vì uỷ quyền không về Mật Bão.

### Cách khắc phục (đã làm)
1. Tìm email **"IMPORTANT! anphatindustry.com Suspended due to failed verification"** từ `info@matbao.com`
   trong hộp thư chủ thể `hoangthan.nguyen@gmail.com` (**nằm trong Spam**).
2. Bấm link xác minh (`...ValidateRAAServlet...`) → "Your email address has been verified successfully".
3. Chờ registry gỡ suspend & trả NS về `ns1/ns2.matbao.com` (**tối đa 48h**, thực tế nhanh hơn).

### Cách kiểm tra trạng thái
```powershell
nslookup -type=soa anphatindustry.com 1.1.1.1
# PrimaryServer = ns1.matbao.com  → đã gỡ treo (web sống)
# PrimaryServer = ...suspended-domain.com → còn treo
nslookup anphatindustry.com 1.1.1.1        # phải ra 172.236.153.33
ipconfig /flushdns                          # xoá cache DNS máy local
```

### Phòng ngừa
- Tên miền .com **phải xác minh email chủ thể trong 15 ngày** sau khi đăng ký/đổi thông tin.
- Theo dõi hộp thư chủ thể (kể cả **Spam/Promotions**) các mail từ Mật Bão/nhà đăng ký.

---

## 7. Sổ tay xử lý sự cố (Runbook)

| Triệu chứng | Nguyên nhân | Cách xử lý |
|---|---|---|
| `fork: Resource temporarily unavailable`, `No child processes`, panel **500**, Restart fail | **Hết NPROC** do leak process (engine Prisma orphan tích tụ) | Nhờ Mật Bão **kill process treo** (root) để thoát ngay; đảm bảo đã deploy **bản vá graceful shutdown**; tuân thủ quy tắc §4 |
| NPROC tăng dần không tụt / nhiều PID node-prisma trong Snapshot | Leak tái diễn (có thể do gõ `npm start` tay, hoặc bản vá chưa deploy) | Restart App 1 lần để dọn; kiểm tra không ai gõ `npm start`; xác nhận `server.js` trên server có graceful shutdown |
| Web `ERR_CONNECTION_TIMED_OUT` nhưng app trả 200 khi gọi thẳng IP | **DNS/tên miền**: trỏ sai IP hoặc **domain bị suspend** (verification hold) | Kiểm tra `nslookup -type=soa` (§6). Nếu suspended → xác minh email. Nếu sai IP → set A record `@`+`www` → `172.236.153.33` |
| GitHub Actions deploy đỏ: `FTPError: 530 Login incorrect` | Secret `FTP_PASSWORD` **lệch** mật khẩu system user (thường do vừa đổi pass) | Đặt lại pass trong Plesk → cập nhật secret `FTP_PASSWORD` cho khớp → **Re-run failed jobs**. (§2 quy tắc mật khẩu) |
| `ssh ...@172.236.153.33` **timeout** ở mọi cổng | Firewall server **chặn SSH ngoài** | Dùng **SSH Terminal trong Plesk** (web). Nếu cần SSH ngoài → nhờ Mật Bão mở/whitelist IP + cho biết cổng |
| 500 Internal Server Error, log nhắc Prisma engine | Prisma client thiếu **binary Linux** | `binaryTargets` trong `schema.prisma` (đã có); generate trên Ubuntu (Actions) rồi FTP `node_modules/.prisma/` |
| `npm run build` lỗi **EAGAIN/SIGABRT** trên server | Shared hosting không cho fork/thread đủ để build | **Không build trên server** — build local rồi deploy build artifact (`.next/`) |
| `npm install` lỗi EAGAIN ở postinstall | Postinstall script fork process | `.npmrc` có `ignore-scripts=true` (đã có) |
| Bài viết mới không lên ngay | (App động) đã lên ngay sau khi lưu qua `/admin`; nếu là build artifact thì cần rebuild+redeploy | Với web động: dữ liệu live. Kiểm tra app đang chạy (curl localhost) |

---

## 8. Bài học & nguyên tắc vàng

1. **Không gõ `npm start`/`npm restart` thủ công** — chỉ dùng **Restart App**.
2. **Đổi mật khẩu system user → cập nhật secret `FTP_PASSWORD`** ngay (FTP/SSH/user dùng chung 1 mật khẩu).
3. **Tên miền .com phải xác minh email chủ thể trong 15 ngày** — theo dõi cả Spam.
4. **NPROC 100 là đủ** cho app này nếu không leak — mục tiêu là 1 PID lsnode, không phải nhiều process.
5. **Build ở local, không build trên server** (shared hosting thiếu resource).
6. **Giữ `.next/` + `node_modules/.prisma/` trong git** (deploy theo cơ chế FTP build artifact).
7. SSH ngoài bị chặn → quen dùng **SSH Terminal web của Plesk** + **Resource Usage** để chẩn đoán.

---

## 9. Nhật ký sự cố — 2026-06-08

Diễn biến và cách xử lý (theo thứ tự):

1. **App sập**, lỗi `fork`/`No child processes`, panel 500, không Restart được → Mật Bão kill process treo (root).
2. **Chẩn đoán gốc rễ:** leak process — `server.js` không disconnect Prisma khi restart → engine con orphan,
   tích tụ qua mỗi lần restart → chạm trần NPROC 100 (ghi nhận **chạm 109 lần/24h**).
3. **Vá code** (graceful shutdown + dọn footgun `kill-port` + 1 entry point), build local OK.
4. **Deploy fail `530`** → mật khẩu FTP lệch (do đổi pass lúc thử SSH) → đồng bộ lại secret → Re-run → **Success**.
5. **Restart App** → app chạy, NPROC ổn định **10/100, Fault 0**, server trả **HTTP 200** (1 PID lsnode).
6. **Web vẫn timeout** dù app khoẻ → phát hiện **domain bị verification hold** (SOA = suspended-domain.com).
7. **Xác minh email chủ thể** (mail trong Spam) → thành công → chờ gỡ suspend.
8. **Domain sống lại**, A record về `172.236.153.33`, **web truy cập được**. ✅

Kết quả: giữ nguyên **web động + admin tự viết**, **hết lỗi nproc**, domain hoạt động.
