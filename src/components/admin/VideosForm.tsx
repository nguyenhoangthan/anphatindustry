'use client'

import { useState, useRef } from 'react'
import { Loader2, CheckCircle, Plus, X, Upload } from 'lucide-react'
import type { defaultVideos } from '@/lib/defaultContent'

type Data = typeof defaultVideos
const inp = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/20 focus:border-[#0B2447]'

function VideoUrlField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [err, setErr] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  async function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true); setErr('')
    try {
      const fd = new FormData(); fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) { setErr(data.error || 'Lỗi tải lên'); return }
      onChange(data.url)
    } catch { setErr('Lỗi kết nối') } finally { setUploading(false); if (ref.current) ref.current.value = '' }
  }
  return (
    <div>
      <div className="flex gap-2">
        <input className={`${inp} flex-1`} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Dán link YouTube hoặc tải video lên" />
        <button type="button" onClick={() => ref.current?.click()} disabled={uploading} className="flex items-center gap-1.5 bg-[#0B2447] text-white text-xs font-medium px-3 rounded-xl hover:bg-[#0B2447]/90 disabled:opacity-60 flex-shrink-0">
          {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />} Tải video
        </button>
      </div>
      {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
      <input ref={ref} type="file" accept="video/*" onChange={handle} className="hidden" />
    </div>
  )
}

export default function VideosForm({ initialData }: { initialData: Data }) {
  const [form, setForm] = useState<Data>(initialData)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const touch = () => setSuccess(false)

  const setIntro = (k: keyof Data['intro'], v: string) => { setForm(p => ({ ...p, intro: { ...p.intro, [k]: v } })); touch() }
  const setItem = (i: number, patch: Partial<Data['items'][number]>) => {
    const items = [...form.items]; items[i] = { ...items[i], ...patch }; setForm(p => ({ ...p, items })); touch()
  }
  const addItem = () => { setForm(p => ({ ...p, items: [...p.items, { title: '', url: '', description: '' }] })); touch() }
  const removeItem = (i: number) => { setForm(p => ({ ...p, items: p.items.filter((_, x) => x !== i) })); touch() }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(''); setSuccess(false)
    const payload = { ...form, items: form.items.filter(v => v.url.trim() !== '') }
    try {
      const res = await fetch('/api/admin/content/section_videos', {
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

      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Giới Thiệu Mục Video</h3>
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tiêu đề</label><input className={inp} value={form.intro.title} onChange={e => setIntro('title', e.target.value)} /></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Mô tả</label><textarea rows={2} className={`${inp} resize-y`} value={form.intro.subtitle} onChange={e => setIntro('subtitle', e.target.value)} /></div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#0B2447] uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Danh Sách Video</h3>
        <p className="text-xs text-gray-500 mb-4">💡 Khuyên dùng: tải video lên YouTube rồi dán link vào đây (nhẹ & xem mượt). Hoặc bấm “Tải video” để tải file ngắn (tối đa 50MB).</p>
        <div className="space-y-4">
          {form.items.map((v, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-5 bg-gray-50/50">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-[#0B2447]">Video {i + 1}</p>
                <button type="button" onClick={() => removeItem(i)} className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-xs"><X size={14} /> Xóa</button>
              </div>
              <div className="space-y-3">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tiêu đề</label><input className={inp} value={v.title} onChange={e => setItem(i, { title: e.target.value })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Link video</label><VideoUrlField value={v.url} onChange={(url) => setItem(i, { url })} /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Mô tả (tuỳ chọn)</label><input className={inp} value={v.description} onChange={e => setItem(i, { description: e.target.value })} /></div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addItem} className="flex items-center gap-1.5 text-[#0B2447] text-sm font-medium hover:text-[#E63312]"><Plus size={15} /> Thêm video</button>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#0B2447] text-white font-semibold px-7 py-2.5 rounded-xl hover:bg-[#0B2447]/90 transition-colors disabled:opacity-60">
          {loading && <Loader2 size={15} className="animate-spin" />} Lưu Video
        </button>
      </div>
    </form>
  )
}
