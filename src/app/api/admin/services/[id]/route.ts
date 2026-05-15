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
  const { slug, title, shortDescription, description, category, categoryLabel, image, highlights, featured, sortOrder } = body

  try {
    const service = await prisma.service.update({
      where: { id: params.id },
      data: {
        slug,
        title,
        shortDescription,
        description,
        category,
        categoryLabel,
        image,
        highlights: JSON.stringify(Array.isArray(highlights) ? highlights : []),
        featured: Boolean(featured),
        sortOrder: Number(sortOrder) || 0,
      },
    })
    return NextResponse.json(service)
  } catch {
    return NextResponse.json({ error: 'Không tìm thấy hoặc lỗi cập nhật' }, { status: 400 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return unauthorized()

  try {
    await prisma.service.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Không tìm thấy dịch vụ' }, { status: 404 })
  }
}
