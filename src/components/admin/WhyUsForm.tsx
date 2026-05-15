'use client'

import { useState } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'
import type { defaultWhyChooseUs } from '@/lib/defaultContent'

type Data = typeof defaultWhyChooseUs

export default function WhyUsForm({ initialData }: { initialData: Data }) {
  const [form, setForm] = useState<Data>(initialData)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = <K extends keyof Data>(k: K, v: Data[K]) => { setForm(p => ({ ...p, [k]: v })); setSuccess(false) }

  function updateValue(i: number, field: 'title' | 'description', v: string) {
    const vals = [...form.values]
    vals[i] = { ...vals[i], [field]: v }
    set('values', vals)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(''); setSuccess(false)
    try {
      const res = await fetch('/api/admin/content/section_why_us', {
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
        <div className="grid grid-cols-1 gap-4">
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Badge</label><input type="text" value={form.badge} onChange={e => set('badge', e.target.value)} className={inp} /></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tiêu Đề</label><input type="text" value={form.title} onChange={e => set('title', e.target.value)} className={inp} /></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Subtitle</label><textarea value={form.subtitle} onChange={e => set('subtitle', e.target.value)} rows={2} className={`${inp} resize-y`} /></div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">4 Giá Trị Cốt Lõi</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {form.values.map((val, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-5 bg-gray-50/50">
              <p className="text-xs font-bold text-[#E63312] mb-3">Giá Trị {i + 1}</p>
              <div className="space-y-3">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tiêu Đề</label><input type="text" value={val.title} onChange={e => updateValue(i, 'title', e.target.value)} className={inp} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Mô Tả</label><textarea value={val.description} onChange={e => updateValue(i, 'description', e.target.value)} rows={3} className={`${inp} resize-y`} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#0B2447] text-white font-semibold px-7 py-2.5 rounded-xl hover:bg-[#0B2447]/90 transition-colors disabled:opacity-60">
          {loading && <Loader2 size={15} className="animate-spin" />} Lưu Giá Trị Cốt Lõi
        </button>
      </div>
    </form>
  )
}
