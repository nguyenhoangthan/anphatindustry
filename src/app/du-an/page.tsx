import type { Metadata } from 'next'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { defaultProjects } from '@/lib/defaultContent'
import { getSection } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Dự Án & Đối Tác | An Phát Industry',
  description:
    'Các dự án đã thực hiện cùng mạng lưới đối tác và khách hàng của An Phát Industry trong lĩnh vực bảo dưỡng, sửa chữa ô tô và mô hình đào tạo kỹ thuật.',
}

type ProjectsData = typeof defaultProjects

export default async function ProjectsPage() {
  const data = await getSection<ProjectsData>('section_projects', defaultProjects)
  const projects = (data.projects ?? []).filter((p) => p.title && p.title !== 'Đang cập nhật')
  const partners = data.partners ?? []

  return (
    <>
      {/* Page Hero */}
      <section className="bg-dark-1 border-b border-border section-pt pb-12">
        <div className="site-container">
          <Breadcrumb items={[{ label: 'Dự Án & Đối Tác' }]} />
          <h1 className="font-heading font-bold text-heading text-3xl lg:text-5xl mt-5 mb-3">
            {data.intro?.title || 'Dự Án & Đối Tác'}
          </h1>
          <p className="text-body text-lg max-w-2xl">{data.intro?.subtitle}</p>
        </div>
      </section>

      {/* Dự án đã thực hiện */}
      <section id="du-an-da-thuc-hien" className="section-py bg-dark-2 scroll-mt-24">
        <div className="site-container">
          <div className="section-subtitle">Dự Án</div>
          <h2 className="font-heading font-bold text-heading text-2xl lg:text-3xl mb-8">Dự Án Đã Thực Hiện</h2>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <article key={i} className="bg-dark-1 rounded-card border border-border overflow-hidden">
                  {p.image && (
                    <div className="relative aspect-[16/10]">
                      <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 33vw" />
                    </div>
                  )}
                  <div className="p-5">
                    {p.year && <span className="text-xs font-semibold text-primary">{p.year}</span>}
                    <h3 className="font-heading font-bold text-heading text-lg mt-1 mb-2">{p.title}</h3>
                    <p className="text-body text-sm leading-relaxed">{p.description}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-dark-1 border border-border rounded-card p-10 text-center">
              <Clock size={26} className="text-primary mx-auto mb-3" />
              <p className="text-body text-sm">Danh sách dự án <strong className="text-heading">đang được cập nhật</strong>.</p>
            </div>
          )}
        </div>
      </section>

      {/* Đối tác & khách hàng */}
      <section id="doi-tac-khach-hang" className="section-py bg-dark-1 scroll-mt-24">
        <div className="site-container">
          <div className="section-subtitle">Đối Tác</div>
          <h2 className="font-heading font-bold text-heading text-2xl lg:text-3xl mb-8">Đối Tác & Khách Hàng</h2>
          {partners.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {partners.map((p, i) => (
                <div key={i} className="bg-dark-2 border border-border rounded-card p-5 flex flex-col items-center justify-center gap-3 aspect-[4/3]">
                  <div className="w-12 h-12 rounded-card bg-accent flex items-center justify-center text-white font-bold text-sm">{p.abbr || p.name.slice(0, 3).toUpperCase()}</div>
                  <span className="text-body text-sm font-medium text-center">{p.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-dark-2 border border-border rounded-card p-10 text-center">
              <p className="text-body text-sm">Danh sách đối tác <strong className="text-heading">đang được cập nhật</strong>.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
