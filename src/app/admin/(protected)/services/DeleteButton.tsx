'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'

interface Props {
  id: string
  type: 'service' | 'post'
  name: string
}

export default function DeleteButton({ id, type, name }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm(`Xác nhận xóa "${name}"? Hành động này không thể hoàn tác.`)) return

    setLoading(true)
    const url = type === 'service' ? `/api/admin/services/${id}` : `/api/admin/posts/${id}`

    try {
      await fetch(url, { method: 'DELETE' })
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
    </button>
  )
}
