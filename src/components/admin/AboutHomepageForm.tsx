'use client'

import { useState } from 'react'
import { Plus, X, Loader2, CheckCircle } from 'lucide-react'
import type { defaultAboutSection } from '@/lib/defaultContent'

type Data = typeof defaultAboutSection

export default function AboutHomepageForm({ initialData }: { initialData: Data }) {
  const [form, setForm] = useState<Data>(initialData)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = <K extends keyof Data>(k: K, v: Data[K]) => { setForm(p => ({ ...p, [k]: v })); setSuccess(false) }

  function updateHighlight(i: number, v: string) {
    const h = [...form.highlights]; h[i] = v; set('highlights', h)
  }
  function addHighlight() { set('highlights', [...form.highlights, '']) }
  function removeHighlight(i: number) { set('highlights', form.highlights.filter((_, idx) => idx !== i)) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(''); setSuccess(false)
    try {
      const res = await fetch('/api/admin/content/section_about_home', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      if (!res.ok) { setError('Lỗi khi lưu'); return }
      setSuccess(true)
    } catch { setError('Lỗi kết nối') } finally { setLoading(false) }
  }

  const inp = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/20 focus:border-[#0B2447]'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2"><CheckCircle size={15} /> Đã lưu thành công</div>}

      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Tiêu Đề Section</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Badge</label><input type="text" value={form.badge} onChange={e => set('badge', e.target.value)} className={inp} /></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tiêu Đề</label><input type="text" value={form.title} onChange={e => set('title', e.target.value)} className={inp} /></div>
          <div className="lg:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Subtitle</label><input type="text" value={form.subtitle} onChange={e => set('subtitle', e.target.value)} className={inp} /></div>
          <div className="lg:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Đoạn giới thiệu</label><textarea value={form.body} onChange={e => set('body', e.target.value)} rows={4} className={`${inp} resize-y`} /></div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Ảnh & Số Liệu Nổi Bật</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1">URL Ảnh</label>
            <input type="url" value={form.image} onChange={e => set('image', e.target.value)} className={inp} />
            {form.image && <img src={form.image} alt="" className="mt-2 h-24 w-full object-cover rounded-xl border border-gray-100" onError={e => ((e.target as HTMLImageElement).style.display='none')} />}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Số liệu 1 (giá trị)</label>
            <input type="text" value={form.stat1Value} onChange={e => set('stat1Value', e.target.value)} className={inp} placeholder="9+" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Số liệu 1 (nhãn)</label>
            <input type="text" value={form.stat1Label} onChange={e => set('stat1Label', e.target.value)} className={inp} placeholder="Năm kinh nghiệm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Số liệu 2 (giá trị)</label>
            <input type="text" value={form.stat2Value} onChange={e => set('stat2Value', e.target.value)} className={inp} placeholder="5K+" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Số liệu 2 (nhãn)</label>
            <input type="text" value={form.stat2Label} onChange={e => set('stat2Label', e.target.value)} className={inp} placeholder="Khách hàng tin tưởng" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Danh Sách Điểm Mạnh</h3>
        <div className="space-y-2">
          {form.highlights.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" value={h} onChange={e => updateHighlight(i, e.target.value)} className={`flex-1 ${inp}`} placeholder={`Điểm mạnh ${i + 1}`} />
              <button type="button" onClick={() => removeHighlight(i)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><X size={15} /></button>
            </div>
          ))}
          <button type="button" onClick={addHighlight} className="flex items-center gap-1.5 text-[#0B2447] text-sm font-medium hover:text-[#E63312] transition-colors mt-1"><Plus size={14} /> Thêm điểm mạnh</button>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#0B2447] text-white font-semibold px-7 py-2.5 rounded-xl hover:bg-[#0B2447]/90 transition-colors disabled:opacity-60">
          {loading && <Loader2 size={15} className="animate-spin" />} Lưu Giới Thiệu
        </button>
      </div>
    </form>
  )
}
