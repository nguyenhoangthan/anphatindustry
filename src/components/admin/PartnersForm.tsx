'use client'

import { useState } from 'react'
import { Plus, X, Loader2, CheckCircle } from 'lucide-react'
import type { defaultPartnersSection } from '@/lib/defaultContent'

type Data = typeof defaultPartnersSection

export default function PartnersForm({ initialData }: { initialData: Data }) {
  const [form, setForm] = useState<Data>(initialData)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = <K extends keyof Data>(k: K, v: Data[K]) => { setForm(p => ({ ...p, [k]: v })); setSuccess(false) }

  function updateStat(i: number, field: 'value' | 'label', v: string) {
    const stats = [...form.stats]; stats[i] = { ...stats[i], [field]: v }; set('stats', stats)
  }
  function updatePartner(i: number, field: 'name' | 'abbr', v: string) {
    const p = [...form.partners]; p[i] = { ...p[i], [field]: v }; set('partners', p)
  }
  function addPartner() { set('partners', [...form.partners, { id: Date.now(), name: '', abbr: '' }]) }
  function removePartner(i: number) { set('partners', form.partners.filter((_, idx) => idx !== i)) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(''); setSuccess(false)
    try {
      const res = await fetch('/api/admin/content/section_partners', {
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
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Subtitle</label><input type="text" value={form.subtitle} onChange={e => set('subtitle', e.target.value)} className={inp} /></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Chú thích cuối</label><input type="text" value={form.footnote} onChange={e => set('footnote', e.target.value)} className={inp} /></div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">4 Số Liệu Thống Kê</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {form.stats.map((stat, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
              <p className="text-xs font-bold text-[#E63312] mb-2">Số liệu {i + 1}</p>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">Giá trị</label><input type="text" value={stat.value} onChange={e => updateStat(i, 'value', e.target.value)} className={inp} placeholder="9+" /></div>
              <div className="mt-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Nhãn</label><input type="text" value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)} className={inp} placeholder="Năm kinh nghiệm" /></div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Danh Sách Đối Tác / Thương Hiệu Xe</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {form.partners.map((p, i) => (
            <div key={p.id} className="border border-gray-100 rounded-xl p-3 bg-gray-50/50 relative">
              <button type="button" onClick={() => removePartner(i)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors"><X size={13} /></button>
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tên</label><input type="text" value={p.name} onChange={e => updatePartner(i, 'name', e.target.value)} className={inp} placeholder="Toyota" /></div>
              <div className="mt-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Viết tắt (3-4 ký tự)</label><input type="text" value={p.abbr} onChange={e => updatePartner(i, 'abbr', e.target.value)} maxLength={4} className={inp} placeholder="TYT" /></div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addPartner} className="flex items-center gap-1.5 text-[#0B2447] text-sm font-medium hover:text-[#E63312] transition-colors"><Plus size={14} /> Thêm đối tác</button>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#0B2447] text-white font-semibold px-7 py-2.5 rounded-xl hover:bg-[#0B2447]/90 transition-colors disabled:opacity-60">
          {loading && <Loader2 size={15} className="animate-spin" />} Lưu Đối Tác & Số Liệu
        </button>
      </div>
    </form>
  )
}
