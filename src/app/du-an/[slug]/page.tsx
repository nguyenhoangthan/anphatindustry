import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'

const blocks = {
  'du-an-da-thuc-hien': {
    label: 'Dự Án Đã Thực Hiện',
    description:
      'Các dự án cung cấp dịch vụ, mô hình đào tạo và giải pháp kỹ thuật mà An Phát Industry đã triển khai.',
  },
  'doi-tac-khach-hang': {
    label: 'Đối Tác & Khách Hàng',
    description:
      'Mạng lưới đối tác, doanh nghiệp và khách hàng đồng hành cùng An Phát Industry.',
  },
} as const

export function generateStaticParams() {
  return Object.keys(blocks).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const block = blocks[params.slug as keyof typeof blocks]
  if (!block) return { title: 'Không tìm thấy | An Phát Industry' }
  return { title: `${block.label} | An Phát Industry`, description: block.description }
}

export default function ProjectBlockPage({ params }: { params: { slug: string } }) {
  const block = blocks[params.slug as keyof typeof blocks]
  if (!block) notFound()

  return (
    <>
      {/* Page Hero */}
      <section className="bg-dark-1 border-b border-border section-pt pb-12">
        <div className="site-container">
          <Breadcrumb
            items={[{ label: 'Dự Án & Đối Tác', href: '/du-an' }, { label: block.label }]}
          />
          <h1 className="font-heading font-bold text-heading text-3xl lg:text-5xl mt-5 mb-3">
            {block.label}
          </h1>
          <p className="text-body text-lg max-w-2xl">{block.description}</p>
        </div>
      </section>

      {/* Placeholder */}
      <section className="section-py bg-dark-2">
        <div className="site-container">
          <div className="max-w-xl mx-auto text-center bg-dark-1 border border-border rounded-card p-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Clock size={28} className="text-primary" />
            </div>
            <h2 className="font-heading font-bold text-heading text-xl mb-3">
              Nội dung đang được cập nhật
            </h2>
            <p className="text-body text-sm leading-relaxed mb-6">
              Chúng tôi đang tổng hợp thông tin cho mục này. Vui lòng quay lại sau hoặc
              liên hệ trực tiếp để được cung cấp thông tin chi tiết.
            </p>
            <Link href="/lien-he" className="btn-main text-sm">
              Liên Hệ Ngay
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
