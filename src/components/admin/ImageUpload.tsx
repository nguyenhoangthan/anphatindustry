'use client'

import { useState, useRef } from 'react'
import { Upload, Loader2, X } from 'lucide-react'

/**
 * Ô chọn ảnh dùng chung cho admin: hiển thị preview, nút "Tải ảnh lên"
 * (gửi file tới /api/admin/upload rồi tự điền URL), và vẫn cho dán URL thủ công.
 */
export default function ImageUpload({
  value,
  onChange,
  placeholder = 'Dán URL ảnh hoặc bấm “Tải ảnh lên”',
}: {
  value: string
  onChange: (url: string) => void
  placeholder?: string
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Lỗi tải lên')
        return
      }
      onChange(data.url)
    } catch {
      setError('Lỗi kết nối máy chủ')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="w-24 h-24 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center flex-shrink-0">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-300 text-[11px] text-center px-1">Chưa có ảnh</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2447]/20 focus:border-[#0B2447]"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 bg-[#0B2447] text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-[#0B2447]/90 transition-colors disabled:opacity-60"
            >
              {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
              {uploading ? 'Đang tải...' : 'Tải ảnh lên'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-gray-400 hover:text-red-500 text-xs flex items-center gap-1"
              >
                <X size={13} /> Xóa
              </button>
            )}
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  )
}
