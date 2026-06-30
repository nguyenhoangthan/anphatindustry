'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X, Loader2 } from 'lucide-react'
import ImageUpload from './ImageUpload'

const CATEGORIES = [
  { value: 'bao-duong-sua-chua', label: 'Bảo Dưỡng & Sửa Chữa' },
  { value: 'dong-son', label: 'Đồng Sơn' },
  { value: 'cham-soc-lam-dep', label: 'Chăm Sóc & Làm Đẹp Xe' },
  { value: 'ho-tro', label: 'Hỗ Trợ' },
  { value: 'xe-dien', label: 'Xe Điện' },
]

interface ServiceFormData {
  id?: string
  slug: string
  title: string
  shortDescription: string
  description: string
  category: string
  categoryLabel: string
  image: string
  highlights: string[]
  featured: boolean
  sortOrder: number
}

interface Props {
  initialData?: ServiceFormData
  mode: 'new' | 'edit'
}

export default function ServiceForm({ initialData, mode }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<ServiceFormData>({
    slug: '',
    title: '',
    shortDescription: '',
    description: '',
    category: 'bao-duong-sua-chua',
    categoryLabel: 'Bảo Dưỡng & Sửa Chữa',
    image: '',
    highlights: [''],
    featured: false,
    sortOrder: 0,
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

  function handleCategoryChange(value: string) {
    const cat = CATEGORIES.find((c) => c.value === value)
    setForm((prev) => ({ ...prev, category: value, categoryLabel: cat?.label ?? '' }))
  }

  function addHighlight() {
    setForm((prev) => ({ ...prev, highlights: [...prev.highlights, ''] }))
  }

  function removeHighlight(index: number) {
    setForm((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }))
  }

  function updateHighlight(index: number, value: string) {
    setForm((prev) => {
      const highlights = [...prev.highlights]
      highlights[index] = value
      return { ...prev, highlights }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      ...form,
      highlights: form.highlights.filter((h) => h.trim() !== ''),
    }

    const url =
      mode === 'new'
        ? '/api/admin/services'
        : `/api/admin/services/${initialData?.id}`
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

      router.push('/admin/services')
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
            Tên Dịch Vụ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447]"
            placeholder="Ví dụ: Bảo Dưỡng Định Kỳ"
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
            placeholder="bao-duong-dinh-ky"
          />
          <p className="text-xs text-gray-400 mt-1">URL: /dich-vu/{form.slug || '...'}</p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Danh Mục <span className="text-red-500">*</span>
          </label>
          <select
            value={form.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447] bg-white"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Short Description */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Mô Tả Ngắn <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.shortDescription}
            onChange={(e) => setForm((prev) => ({ ...prev, shortDescription: e.target.value }))}
            required
            maxLength={150}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447]"
            placeholder="Tóm tắt 1 dòng về dịch vụ"
          />
        </div>

        {/* Description */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Mô Tả Chi Tiết <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            required
            rows={5}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447] resize-y"
            placeholder="Mô tả đầy đủ về dịch vụ này..."
          />
        </div>

        {/* Image */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            URL Ảnh <span className="text-red-500">*</span>
          </label>
          <ImageUpload value={form.image} onChange={(url) => setForm((prev) => ({ ...prev, image: url }))} />
        </div>

        {/* Highlights */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Điểm Nổi Bật
          </label>
          <div className="space-y-2">
            {form.highlights.map((h, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={h}
                  onChange={(e) => updateHighlight(i, e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447]"
                  placeholder={`Điểm nổi bật ${i + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(i)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="flex items-center gap-1.5 text-[#0B2447] text-sm font-medium hover:text-[#E63312] transition-colors"
            >
              <Plus size={15} /> Thêm điểm nổi bật
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center gap-6">
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

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Thứ tự hiển thị
          </label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm((prev) => ({ ...prev, sortOrder: Number(e.target.value) }))}
            min={0}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447]"
          />
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
          {mode === 'new' ? 'Thêm Dịch Vụ' : 'Lưu Thay Đổi'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/services')}
          className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Hủy
        </button>
      </div>
    </form>
  )
}
