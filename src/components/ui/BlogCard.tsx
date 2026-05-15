import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300">
      <Link href={`/thu-vien/${post.slug}`} className="block overflow-hidden aspect-[16/10]">
        <Image
          src={post.image}
          alt={post.title}
          width={640}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-5 lg:p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-accent-50 text-accent-600 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
            {post.category === 'kinh-nghiem' ? 'Kinh nghiệm' : post.category}
          </span>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Clock size={11} />
            <span>{post.readingTime} phút đọc</span>
          </div>
        </div>
        <h3 className="font-heading font-bold text-primary-900 text-base lg:text-lg leading-snug mb-3 line-clamp-2 group-hover:text-accent-500 transition-colors">
          <Link href={`/thu-vien/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-gray-400 text-xs">{formatDate(post.publishedAt)}</span>
          <Link
            href={`/thu-vien/${post.slug}`}
            className="flex items-center gap-1 text-accent-500 text-sm font-semibold hover:gap-2 transition-all"
          >
            Đọc tiếp <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}
