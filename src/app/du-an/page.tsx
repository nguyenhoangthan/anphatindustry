import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, Handshake, ArrowRight } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Dự Án & Đối Tác | An Phát Industry',
  description:
    'Các dự án đã thực hiện cùng mạng lưới đối tác và khách hàng của An Phát Industry trong lĩnh vực bảo dưỡng, sửa chữa ô tô và mô hình đào tạo kỹ thuật.',
}

const blocks = [
  {
    slug: 'du-an-da-thuc-hien',
    label: 'Dự Án Đã Thực Hiện',
    description:
      'Các dự án cung cấp dịch vụ, mô hình đào tạo và giải pháp kỹ thuật mà An Phát Industry đã triển khai.',
    Icon: Building2,
  },
  {
    slug: 'doi-tac-khach-hang',
    label: 'Đối Tác & Khách Hàng',
    description:
      'Mạng lưới đối tác, doanh nghiệp và khách hàng đồng hành cùng An Phát Industry.',
    Icon: Handshake,
  },
]

export default function ProjectsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-dark-1 border-b border-border section-pt pb-12">
        <div className="site-container">
          <Breadcrumb items={[{ label: 'Dự Án & Đối Tác' }]} />
          <h1 className="font-heading font-bold text-heading text-3xl lg:text-5xl mt-5 mb-3">
            Dự Án & Đối Tác
          </h1>
          <p className="text-body text-lg max-w-2xl">
            Hành trình đồng hành cùng khách hàng và đối tác qua các dự án dịch vụ,
            mô hình đào tạo và giải pháp kỹ thuật.
          </p>
        </div>
      </section>

      {/* Blocks */}
      <section className="section-py bg-dark-2">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blocks.map(({ slug, label, description, Icon }) => (
              <Link
                key={slug}
                href={`/du-an/${slug}`}
                className="group bg-dark-1 rounded-card border border-border p-8 hover:shadow-card-hover transition-all"
              >
                <div className="w-14 h-14 rounded-card bg-primary/10 flex items-center justify-center mb-5">
                  <Icon size={26} className="text-primary" />
                </div>
                <h2 className="font-heading font-bold text-heading text-xl lg:text-2xl mb-3">
                  {label}
                </h2>
                <p className="text-body text-sm leading-relaxed mb-5">{description}</p>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                  Xem chi tiết
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
