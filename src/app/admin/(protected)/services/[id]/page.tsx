import { notFound } from 'next/navigation'
import { Pencil } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import ServiceForm from '@/components/admin/ServiceForm'

export const dynamic = 'force-dynamic'

interface Props {
  params: { id: string }
}

export default async function EditServicePage({ params }: Props) {
  const service = await prisma.service.findUnique({ where: { id: params.id } })
  if (!service) notFound()

  const highlights = JSON.parse(service.highlights) as string[]

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Pencil size={20} className="text-[#0B2447]" />
        <div>
          <h1 className="text-2xl font-black text-[#0B2447]">Chỉnh Sửa Dịch Vụ</h1>
          <p className="text-gray-500 text-sm mt-0.5">{service.title}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-7">
        <ServiceForm
          mode="edit"
          initialData={{
            id: service.id,
            slug: service.slug,
            title: service.title,
            shortDescription: service.shortDescription,
            description: service.description,
            category: service.category,
            categoryLabel: service.categoryLabel,
            image: service.image,
            highlights,
            featured: service.featured,
            sortOrder: service.sortOrder,
          }}
        />
      </div>
    </div>
  )
}
