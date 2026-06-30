import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group card-dark rounded-card overflow-hidden hover:border-primary/30 transition-all duration-300 flex flex-col">
      <Link href={`/thu-vien/${post.slug}`} className="block overflow-hidden aspect-[16/10] flex-shrink-0">
        <Image
          src={post.image}
          alt={post.title}
          width={640}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-5 lg:p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
            <Tag size={10} />
            {post.category === 'kinh-nghiem' ? 'Kinh nghiệm' : post.category}
          </span>
          <div className="flex items-center gap-1 text-muted text-xs">
            <Clock size={10} />
            <span>{post.readingTime} phút đọc</span>
          </div>
        </div>
        <h3 className="font-heading font-bold text-heading text-base lg:text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors flex-1">
          <Link href={`/thu-vien/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-muted text-[13px] leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-muted text-xs">{formatDate(post.publishedAt)}</span>
          <Link
            href={`/thu-vien/${post.slug}`}
            className="flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all"
          >
            Đọc tiếp <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  )
}