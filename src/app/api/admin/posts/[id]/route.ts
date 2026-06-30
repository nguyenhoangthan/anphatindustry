import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return unauthorized()

  const body = await req.json()
  const { slug, title, excerpt, content, author, publishedAt, category, image, tags, readingTime, featured } = body

  try {
    const post = await prisma.blogPost.update({
      where: { id: params.id },
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
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Không tìm thấy hoặc lỗi cập nhật' }, { status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return unauthorized()

  try {
    await prisma.blogPost.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Không tìm thấy bài viết' }, { status: 404 })
  }
}
