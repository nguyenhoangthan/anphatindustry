'use client'

import { useState } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'
import type { defaultContactCTA } from '@/lib/defaultContent'

type Data = typeof defaultContactCTA

export default function CTAForm({ initialData }: { initialData: Data }) {
  const [form, setForm] = useState<Data>(initialData)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = <K extends keyof Data>(k: K, v: Data[K]) => { setForm(p => ({ ...p, [k]: v })); setSuccess(false) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError(''); setSuccess(false)
    try {
      const res = await fetch('/api/admin/content/section_contact_cta', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
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

      <div className="bg-[#E63312]/5 border border-[#E63312]/20 rounded-2xl p-5">
        <p className="text-xs font-bold text-[#E63312] mb-1">Preview vị trí</p>
        <p className="text-xs text-gray-500">Section nền đỏ ở cuối trang chủ – nơi kêu gọi khách đặt lịch.</p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tiêu Đề Lớn (HEADLINE)</label>
          <input type="text" value={form.headline} onChange={e => set('headline', e.target.value)} className={inp} placeholder="CAM KẾT VÀNG TẠI AN PHÁT" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Câu Cam Kết / Quote</label>
          <input type="text" value={form.quote} onChange={e => set('quote', e.target.value)} className={inp} placeholder='"Không sửa xong – Không thu phí..."' />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Đoạn mô tả phụ</label>
          <textarea value={form.body} onChange={e => set('body', e.target.value)} rows={3} className={`${inp} resize-y`} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Text nút CTA chính</label>
            <input type="text" value={form.cta1Text} onChange={e => set('cta1Text', e.target.value)} className={inp} placeholder="Đặt Lịch Hẹn Ngay" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Link nút CTA chính</label>
            <input type="text" value={form.cta1Href} onChange={e => set('cta1Href', e.target.value)} className={inp} placeholder="/lien-he" />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#0B2447] text-white font-semibold px-7 py-2.5 rounded-xl hover:bg-[#0B2447]/90 transition-colors disabled:opacity-60">
          {loading && <Loader2 size={15} className="animate-spin" />} Lưu CTA
        </button>
      </div>
    </form>
  )
}
