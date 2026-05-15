'use client'

import { useState } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'

interface SettingsData {
  name: string
  shortName: string
  tagline: string
  description: string
  url: string
  phone: string[]
  email: string
  address: string
  workingHours: string
  businessNumber: string
  social: {
    facebook: string
    zalo: string
    youtube: string
  }
}

interface Props {
  initialData: SettingsData
}

export default function SettingsForm({ initialData }: Props) {
  const [form, setForm] = useState<SettingsData>(initialData)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function setField<K extends keyof SettingsData>(key: K, value: SettingsData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSuccess(false)
  }

  function setSocial(key: keyof SettingsData['social'], value: string) {
    setForm((prev) => ({ ...prev, social: { ...prev.social, [key]: value } }))
    setSuccess(false)
  }

  function setPhone(index: number, value: string) {
    const phones = [...form.phone]
    phones[index] = value
    setField('phone', phones)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        setError('Không thể lưu cài đặt')
        return
      }

      setSuccess(true)
    } catch {
      setError('Lỗi kết nối máy chủ')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/30 focus:border-[#0B2447]'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
          <CheckCircle size={16} /> Đã lưu cài đặt thành công
        </div>
      )}

      {/* Company Info */}
      <div>
        <h3 className="text-base font-bold text-[#0B2447] mb-4 pb-2 border-b border-gray-100">
          Thông Tin Công Ty
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Tên Đầy Đủ
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tên Ngắn</label>
            <input
              type="text"
              value={form.shortName}
              onChange={(e) => setField('shortName', e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slogan</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setField('tagline', e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mô Tả SEO</label>
            <textarea
              value={form.description}
              onChange={(e) => setField('description', e.target.value)}
              rows={3}
              className={`${inputClass} resize-y`}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Website URL</label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => setField('url', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Mã Số Doanh Nghiệp
            </label>
            <input
              type="text"
              value={form.businessNumber}
              onChange={(e) => setField('businessNumber', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-base font-bold text-[#0B2447] mb-4 pb-2 border-b border-gray-100">
          Thông Tin Liên Hệ
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Hotline 1 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.phone[0] ?? ''}
              onChange={(e) => setPhone(0, e.target.value)}
              className={inputClass}
              placeholder="0901 234 567"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Hotline 2</label>
            <input
              type="text"
              value={form.phone[1] ?? ''}
              onChange={(e) => setPhone(1, e.target.value)}
              className={inputClass}
              placeholder="0912 345 678"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setField('email', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Giờ Làm Việc
            </label>
            <input
              type="text"
              value={form.workingHours}
              onChange={(e) => setField('workingHours', e.target.value)}
              className={inputClass}
              placeholder="07:30 – 17:30, Thứ 2 – CN"
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Địa Chỉ</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setField('address', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Social */}
      <div>
        <h3 className="text-base font-bold text-[#0B2447] mb-4 pb-2 border-b border-gray-100">
          Mạng Xã Hội
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Facebook</label>
            <input
              type="url"
              value={form.social.facebook}
              onChange={(e) => setSocial('facebook', e.target.value)}
              className={inputClass}
              placeholder="https://facebook.com/anphatindustry"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Zalo</label>
            <input
              type="url"
              value={form.social.zalo}
              onChange={(e) => setSocial('zalo', e.target.value)}
              className={inputClass}
              placeholder="https://zalo.me/..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">YouTube</label>
            <input
              type="url"
              value={form.social.youtube}
              onChange={(e) => setSocial('youtube', e.target.value)}
              className={inputClass}
              placeholder="https://youtube.com/@..."
            />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-[#0B2447] text-white font-semibold px-8 py-2.5 rounded-xl hover:bg-[#0B2447]/90 transition-colors disabled:opacity-60"
        >
          {loading && <Loader2 size={15} className="animate-spin" />}
          Lưu Cài Đặt
        </button>
      </div>
    </form>
  )
}
