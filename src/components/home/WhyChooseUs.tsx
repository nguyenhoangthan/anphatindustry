import { ShieldCheck, Heart, Award, Handshake } from 'lucide-react'
import { defaultWhyChooseUs } from '@/lib/defaultContent'

const icons = [ShieldCheck, Heart, Award, Handshake]

export default function WhyChooseUs({ data = defaultWhyChooseUs }: { data?: typeof defaultWhyChooseUs }) {
  return (
    <section className="section-py bg-dark-2">
      <div className="site-container">
        <div className="text-center mb-12">
          <div className="section-subtitle">{data.badge}</div>
          <h2 className="text-white font-heading font-bold text-2xl lg:text-4xl leading-tight mt-3 mb-4">
            {data.title}
          </h2>
          <p className="text-white/45 text-sm lg:text-base max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.values.map((value, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div
                key={value.title}
                className="card-dark rounded-card p-7 flex flex-col gap-5 group hover:border-primary/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-card bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-lg mb-2">{value.title}</h3>
                  <p className="text-white/45 text-[13px] leading-relaxed">{value.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}