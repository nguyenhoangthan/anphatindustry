import { prisma } from './prisma'

/**
 * Đọc một section nội dung từ bảng siteSetting (lưu JSON theo key).
 * Trả về fallback nếu chưa có trong DB hoặc lỗi kết nối.
 * Dùng chung cho cả trang public lẫn admin.
 *
 * Nếu dữ liệu đã lưu là object (không phải mảng), merge nông với fallback —
 * bảo vệ khi shape của defaultContent.ts thêm field mới sau khi đã có dữ
 * liệu cũ trong DB (field mới sẽ thiếu trong JSON cũ, không merge sẽ khiến
 * form/`.map()` nhận undefined và crash).
 */
export async function getSection<T>(key: string, fallback: T): Promise<T> {
  try {
    const s = await prisma.siteSetting.findUnique({ where: { key } })
    if (!s) return fallback
    const parsed = JSON.parse(s.value) as T
    const isPlainObject = (v: unknown): v is Record<string, unknown> =>
      typeof v === 'object' && v !== null && !Array.isArray(v)
    if (isPlainObject(fallback) && isPlainObject(parsed)) {
      return { ...fallback, ...parsed } as T
    }
    return parsed
  } catch {
    return fallback
  }
}
