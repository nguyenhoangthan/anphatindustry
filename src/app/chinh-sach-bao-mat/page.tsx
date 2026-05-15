import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { siteConfig } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Chính Sách Bảo Mật | An Phát Industry',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-primary-900 py-14 lg:py-20">
        <div className="container">
          <Breadcrumb items={[{ label: 'Chính Sách Bảo Mật' }]} />
          <h1 className="font-heading font-black text-white text-3xl lg:text-4xl mt-5">
            Chính Sách Bảo Mật
          </h1>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
            <p>
              {siteConfig.name} cam kết bảo vệ thông tin cá nhân của quý khách hàng. Chính sách
              này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
            </p>
            <h2>1. Thông Tin Chúng Tôi Thu Thập</h2>
            <p>
              Chúng tôi thu thập thông tin cá nhân khi bạn: đặt lịch hẹn, liên hệ qua form, gọi
              điện hoặc gửi email cho chúng tôi. Thông tin có thể bao gồm: họ tên, số điện thoại,
              địa chỉ email, thông tin về xe ô tô.
            </p>
            <h2>2. Mục Đích Sử Dụng</h2>
            <p>
              Thông tin được sử dụng để: liên lạc và xác nhận lịch hẹn, cung cấp dịch vụ và hỗ
              trợ khách hàng, cải thiện chất lượng dịch vụ, gửi thông tin khuyến mãi (chỉ khi có
              sự đồng ý).
            </p>
            <h2>3. Bảo Vệ Thông Tin</h2>
            <p>
              Chúng tôi không bán, cho thuê hay chia sẻ thông tin cá nhân của bạn cho bên thứ ba
              vì bất kỳ mục đích thương mại nào.
            </p>
            <h2>4. Liên Hệ</h2>
            <p>
              Nếu có bất kỳ thắc mắc nào về chính sách bảo mật, vui lòng liên hệ:{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-accent-500">
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
