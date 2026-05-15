import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import DeleteButton from './DeleteButton'

export const dynamic = 'force-dynamic'

export default async function ServicesAdminPage() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } }).catch(() => [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#0B2447]">Dịch Vụ</h1>
          <p className="text-gray-500 text-sm mt-0.5">{services.length} dịch vụ trong hệ thống</p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 bg-[#0B2447] text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-[#0B2447]/90 transition-colors"
        >
          <Plus size={15} />
          Thêm Dịch Vụ
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Tên Dịch Vụ
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Danh Mục
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Slug
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Thứ Tự
              </th>
              <th className="px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-5 py-3.5">
                  <div className="font-medium text-sm text-gray-800">{service.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                    {service.shortDescription}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {service.categoryLabel}
                  </span>
                  {service.featured && (
                    <span className="ml-1.5 inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-2 py-1 rounded-full">
                      ★ Nổi bật
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {service.slug}
                  </code>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{service.sortOrder}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2 justify-end">
                    <Link
                      href={`/admin/services/${service.id}`}
                      className="p-2 text-gray-400 hover:text-[#0B2447] hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Pencil size={14} />
                    </Link>
                    <DeleteButton id={service.id} type="service" name={service.title} />
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-gray-400 text-sm">
                  Chưa có dịch vụ nào.{' '}
                  <Link href="/admin/services/new" className="text-[#0B2447] font-medium underline">
                    Thêm ngay
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
