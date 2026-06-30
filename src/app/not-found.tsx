import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-light-gray">
      <div className="text-center px-4">
        <div className="font-heading font-black text-8xl lg:text-9xl text-primary-900/10 mb-4">
          404
        </div>
        <h1 className="font-heading font-bold text-primary-900 text-2xl lg:text-3xl mb-3">
          Trang Không Tìm Thấy
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Hãy quay về trang chủ hoặc
          duyệt qua các dịch vụ của chúng tôi.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white font-bold px-7 py-3.5 rounded-xl transition-colors"
          >
            <Home size={16} />
            Trang Chủ
          </Link>
          <Link
            href="/dich-vu"
            className="inline-flex items-center gap-2 border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white font-bold px-7 py-3.5 rounded-xl transition-colors"
          >
            <Search size={16} />
            Xem Dịch Vụ
          </Link>
        </div>
      </div>
    </section>
  )
}
