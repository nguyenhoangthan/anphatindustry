'use client'

import { useState } from 'react'
import { Plus, X, Loader2, CheckCircle } from 'lucide-react'

interface Slide {
  id: number
  image: string
  badge: string
  title: string
  subtitle: string
  description: string
}

export default function HeroForm({ initialData }: { initialData: Slide[] }) {
  const [slides, setSlides] = useState<Slide[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function updateSlide(index: number, field: keyof Slide, value: string) {
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)))
    setSuccess(false)
  }

  function addSlide() {
    setSlides((prev) => [
      ...prev,
      { id: Date.now(), image: '', badge: '', title: '', subtitle: '', description: '' },
    ])
  }

  function removeSlide(index: number) {
    setSlides((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      const res = await fetch('/api/admin/content/section_hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slides),
      })
      if (!res.ok) { setError('Lỗi khi lưu'); return }
      setSuccess(true)
    } catch { setError('Lỗi kết nối') } finally { setLoading(false) }
  }

  const inp = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/20 focus:border-[#0B2447]'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2"><CheckCircle size={15} /> Đã lưu thành công</div>}

      {slides.map((slide, i) => (
        <div key={slide.id} className="border border-gray-100 rounded-2xl p-5 bg-gray-50/50 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#0B2447] text-sm">Slide {i + 1}</h3>
            {slides.length > 1 && (
              <button type="button" onClick={() => removeSlide(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={15} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">URL Ảnh Nền *</label>
              <input type="url" value={slide.image} onChange={(e) => updateSlide(i, 'image', e.target.value)} className={inp} placeholder="https://..." required />
              {slide.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={slide.image} alt="" className="mt-2 h-24 w-full object-cover rounded-xl border border-gray-100" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Badge (nhãn nhỏ)</label>
              <input type="text" value={slide.badge} onChange={(e) => updateSlide(i, 'badge', e.target.value)} className={inp} placeholder="Ví dụ: Chuyên Nghiệp – Uy Tín" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Tiêu Đề Chính *</label>
              <input type="text" value={slide.title} onChange={(e) => updateSlide(i, 'title', e.target.value)} className={inp} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Tiêu Đề Phụ</label>
              <input type="text" value={slide.subtitle} onChange={(e) => updateSlide(i, 'subtitle', e.target.value)} className={inp} />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Mô Tả</label>
              <textarea value={slide.description} onChange={(e) => updateSlide(i, 'description', e.target.value)} rows={2} className={`${inp} resize-y`} />
            </div>
          </div>
        </div>
      ))}

      <button type="button" onClick={addSlide} className="flex items-center gap-2 text-[#0B2447] text-sm font-medium hover:text-[#E63312] transition-colors">
        <Plus size={15} /> Thêm Slide
      </button>

      <div className="pt-4 border-t border-gray-100">
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#0B2447] text-white font-semibold px-7 py-2.5 rounded-xl hover:bg-[#0B2447]/90 transition-colors disabled:opacity-60">
          {loading && <Loader2 size={15} className="animate-spin" />} Lưu Hero Slider
        </button>
      </div>
    </form>
  )
}
