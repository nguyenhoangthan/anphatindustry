import { redirect, notFound } from 'next/navigation'

// Hai mục con của Dự Án & Đối Tác được hiển thị ngay trên trang /du-an
// (theo anchor). Subpage chỉ điều hướng tới đúng phần tương ứng.
const ANCHORS: Record<string, string> = {
  'du-an-da-thuc-hien': 'du-an-da-thuc-hien',
  'doi-tac-khach-hang': 'doi-tac-khach-hang',
}

export default function ProjectBlockPage({ params }: { params: { slug: string } }) {
  const anchor = ANCHORS[params.slug]
  if (!anchor) notFound()
  redirect(`/du-an#${anchor}`)
}
