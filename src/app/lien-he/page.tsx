import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactForm from './ContactForm'
import { getSiteConfig } from '@/lib/getSiteConfig'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Liên Hệ & Đặt Lịch | An Phát Industry',
  description:
    'Liên hệ An Phát Industry để đặt lịch bảo dưỡng, sửa chữa ô tô. Hotline hỗ trợ 7 ngày/tuần. Kiểm tra xe miễn phí.',
}

export default async function ContactPage() {
  const siteConfig = await getSiteConfig()
  const contactInfo = [
    { icon: MapPin, title: 'Địa Chỉ', lines: siteConfig.locations.map((l) => `${l.name}: ${l.address}`) },
    { icon: Phone, title: 'Hotline', lines: siteConfig.phone, isPhone: true },
    { icon: Mail, title: 'Email', lines: [siteConfig.email], isEmail: true },
    { icon: Clock, title: 'Giờ Làm Việc', lines: [siteConfig.workingHours] },
  ]
  return (
    <>
      {/* Hero */}
      <section className="bg-dark-1 border-b border-border section-pt pb-12">
        <div className="site-container">
          <Breadcrumb items={[{ label: 'Liên Hệ' }]} />
          <h1 className="font-heading font-bold text-heading text-3xl lg:text-5xl mt-5 mb-3">
            Liên Hệ & Đặt Lịch
          </h1>
          <p className="text-body text-lg max-w-2xl">
            Chúng tôi luôn sẵn sàng hỗ trợ. Hãy để lại thông tin và chúng tôi sẽ liên hệ trong
            vòng 30 phút.
          </p>
        </div>
      </section>

      <section className="section-py bg-dark-2">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon
                return (
                  <div
                    key={info.title}
                    className="bg-dark-1 rounded-card p-5 border border-border flex items-start gap-4"
                  >
                    <div className="w-11 h-11 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-heading text-sm mb-1">
                        {info.title}
                      </div>
                      {info.lines.map((line) => (
                        <div key={line}>
                          {info.isPhone ? (
                            <a
                              href={`tel:+84${line.replace(/^0/, '').replace(/\s/g, '')}`}
                              className="text-body text-sm hover:text-primary transition-colors"
                            >
                              {line}
                            </a>
                          ) : info.isEmail ? (
                            <a
                              href={`mailto:${line}`}
                              className="text-body text-sm hover:text-primary transition-colors"
                            >
                              {line}
                            </a>
                          ) : (
                            <span className="text-body text-sm">{line}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              {/* Map Embeds – một bản đồ cho mỗi cơ sở */}
              {siteConfig.locations.map((loc) => (
                <div key={loc.address} className="bg-dark-1 rounded-card overflow-hidden border border-border">
                  <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                    <MapPin size={14} className="text-primary flex-shrink-0" />
                    <span className="font-semibold text-body text-sm">
                      {loc.name} – {loc.address}
                    </span>
                  </div>
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(loc.address)}&output=embed`}
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Bản đồ ${loc.name} – An Phát Industry`}
                  />
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-dark-1 rounded-card border border-border p-6 lg:p-8">
                <h2 className="font-heading font-bold text-heading text-xl lg:text-2xl mb-2">
                  Gửi Yêu Cầu Tư Vấn
                </h2>
                <p className="text-muted text-sm mb-6">
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
