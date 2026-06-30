import { prisma } from './prisma'

/**
 * Đọc một section nội dung từ bảng siteSetting (lưu JSON theo key).
 * Trả về fallback nếu chưa có trong DB hoặc lỗi kết nối.
 * Dùng chung cho cả trang public lẫn admin.
 */
export async function getSection<T>(key: string, fallback: T): Promise<T> {
  try {
    const s = await prisma.siteSetting.findUnique({ where: { key } })
    return s ? (JSON.parse(s.value) as T) : fallback
  } catch {
    return fallback
  }
}
