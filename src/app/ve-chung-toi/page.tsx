import type { Metadata } from 'next'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactCTA from '@/components/home/ContactCTA'
import { prisma } from '@/lib/prisma'
import { defaultTeamSection, defaultContactCTA } from '@/lib/defaultContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Về Chúng Tôi | An Phát Industry',
  description:
    'Tìm hiểu về An Phát Industry – Trung tâm bảo dưỡng sửa chữa ô tô uy tín tại TP.HCM. Sứ mệnh, tầm nhìn, đội ngũ và giá trị cốt lõi.',
}

export default async function AboutPage() {
  const [teamRaw, ctaRaw] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { key: 'section_team' } }).catch(() => null),
    prisma.siteSetting.findUnique({ where: { key: 'section_contact_cta' } }).catch(() => null),
  ])
  const td = teamRaw ? JSON.parse(teamRaw.value) as typeof defaultTeamSection : defaultTeamSection
  const ctaData = ctaRaw ? JSON.parse(ctaRaw.value) as typeof defaultContactCTA : defaultContactCTA
  const { intro, missions, fields, team } = td

  return (
    <>
      {/* Page Hero */}
      <section className="bg-dark-1 border-b border-white/5 section-pt pb-12">
        <div className="site-container">
          <Breadcrumb items={[{ label: 'Về Chúng Tôi' }]} />
          <h1 className="font-heading font-bold text-white text-3xl lg:text-5xl mt-5 mb-3">
            Về Chúng Tôi
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Hành trình xây dựng niềm tin và chất lượng dịch vụ tốt nhất cho quý khách hàng.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-py bg-dark-2">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-subtitle">{intro.badge}</div>
              <h2 className="font-heading font-bold text-white text-2xl lg:text-4xl leading-tight mb-6">
                {intro.title}
              </h2>
              <p className="text-white/55 leading-relaxed mb-4">{intro.body1}</p>
              <p className="text-white/45 leading-relaxed mb-6">{intro.body2}</p>
              <div className="flex flex-wrap gap-4">
                {intro.stats.map((s) => (
                  <div key={s.label} className="bg-dark-1 border border-white/5 rounded-card px-5 py-4 text-center">
                    <div className="font-heading font-bold text-2xl text-primary">{s.value}</div>
                    <div className="text-xs text-white/40 font-medium mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-card overflow-hidden aspect-[4/3]">
              <Image
                src={intro.image}
                alt="An Phát Industry – Xưởng dịch vụ"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-py bg-dark-1">
        <div className="site-container">
          <SectionHeader
            badge="Định Hướng Phát Triển"
            title="Sứ Mệnh – Tầm Nhìn – Năng Lực – Giá Trị"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {missions.map((item) => (
              <div
                key={item.title}
                className="bg-dark-2 rounded-card p-6 border border-white/5 hover:border-primary/20 transition-colors"
              >
                <h3 className="font-heading font-bold text-white text-lg mb-3 pb-3 border-b border-white/5">
                  {item.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fields */}
      <section className="section-py bg-dark-2">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                badge="Lĩnh Vực Hoạt Động"
                title="Dịch Vụ Toàn Diện Cho Ô Tô"
                align="left"
              />
              <ul className="space-y-3">
                {fields.map((field) => (
                  <li key={field} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-primary flex-shrink-0" />
                    <span className="text-white/60">{field}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-card overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=800&q=80"
                alt="Lĩnh vực hoạt động An Phát Industry"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-py bg-dark-1">
        <div className="site-container">
          <SectionHeader
            badge="Đội Ngũ Nhân Sự"
            title="Con Người Tạo Nên Chất Lượng"
            subtitle="Mỗi thành viên An Phát Industry đều được đào tạo bài bản, luôn trau dồi kỹ năng và đặt sự hài lòng của khách hàng lên hàng đầu."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-dark-2 rounded-card p-6 text-center border border-white/5 hover:border-primary/20 transition-colors"
              >
                <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black text-primary">
                  {member.name
                    .split(' ')
                    .slice(-2)
                    .map((n: string) => n[0])
                    .join('')}
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-white/45 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA data={ctaData} />
    </>
  )
}
