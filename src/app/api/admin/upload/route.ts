import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
const MAX_IMAGE = 5 * 1024 * 1024 // 5MB
const MAX_VIDEO = 50 * 1024 * 1024 // 50MB

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'Không có file' }, { status: 400 })

  const isVideo = VIDEO_TYPES.includes(file.type)
  const isImage = IMAGE_TYPES.includes(file.type)
  if (!isVideo && !isImage) {
    return NextResponse.json({ error: 'Chỉ chấp nhận ảnh (jpg, png, webp, gif) hoặc video (mp4, webm)' }, { status: 400 })
  }
  if (file.size > (isVideo ? MAX_VIDEO : MAX_IMAGE)) {
    return NextResponse.json({ error: isVideo ? 'Video tối đa 50MB' : 'Ảnh tối đa 5MB' }, { status: 400 })
  }

  const bytes = Buffer.from(await file.arrayBuffer())
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
  const base =
    file.name
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'image'
  const stamp = Date.now().toString(36)
  const filename = `${base}-${stamp}.${ext}`

  try {
    const dir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(dir, { recursive: true })
    await writeFile(path.join(dir, filename), bytes)
    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch {
    return NextResponse.json({ error: 'Không lưu được ảnh trên máy chủ' }, { status: 500 })
  }
}
