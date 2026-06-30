'use client'

import { useState } from 'react'
import { Plus, X, Loader2, CheckCircle } from 'lucide-react'
import type { defaultPricingPackages } from '@/lib/defaultContent'

type Data = typeof defaultPricingPackages

export default function PricingForm({ initialData }: { initialData: Data }) {
  const [form, setForm] = useState<Data>(initialData)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = <K extends keyof Data>(k: K, v: Data[K]) => { setForm(p => ({ ...p, [k]: v })); setSuccess(false) }

  function updatePkg(i: number, field: string, v: unknown) {
    const pkgs = [...form.packages] as typeof form.packages
    pkgs[i] = { ...pkgs[i], [field]: v }
    set('packages', pkgs)
  }
  function addItem(pi: number) {
    const pkgs = [...form.packages] as typeof form.packages
    pkgs[pi] = { ...pkgs[pi], items: [...pkgs[pi].items, ''] }
    set('packages', pkgs)
  }
  function updateItem(pi: number, ii: number, v: string) {
    const pkgs = [...form.packages] as typeof form.packages
    const items = [...pkgs[pi].items]; items[ii] = v
    pkgs[pi] = { ...pkgs[pi], items }; set('packages', pkgs)
  }
  function removeItem(pi: number, ii: number) {
    const pkgs = [...form.packages] as typeof form.packages
    pkgs[pi] = { ...pkgs[pi], items: pkgs[pi].items.filter((_, idx) => idx !== ii) }
    set('packages', pkgs)
  }
  function addNote() { set('notes', [...form.notes, '']) }
  function updateNote(i: number, v: string) { const n = [...form.notes]; n[i] = v; set('notes', n) }
  function removeNote(i: number) { set('notes', form.notes.filter((_, idx) => idx !== i)) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(''); setSuccess(false)
    try {
      const res = await fetch('/api/admin/content/section_pricing', {
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
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Tiêu Đề Trang Báo Giá</h3>
        <div className="grid grid-cols-1 gap-4">
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Badge</label><input type="text" value={form.badge} onChange={e => set('badge', e.target.value)} className={inp} /></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tiêu Đề</label><input type="text" value={form.title} onChange={e => set('title', e.target.value)} className={inp} /></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Subtitle</label><input type="text" value={form.subtitle} onChange={e => set('subtitle', e.target.value)} className={inp} /></div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Các Gói Dịch Vụ</h3>
        <div className="space-y-6">
          {form.packages.map((pkg, pi) => (
            <div key={pi} className={`border rounded-2xl p-5 ${pkg.highlight ? 'border-[#E63312]/30 bg-[#E63312]/5' : 'border-gray-100 bg-gray-50/50'}`}>
              <p className="text-xs font-bold text-[#0B2447] mb-4">Gói {pi + 1}</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tên Gói</label><input type="text" value={pkg.name} onChange={e => updatePkg(pi, 'name', e.target.value)} className={inp} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Badge (nhãn)</label><input type="text" value={pkg.badge} onChange={e => updatePkg(pi, 'badge', e.target.value)} className={inp} placeholder="Phổ Biến / Khuyến Nghị" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Giá</label><input type="text" value={pkg.price} onChange={e => updatePkg(pi, 'price', e.target.value)} className={inp} placeholder="Từ 350.000đ" /></div>
                <div className="flex items-center gap-3 pt-5">
                  <input type="checkbox" id={`hl-${pi}`} checked={pkg.highlight} onChange={e => updatePkg(pi, 'highlight', e.target.checked)} className="w-4 h-4 accent-[#E63312]" />
                  <label htmlFor={`hl-${pi}`} className="text-sm font-semibold text-gray-600">Làm nổi bật (viền đỏ)</label>
                </div>
                <div className="lg:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Mô Tả</label><input type="text" value={pkg.description} onChange={e => updatePkg(pi, 'description', e.target.value)} className={inp} /></div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Danh Sách Items</label>
                <div className="space-y-2">
                  {pkg.items.map((item, ii) => (
                    <div key={ii} className="flex gap-2">
                      <input type="text" value={item} onChange={e => updateItem(pi, ii, e.target.value)} className={`flex-1 ${inp}`} />
                      <button type="button" onClick={() => removeItem(pi, ii)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><X size={13} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addItem(pi)} className="flex items-center gap-1.5 text-[#0B2447] text-xs font-medium hover:text-[#E63312] transition-colors"><Plus size={12} /> Thêm item</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Ghi Chú / Lưu Ý</h3>
        <div className="space-y-2">
          {form.notes.map((note, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" value={note} onChange={e => updateNote(i, e.target.value)} className={`flex-1 ${inp}`} />
              <button type="button" onClick={() => removeNote(i)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><X size={13} /></button>
            </div>
          ))}
          <button type="button" onClick={addNote} className="flex items-center gap-1.5 text-[#0B2447] text-sm font-medium hover:text-[#E63312] transition-colors mt-1"><Plus size={14} /> Thêm ghi chú</button>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#0B2447] text-white font-semibold px-7 py-2.5 rounded-xl hover:bg-[#0B2447]/90 transition-colors disabled:opacity-60">
          {loading && <Loader2 size={15} className="animate-spin" />} Lưu Báo Giá
        </button>
      </div>
    </form>
  )
}
