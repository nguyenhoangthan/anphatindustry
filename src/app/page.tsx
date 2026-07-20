import type { Metadata } from 'next'
import HeroSlider from '@/components/home/HeroSlider'
import ServicesSection from '@/components/home/ServicesSection'
import AboutSection from '@/components/home/AboutSection'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import ProcessSection from '@/components/home/ProcessSection'
import PartnersSection from '@/components/home/PartnersSection'
import BlogSection from '@/components/home/BlogSection'
import RecruitmentSection from '@/components/home/RecruitmentSection'
import ContactCTA from '@/components/home/ContactCTA'
import { siteConfig } from '@/lib/constants'
import { prisma } from '@/lib/prisma'
import { getActiveSeason } from '@/lib/season'
import type { Service, BlogPost } from '@/types'
import { normalizeCategory } from '@/data/services'
import {
  defaultHeroSlides, defaultAboutSection, defaultWhyChooseUs,
  defaultProcessSteps, defaultPartnersSection, defaultContactCTA,
} from '@/lib/defaultContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: `${siteConfig.name} – ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
}

function toService(s: {
  id: string; slug: string; title: string; shortDescription: string
  description: string; category: string; categoryLabel: string; image: string; highlights: string
}): Service {
  return { ...s, category: normalizeCategory(s.category), icon: '', highlights: JSON.parse(s.highlights) as string[] }
}

function toPost(p: {
  id: string; slug: string; title: string; excerpt: string; content: string
  author: string; publishedAt: Date; category: string; image: string; tags: string; readingTime: number
}): BlogPost {
  return { ...p, publishedAt: p.publishedAt.toISOString().substring(0, 10), tags: JSON.parse(p.tags) as string[] }
}

async function getSection<T>(key: string, fallback: T): Promise<T> {
  try {
    const s = await prisma.siteSetting.findUnique({ where: { key } })
    return s ? (JSON.parse(s.value) as T) : fallback
  } catch { return fallback }
}

export default async function HomePage() {
  const [dbServices, dbPosts, heroData, aboutData, whyUsData, processData, partnersData, ctaData] = await Promise.all([
    prisma.service.findMany({ orderBy: { sortOrder: 'asc' } }).catch(() => []),
    prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' }, take: 3 }).catch(() => []),
    getSection('section_hero', defaultHeroSlides),
    getSection('section_about_home', defaultAboutSection),
    getSection('section_why_us', defaultWhyChooseUs),
    getSection('section_process', defaultProcessSteps),
    getSection('section_partners', defaultPartnersSection),
    getSection('section_contact_cta', defaultContactCTA),
  ])

  const season = getActiveSeason()
  const services = dbServices.map(toService)
  const posts = dbPosts.map(toPost)

  return (
    <>
      <HeroSlider slides={heroData} season={season} />
      <ServicesSection services={services} />
      <AboutSection data={aboutData} />
      <WhyChooseUs data={whyUsData} />
      <ProcessSection data={processData} />
      <PartnersSection data={partnersData} />
      <BlogSection posts={posts} />
      <RecruitmentSection />
      <ContactCTA data={ctaData} />
    </>
  )
}

