import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import AdminNav from '@/components/admin/AdminNav'

export const metadata = { title: 'Quản Trị | An Phát Industry' }

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNav username={session.user?.name ?? 'admin'} />
      <main className="ml-64 flex-1 min-h-screen">{children}</main>
    </div>
  )
}
