'use client'

import { useState } from 'react'
import { Plus, X, Loader2, CheckCircle } from 'lucide-react'
import type { defaultTeamSection } from '@/lib/defaultContent'

type Data = typeof defaultTeamSection

export default function TeamForm({ initialData }: { initialData: Data }) {
  const [form, setForm] = useState<Data>(initialData)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const setIntro = <K extends keyof Data['intro']>(k: K, v: Data['intro'][K]) => {
    setForm(p => ({ ...p, intro: { ...p.intro, [k]: v } })); setSuccess(false)
  }
  const updateIntroStat = (i: number, field: 'value' | 'label', v: string) => {
    const s = [...form.intro.stats]; s[i] = { ...s[i], [field]: v }; setIntro('stats', s)
  }
  const updateMission = (i: number, field: 'title' | 'description', v: string) => {
    const m = [...form.missions]; m[i] = { ...m[i], [field]: v }; setForm(p => ({ ...p, missions: m })); setSuccess(false)
  }
  const updateField = (i: number, v: string) => {
    const f = [...form.fields]; f[i] = v; setForm(p => ({ ...p, fields: f })); setSuccess(false)
  }
  const addField = () => { setForm(p => ({ ...p, fields: [...p.fields, ''] })); setSuccess(false) }
  const removeField = (i: number) => { setForm(p => ({ ...p, fields: p.fields.filter((_, idx) => idx !== i) })); setSuccess(false) }
  const updateMember = (i: number, field: 'name' | 'role' | 'description', v: string) => {
    const t = [...form.team]; t[i] = { ...t[i], [field]: v }; setForm(p => ({ ...p, team: t })); setSuccess(false)
  }
  const addMember = () => { setForm(p => ({ ...p, team: [...p.team, { name: '', role: '', description: '' }] })); setSuccess(false) }
  const removeMember = (i: number) => { setForm(p => ({ ...p, team: p.team.filter((_, idx) => idx !== i) })); setSuccess(false) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(''); setSuccess(false)
    try {
      const res = await fetch('/api/admin/content/section_team', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      if (!res.ok) { setError('Lỗi khi lưu'); return }
      setSuccess(true)
    } catch { setError('Lỗi kết nối') } finally { setLoading(false) }
  }

  const inp = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/20 focus:border-[#0B2447]'

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2"><CheckCircle size={15} /> Đã lưu thành công</div>}

      {/* INTRO */}
      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Phần Giới Thiệu Công Ty</h3>
        <div className="grid grid-cols-1 gap-4">
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Badge</label><input type="text" value={form.intro.badge} onChange={e => setIntro('badge', e.target.value)} className={inp} /></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tiêu Đề</label><input type="text" value={form.intro.title} onChange={e => setIntro('title', e.target.value)} className={inp} /></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Đoạn Văn 1</label><textarea value={form.intro.body1} onChange={e => setIntro('body1', e.target.value)} rows={3} className={`${inp} resize-y`} /></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Đoạn Văn 2</label><textarea value={form.intro.body2} onChange={e => setIntro('body2', e.target.value)} rows={3} className={`${inp} resize-y`} /></div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">URL Ảnh</label>
            <input type="url" value={form.intro.image} onChange={e => setIntro('image', e.target.value)} className={inp} />
            {form.intro.image && <img src={form.intro.image} alt="" className="mt-2 h-24 w-full object-cover rounded-xl border border-gray-100" onError={e => ((e.target as HTMLImageElement).style.display='none')} />}
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold text-gray-600 mb-2">4 Số Liệu</label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {form.intro.stats.map((s, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-3 bg-gray-50/50">
                <div><label className="block text-xs text-gray-500 mb-1">Giá trị</label><input type="text" value={s.value} onChange={e => updateIntroStat(i, 'value', e.target.value)} className={inp} /></div>
                <div className="mt-2"><label className="block text-xs text-gray-500 mb-1">Nhãn</label><input type="text" value={s.label} onChange={e => updateIntroStat(i, 'label', e.target.value)} className={inp} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MISSIONS */}
      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Sứ Mệnh / Tầm Nhìn / Giá Trị (4 mục)</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {form.missions.map((m, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
              <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tiêu Đề</label><input type="text" value={m.title} onChange={e => updateMission(i, 'title', e.target.value)} className={inp} /></div>
              <div className="mt-3"><label className="block text-xs font-semibold text-gray-600 mb-1">Mô Tả</label><textarea value={m.description} onChange={e => updateMission(i, 'description', e.target.value)} rows={3} className={`${inp} resize-y`} /></div>
            </div>
          ))}
        </div>
      </div>

      {/* FIELDS */}
      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Lĩnh Vực Hoạt Động</h3>
        <div className="space-y-2">
          {form.fields.map((f, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" value={f} onChange={e => updateField(i, e.target.value)} className={`flex-1 ${inp}`} />
              <button type="button" onClick={() => removeField(i)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><X size={13} /></button>
            </div>
          ))}
          <button type="button" onClick={addField} className="flex items-center gap-1.5 text-[#0B2447] text-sm font-medium hover:text-[#E63312] transition-colors mt-1"><Plus size={14} /> Thêm lĩnh vực</button>
        </div>
      </div>

      {/* TEAM */}
      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Thành Viên Đội Ngũ</h3>
        <div className="space-y-4">
          {form.team.map((m, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 relative">
              <button type="button" onClick={() => removeMember(i)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"><X size={14} /></button>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pr-6">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Họ Tên</label><input type="text" value={m.name} onChange={e => updateMember(i, 'name', e.target.value)} className={inp} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Vai Trò / Chức Danh</label><input type="text" value={m.role} onChange={e => updateMember(i, 'role', e.target.value)} className={inp} /></div>
                <div className="lg:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Mô Tả</label><textarea value={m.description} onChange={e => updateMember(i, 'description', e.target.value)} rows={2} className={`${inp} resize-y`} /></div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addMember} className="flex items-center gap-1.5 text-[#0B2447] text-sm font-medium hover:text-[#E63312] transition-colors"><Plus size={14} /> Thêm thành viên</button>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#0B2447] text-white font-semibold px-7 py-2.5 rounded-xl hover:bg-[#0B2447]/90 transition-colors disabled:opacity-60">
          {loading && <Loader2 size={15} className="animate-spin" />} Lưu Đội Ngũ & Về Chúng Tôi
        </button>
      </div>
    </form>
  )
}
