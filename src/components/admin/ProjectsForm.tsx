'use client'

import { useState } from 'react'
import { Loader2, CheckCircle, Plus, X } from 'lucide-react'
import type { defaultProjects } from '@/lib/defaultContent'
import ImageUpload from './ImageUpload'

type Data = typeof defaultProjects
type Project = Data['projects'][number]
type Partner = Data['partners'][number]

const inp = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/20 focus:border-[#0B2447]'

export default function ProjectsForm({ initialData }: { initialData: Data }) {
  const [form, setForm] = useState<Data>(initialData)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const touch = () => setSuccess(false)

  const setIntro = (k: keyof Data['intro'], v: string) => { setForm(p => ({ ...p, intro: { ...p.intro, [k]: v } })); touch() }

  // Projects
  const setProject = (i: number, patch: Partial<Project>) => {
    const projects = [...form.projects]; projects[i] = { ...projects[i], ...patch }; setForm(p => ({ ...p, projects })); touch()
  }
  const addProject = () => { setForm(p => ({ ...p, projects: [...p.projects, { title: '', description: '', image: '', year: '' }] })); touch() }
  const removeProject = (i: number) => { setForm(p => ({ ...p, projects: p.projects.filter((_, x) => x !== i) })); touch() }

  // Partners
  const setPartner = (i: number, patch: Partial<Partner>) => {
    const partners = [...form.partners]; partners[i] = { ...partners[i], ...patch }; setForm(p => ({ ...p, partners })); touch()
  }
  const addPartner = () => { setForm(p => ({ ...p, partners: [...p.partners, { name: '', abbr: '' }] })); touch() }
  const removePartner = (i: number) => { setForm(p => ({ ...p, partners: p.partners.filter((_, x) => x !== i) })); touch() }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(''); setSuccess(false)
    const payload = {
      ...form,
      projects: form.projects.filter(p => p.title.trim() !== ''),
      partners: form.partners.filter(p => p.name.trim() !== ''),
    }
    try {
      const res = await fetch('/api/admin/content/section_projects', {
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

      {/* Intro */}
      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Giới Thiệu</h3>
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tiêu đề</label><input className={inp} value={form.intro.title} onChange={e => setIntro('title', e.target.value)} /></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Mô tả</label><textarea rows={2} className={`${inp} resize-y`} value={form.intro.subtitle} onChange={e => setIntro('subtitle', e.target.value)} /></div>
        </div>
      </div>

      {/* Projects */}
      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Dự Án Đã Thực Hiện</h3>
        <div className="space-y-4">
          {form.projects.map((p, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-5 bg-gray-50/50">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-[#0B2447]">Dự án {i + 1}</p>
                <button type="button" onClick={() => removeProject(i)} className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-xs"><X size={14} /> Xóa</button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="lg:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Tên dự án</label><input className={inp} value={p.title} onChange={e => setProject(i, { title: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Năm</label><input className={inp} value={p.year} onChange={e => setProject(i, { year: e.target.value })} placeholder="2024" /></div>
                <div className="lg:col-span-3"><label className="block text-xs font-semibold text-gray-600 mb-1">Mô tả</label><textarea rows={2} className={`${inp} resize-y`} value={p.description} onChange={e => setProject(i, { description: e.target.value })} /></div>
                <div className="lg:col-span-3"><label className="block text-xs font-semibold text-gray-600 mb-1">Ảnh</label><ImageUpload value={p.image} onChange={(url) => setProject(i, { image: url })} /></div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addProject} className="flex items-center gap-1.5 text-[#0B2447] text-sm font-medium hover:text-[#E63312]"><Plus size={15} /> Thêm dự án</button>
        </div>
      </div>

      {/* Partners */}
      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Đối Tác & Khách Hàng</h3>
        <div className="space-y-2">
          {form.partners.map((p, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input className={`${inp} flex-1`} value={p.name} onChange={e => setPartner(i, { name: e.target.value })} placeholder="Tên đối tác" />
              <input className="w-28 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/20" value={p.abbr} onChange={e => setPartner(i, { abbr: e.target.value })} placeholder="Viết tắt" />
              <button type="button" onClick={() => removePartner(i)} className="p-2 text-gray-400 hover:text-red-500"><X size={16} /></button>
            </div>
          ))}
          <button type="button" onClick={addPartner} className="flex items-center gap-1.5 text-[#0B2447] text-sm font-medium hover:text-[#E63312] mt-2"><Plus size={15} /> Thêm đối tác</button>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#0B2447] text-white font-semibold px-7 py-2.5 rounded-xl hover:bg-[#0B2447]/90 transition-colors disabled:opacity-60">
          {loading && <Loader2 size={15} className="animate-spin" />} Lưu Dự Án & Đối Tác
        </button>
      </div>
    </form>
  )
}
