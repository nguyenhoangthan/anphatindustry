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

  const services = await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } })
  return NextResponse.json(services)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return unauthorized()

  const body = await req.json()
  const { slug, title, shortDescription, description, category, categoryLabel, image, highlights, featured, sortOrder } = body

  if (!slug || !title || !shortDescription || !description || !category || !categoryLabel || !image) {
    return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 })
  }

  try {
    const service = await prisma.service.create({
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
    return NextResponse.json(service, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Slug đã tồn tại hoặc có lỗi xảy ra' }, { status: 400 })
  }
}
