import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { modelCategories } from '@/data/models'

export const metadata: Metadata = {
  title: 'Mô Hình Đào Tạo | An Phát Industry',
  description:
    'Mô hình thiết bị đào tạo kỹ thuật và thiết bị kiểm tra chẩn đoán ô tô của An Phát Industry – phục vụ giảng dạy, thực hành và chuyển giao công nghệ.',
}

export default function ModelsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-dark-1 border-b border-border section-pt pb-12">
        <div className="site-container">
          <Breadcrumb items={[{ label: 'Mô Hình' }]} />
          <h1 className="font-heading font-bold text-heading text-3xl lg:text-5xl mt-5 mb-3">
            Mô Hình Đào Tạo
          </h1>
          <p className="text-body text-lg max-w-2xl">
            Hệ thống mô hình thiết bị đào tạo kỹ thuật và thiết bị kiểm tra chẩn đoán
            phục vụ giảng dạy, thực hành và chuyển giao công nghệ ngành ô tô.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="section-py bg-dark-2">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {modelCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/mo-hinh/${cat.slug}`}
                className="group bg-dark-1 rounded-card border border-border overflow-hidden hover:shadow-card-hover transition-all"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-7">
                  <h2 className="font-heading font-bold text-heading text-xl lg:text-2xl mb-3">
                    {cat.label}
                  </h2>
                  <p className="text-body text-sm leading-relaxed mb-5">{cat.description}</p>
                  <ul className="flex flex-wrap gap-2 mb-6">
                    {cat.groups.map((g) => (
                      <li
                        key={g.title}
                        className="text-xs font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-full"
                      >
                        {g.title}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                    Xem chi tiết
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
