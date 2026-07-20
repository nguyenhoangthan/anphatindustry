'use client'

import { useState } from 'react'
import { Loader2, CheckCircle, Plus, X } from 'lucide-react'
import type { ModelCategory } from '@/data/models'
import ImageUpload from './ImageUpload'

const inp = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/20 focus:border-[#0B2447]'

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
}

// Dữ liệu cũ trong DB có thể thiếu field groups/items nếu được lưu trước khi
// shape này tồn tại — chuẩn hoá 1 lần lúc khởi tạo để .map()/.filter() phía
// dưới luôn an toàn, không cần rải ?? [] khắp nơi.
function normalize(data: ModelCategory[]): ModelCategory[] {
  return (data ?? []).map((c) => ({
    ...c,
    groups: (c.groups ?? []).map((g) => ({ ...g, items: g.items ?? [] })),
  }))
}

export default function ModelsForm({ initialData }: { initialData: ModelCategory[] }) {
  const [cats, setCats] = useState<ModelCategory[]>(() => normalize(initialData))
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const touch = () => setSuccess(false)
  const update = (next: ModelCategory[]) => { setCats(next); touch() }

  const setCat = (ci: number, patch: Partial<ModelCategory>) => {
    const next = [...cats]; next[ci] = { ...next[ci], ...patch }; update(next)
  }
  const addCat = () => update([...cats, { slug: 'muc-moi', label: 'Mục mới', description: '', icon: 'box', image: '', groups: [] }])
  const removeCat = (ci: number) => update(cats.filter((_, i) => i !== ci))

  const setGroup = (ci: number, gi: number, patch: Partial<{ title: string; items: string[] }>) => {
    const groups = [...cats[ci].groups]; groups[gi] = { ...groups[gi], ...patch }; setCat(ci, { groups })
  }
  const addGroup = (ci: number) => setCat(ci, { groups: [...cats[ci].groups, { title: 'Nhóm mới', items: [''] }] })
  const removeGroup = (ci: number, gi: number) => setCat(ci, { groups: cats[ci].groups.filter((_, i) => i !== gi) })

  const setItem = (ci: number, gi: number, ii: number, v: string) => {
    const items = [...cats[ci].groups[gi].items]; items[ii] = v; setGroup(ci, gi, { items })
  }
  const addItem = (ci: number, gi: number) => setGroup(ci, gi, { items: [...cats[ci].groups[gi].items, ''] })
  const removeItem = (ci: number, gi: number, ii: number) => setGroup(ci, gi, { items: cats[ci].groups[gi].items.filter((_, i) => i !== ii) })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(''); setSuccess(false)
    // dọn item rỗng
    const payload = cats.map(c => ({ ...c, groups: c.groups.map(g => ({ ...g, items: g.items.filter(i => i.trim() !== '') })) }))
    try {
      const res = await fetch('/api/admin/content/section_models', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      })
      if (!res.ok) { setError('Lỗi khi lưu'); return }
      setSuccess(true)
    } catch { setError('Lỗi kết nối') } finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2"><CheckCircle size={15} /> Đã lưu thành công</div>}

      {cats.map((cat, ci) => (
        <div key={ci} className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide">Hạng mục {ci + 1}</h3>
            <button type="button" onClick={() => removeCat(ci)} className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-xs"><X size={14} /> Xóa hạng mục</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tên hạng mục</label><input className={inp} value={cat.label} onChange={e => setCat(ci, { label: e.target.value, slug: cat.slug || slugify(e.target.value) })} /></div>
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Slug (đường dẫn)</label><input className={inp} value={cat.slug} onChange={e => setCat(ci, { slug: slugify(e.target.value) })} /></div>
            <div className="lg:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Mô tả</label><textarea rows={2} className={`${inp} resize-y`} value={cat.description} onChange={e => setCat(ci, { description: e.target.value })} /></div>
            <div className="lg:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Ảnh</label><ImageUpload value={cat.image} onChange={(url) => setCat(ci, { image: url })} /></div>
          </div>

          {/* Groups */}
          <div className="space-y-3">
            {cat.groups.map((g, gi) => (
              <div key={gi} className="border border-gray-100 rounded-xl p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <input className={`${inp} font-semibold`} value={g.title} onChange={e => setGroup(ci, gi, { title: e.target.value })} placeholder="Tên nhóm" />
                  <button type="button" onClick={() => removeGroup(ci, gi)} className="p-2 text-gray-400 hover:text-red-500 flex-shrink-0"><X size={16} /></button>
                </div>
                <div className="space-y-2 pl-1">
                  {g.items.map((it, ii) => (
                    <div key={ii} className="flex gap-2">
                      <input className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/20" value={it} onChange={e => setItem(ci, gi, ii, e.target.value)} placeholder={`Mục ${ii + 1}`} />
                      <button type="button" onClick={() => removeItem(ci, gi, ii)} className="p-2 text-gray-300 hover:text-red-500"><X size={14} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addItem(ci, gi)} className="flex items-center gap-1 text-[#0B2447] text-xs font-medium hover:text-[#E63312]"><Plus size={13} /> Thêm mục</button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => addGroup(ci)} className="flex items-center gap-1.5 text-[#0B2447] text-sm font-medium hover:text-[#E63312]"><Plus size={15} /> Thêm nhóm</button>
          </div>
        </div>
      ))}

      <button type="button" onClick={addCat} className="flex items-center gap-1.5 text-[#0B2447] text-sm font-semibold hover:text-[#E63312]"><Plus size={15} /> Thêm hạng mục</button>

      <div className="pt-4 border-t border-gray-100">
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#0B2447] text-white font-semibold px-7 py-2.5 rounded-xl hover:bg-[#0B2447]/90 transition-colors disabled:opacity-60">
          {loading && <Loader2 size={15} className="animate-spin" />} Lưu Mô Hình
        </button>
      </div>
    </form>
  )
}
