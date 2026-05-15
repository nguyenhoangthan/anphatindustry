import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactForm from './ContactForm'
import { siteConfig } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Liên Hệ & Đặt Lịch | An Phát Industry',
  description:
    'Liên hệ An Phát Industry để đặt lịch bảo dưỡng, sửa chữa ô tô. Hotline hỗ trợ 7 ngày/tuần. Kiểm tra xe miễn phí.',
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Địa Chỉ',
    lines: [siteConfig.address],
  },
  {
    icon: Phone,
    title: 'Hotline',
    lines: siteConfig.phone,
    isPhone: true,
  },
  {
    icon: Mail,
    title: 'Email',
    lines: [siteConfig.email],
    isEmail: true,
  },
  {
    icon: Clock,
    title: 'Giờ Làm Việc',
    lines: [siteConfig.workingHours],
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-900 py-14 lg:py-20">
        <div className="container">
          <Breadcrumb items={[{ label: 'Liên Hệ' }]} />
          <h1 className="font-heading font-black text-white text-3xl lg:text-5xl mt-5 mb-3">
            Liên Hệ & Đặt Lịch
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Chúng tôi luôn sẵn sàng hỗ trợ. Hãy để lại thông tin và chúng tôi sẽ liên hệ trong
            vòng 30 phút.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-light-gray">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              {contactInfo.map((info) => {
                const Icon = info.icon
                return (
                  <div
                    key={info.title}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4"
                  >
                    <div className="w-11 h-11 bg-primary-900 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-primary-900 text-sm mb-1">
                        {info.title}
                      </div>
                      {info.lines.map((line) => (
                        <div key={line}>
                          {info.isPhone ? (
                            <a
                              href={`tel:+84${line.replace(/^0/, '').replace(/\s/g, '')}`}
                              className="text-gray-600 text-sm hover:text-accent-500 transition-colors"
                            >
                              {line}
                            </a>
                          ) : info.isEmail ? (
                            <a
                              href={`mailto:${line}`}
                              className="text-gray-600 text-sm hover:text-accent-500 transition-colors"
                            >
                              {line}
                            </a>
                          ) : (
                            <span className="text-gray-600 text-sm">{line}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              {/* Map Embed */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                  <span className="font-semibold text-primary-900 text-sm">Bản Đồ</span>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.2!2d106.7!3d10.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQzJzQ4LjAiTiAxMDbCsDQyJzAwLjAiRQ!5e0!3m2!1svi!2svn!4v1234567890"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ An Phát Industry"
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                <h2 className="font-heading font-bold text-primary-900 text-xl lg:text-2xl mb-2">
                  Gửi Yêu Cầu Tư Vấn
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Điền thông tin bên dưới, chúng tôi sẽ liên hệ tư vấn miễn phí trong vòng 30
                  phút.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
