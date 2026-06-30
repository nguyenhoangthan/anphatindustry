import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const ALLOWED_KEYS = [
  'section_hero',
  'section_about_home',
  'section_why_us',
  'section_process',
  'section_partners',
  'section_contact_cta',
  'section_pricing',
  'section_team',
  'section_models',
  'section_projects',
  'section_videos',
  'siteConfig',
]

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export async function GET(_req: Request, { params }: { params: { key: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return unauthorized()

  if (!ALLOWED_KEYS.includes(params.key)) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 })
  }

  const setting = await prisma.siteSetting.findUnique({ where: { key: params.key } })
  return NextResponse.json(setting ? JSON.parse(setting.value) : null)
}

export async function PUT(req: Request, { params }: { params: { key: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return unauthorized()

  if (!ALLOWED_KEYS.includes(params.key)) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 })
  }

  const body = await req.json()

  await prisma.siteSetting.upsert({
    where: { key: params.key },
    create: { key: params.key, value: JSON.stringify(body) },
    update: { value: JSON.stringify(body) },
  })

  return NextResponse.json({ success: true })
}
