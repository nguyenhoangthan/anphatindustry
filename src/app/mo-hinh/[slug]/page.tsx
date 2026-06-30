import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { modelCategories, getModelCategory } from '@/data/models'

export function generateStaticParams() {
  return modelCategories.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cat = getModelCategory(params.slug)
  if (!cat) return { title: 'Không tìm thấy | An Phát Industry' }
  return {
    title: `${cat.label} | An Phát Industry`,
    description: cat.description,
  }
}

export default function ModelCategoryPage({ params }: { params: { slug: string } }) {
  const cat = getModelCategory(params.slug)
  if (!cat) notFound()

  return (
    <>
      {/* Page Hero */}
      <section className="bg-dark-1 border-b border-border section-pt pb-12">
        <div className="site-container">
          <Breadcrumb
            items={[{ label: 'Mô Hình', href: '/mo-hinh' }, { label: cat.label }]}
          />
          <h1 className="font-heading font-bold text-heading text-3xl lg:text-5xl mt-5 mb-3">
            {cat.label}
          </h1>
          <p className="text-body text-lg max-w-2xl">{cat.description}</p>
        </div>
      </section>

      {/* Cover image */}
      <section className="bg-dark-1">
        <div className="site-container">
          <div className="relative aspect-[21/9] rounded-card overflow-hidden">
            <Image
              src={cat.image}
              alt={cat.label}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="section-py bg-dark-1">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cat.groups.map((group) => (
              <div
                key={group.title}
                className="bg-dark-2 rounded-card border border-border p-7"
              >
                <h2 className="font-heading font-bold text-heading text-lg lg:text-xl mb-4 pb-3 border-b border-border">
                  {group.title}
                </h2>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <ChevronRight size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-accent/5 border border-accent/15 rounded-card p-6 text-center">
            <p className="text-body text-sm">
              Thông số kỹ thuật, hình ảnh và tài liệu chi tiết cho từng mô hình
              <strong className="text-heading"> đang được cập nhật</strong>. Vui lòng liên hệ để được tư vấn trực tiếp.
            </p>
            <Link href="/lien-he" className="btn-main mt-4 text-sm">
              Liên Hệ Tư Vấn
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
