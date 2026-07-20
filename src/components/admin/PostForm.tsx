'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import ImageUpload from './ImageUpload'

// Lưu ý: "Tuyển Dụng" không còn là category bài viết — trang
// /thu-vien/tuyen-dung giờ hiển thị poster tuyển dụng riêng
// (xem RECRUITMENT VIEW trong src/app/thu-vien/[slug]/page.tsx),
// bài viết category này sẽ không bao giờ hiển thị nếu tạo ra.
const CATEGORIES = [
  { value: 'kinh-nghiem', label: 'Chia Sẻ Kinh Nghiệm' },
  { value: 'video', label: 'Video Clip Phổ Biến' },
  { value: 'bang-tin', label: 'Bảng Tin Kỹ Thuật' },
]

interface PostFormData {
  id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  category: string
  image: string
  tags: string // comma-separated
  readingTime: number
  featured: boolean
}

interface Props {
  initialData?: Partial<PostFormData>
  mode: 'new' | 'edit'
}

export default function PostForm({ initialData, mode }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<PostFormData>({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    author: 'An Phát Industry',
    publishedAt: new Date().toISOString().substring(0, 10),
    category: 'kinh-nghiem',
    image: '',
    tags: '',
    readingTime: 5,
    featured: false,
    ...initialData,
  })

  function slugify(text: string) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  }

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug: mode === 'new' ? slugify(title) : prev.slug,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      ...form,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    }

    const url = mode === 'new' ? '/api/admin/posts' : `/api/admin/posts/${initialData?.id}`
    const method = mode === 'new' ? 'POST' : 'PUT'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Có lỗi xảy ra')
        return
      }

      router.push('/admin/posts')
      router.refresh()
    } catch {
      setError('Lỗi kết nối máy chủ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Title */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Tiêu Đề <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447]"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Slug (URL) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447] font-mono"
          />
          <p className="text-xs text-gray-400 mt-1">URL: /thu-vien/{form.slug || '...'}</p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Danh Mục</label>
          <select
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447] bg-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Excerpt */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Tóm Tắt <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
            required
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447] resize-y"
            placeholder="Tóm tắt ngắn gọn nội dung bài viết..."
          />
        </div>

        {/* Content */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Nội Dung Bài Viết
          </label>
          <textarea
            value={form.content}
            onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
            rows={12}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447] resize-y font-mono"
            placeholder="Nội dung bài viết (hỗ trợ HTML)..."
          />
        </div>

        {/* Image */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            URL Ảnh Đại Diện <span className="text-red-500">*</span>
          </label>
          <ImageUpload value={form.image} onChange={(url) => setForm((prev) => ({ ...prev, image: url }))} />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tác Giả</label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447]"
          />
        </div>

        {/* Published At */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ngày Đăng</label>
          <input
            type="date"
            value={form.publishedAt}
            onChange={(e) => setForm((prev) => ({ ...prev, publishedAt: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447]"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Tags (cách nhau bằng dấu phẩy)
          </label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447]"
            placeholder="bảo dưỡng, định kỳ, kinh nghiệm"
          />
        </div>

        {/* Reading time */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Thời Gian Đọc (phút)
          </label>
          <input
            type="number"
            min={1}
            value={form.readingTime}
            onChange={(e) => setForm((prev) => ({ ...prev, readingTime: Number(e.target.value) }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447]"
          />
        </div>

        {/* Featured */}
        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
              className="w-4 h-4 rounded accent-[#E63312]"
            />
            <span className="text-sm font-medium text-gray-700">Nổi bật (Featured)</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-[#0B2447] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#0B2447]/90 transition-colors disabled:opacity-60"
        >
          {loading && <Loader2 size={15} className="animate-spin" />}
          {mode === 'new' ? 'Đăng Bài Viết' : 'Lưu Thay Đổi'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/posts')}
          className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Hủy
        </button>
      </div>
    </form>
  )
}
