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

  const setting = await prisma.siteSetting.findUnique({ where: { key: 'siteConfig' } })
  return NextResponse.json(setting ? JSON.parse(setting.value) : null)
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return unauthorized()

  const body = await req.json()

  try {
    await prisma.siteSetting.upsert({
      where: { key: 'siteConfig' },
      create: { key: 'siteConfig', value: JSON.stringify(body) },
      update: { value: JSON.stringify(body) },
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[api/admin/settings] upsert failed:', err)
    return NextResponse.json({ error: 'Không lưu được vào cơ sở dữ liệu' }, { status: 500 })
  }
}
