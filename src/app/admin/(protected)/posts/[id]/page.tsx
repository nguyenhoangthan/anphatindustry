import { notFound } from 'next/navigation'
import { Pencil } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import PostForm from '@/components/admin/PostForm'

export const dynamic = 'force-dynamic'

interface Props {
  params: { id: string }
}

export default async function EditPostPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } })
  if (!post) notFound()

  const tags = JSON.parse(post.tags) as string[]

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Pencil size={20} className="text-[#0B2447]" />
        <div>
          <h1 className="text-2xl font-black text-[#0B2447]">Chỉnh Sửa Bài Viết</h1>
          <p className="text-gray-500 text-sm mt-0.5 line-clamp-1">{post.title}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-7">
        <PostForm
          mode="edit"
          initialData={{
            id: post.id,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            publishedAt: post.publishedAt.toISOString().substring(0, 10),
            category: post.category,
            image: post.image,
            tags: tags.join(', '),
            readingTime: post.readingTime,
            featured: post.featured,
          }}
        />
      </div>
    </div>
  )
}
