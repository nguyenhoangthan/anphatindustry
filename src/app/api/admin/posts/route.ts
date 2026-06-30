import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return unauthorized()

  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } })
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return unauthorized()

  const body = await req.json()
  const { slug, title, excerpt, content, author, publishedAt, category, image, tags, readingTime, featured } = body

  if (!slug || !title || !excerpt || !category || !image) {
    return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 })
  }

  try {
    const post = await prisma.blogPost.create({
      data: {
        slug,
        title,
        excerpt,
        content: content || '',
        author: author || 'An Phát Industry',
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        category,
        image,
        tags: JSON.stringify(Array.isArray(tags) ? tags : []),
        readingTime: Number(readingTime) || 5,
        featured: Boolean(featured),
      },
    })
    return NextResponse.json(post, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Slug đã tồn tại hoặc có lỗi xảy ra' }, { status: 400 })
  }
}
