export type ServiceCategory = 'sua-chua-chung' | 'cham-soc-xe' | 'dong-son'

export interface Service {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  category: ServiceCategory
  categoryLabel: string
  icon?: string
  image: string
  highlights: string[]
  process?: ProcessStep[]
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  icon: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  category: string
  image: string
  tags: string[]
  readingTime: number
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar?: string
}

export interface Partner {
  id: string
  name: string
  logo: string
  url?: string
}

export interface SiteConfig {
  name: string
  shortName: string
  tagline: string
  description: string
  url: string
  phone: string[]
  email: string
  address: string
  workingHours: string
  social: {
    facebook?: string
    zalo?: string
    youtube?: string
    tiktok?: string
  }
  businessNumber: string
}
