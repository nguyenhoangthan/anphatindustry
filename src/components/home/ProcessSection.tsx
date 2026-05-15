import {
  Car, Search, FileText, ClipboardList, Wrench, CheckSquare,
} from 'lucide-react'
import { defaultProcessSteps } from '@/lib/defaultContent'

const stepIcons = [Car, Search, FileText, ClipboardList, Wrench, CheckSquare]

export default function ProcessSection({ data = defaultProcessSteps }: { data?: typeof defaultProcessSteps }) {
  return (
    <section className="section-py bg-dark-1">
      <div className="site-container">
        <div className="text-center mb-12">
          <div className="section-subtitle">{data.badge}</div>
          <h2 className="text-white font-heading font-bold text-2xl lg:text-4xl leading-tight mt-3 mb-4">
            {data.title}
          </h2>
          <p className="text-white/45 text-sm lg:text-base max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.steps.map((step, index) => {
            const Icon = stepIcons[index % stepIcons.length]
            return (
              <div key={step.step} className="card-dark rounded-card p-6 flex gap-5 group">
                {/* Step number + icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-card bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon size={20} className="text-primary" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary font-heading font-black text-xs tracking-widest uppercase">
                      Bước {step.step}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-white text-base mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-white/45 text-[13px] leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}