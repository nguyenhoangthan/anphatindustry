'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Heart, Award, HandshakeIcon } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { defaultWhyChooseUs } from '@/lib/defaultContent'

type WhyData = typeof defaultWhyChooseUs

const iconMeta = [
  { icon: ShieldCheck, color: 'bg-blue-50', iconColor: 'text-blue-600', borderColor: 'border-blue-200' },
  { icon: Heart, color: 'bg-red-50', iconColor: 'text-accent-500', borderColor: 'border-red-200' },
  { icon: Award, color: 'bg-yellow-50', iconColor: 'text-yellow-600', borderColor: 'border-yellow-200' },
  { icon: HandshakeIcon, color: 'bg-green-50', iconColor: 'text-green-600', borderColor: 'border-green-200' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function WhyChooseUs({ data = defaultWhyChooseUs }: { data?: WhyData }) {
  const values = data.values.map((v, i) => ({ ...iconMeta[i % iconMeta.length], ...v }))
  return (
    <section className="py-16 lg:py-24 bg-primary-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white" />
      </div>

      <div className="container relative z-10">
        <SectionHeader
          badge={data.badge}
          title={data.title}
          subtitle={data.subtitle}
          light
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value) => {
            const Icon = value.icon
            return (
              <motion.div key={value.title} variants={itemVariants}>
                <div
                  className={`${value.color} ${value.borderColor} border rounded-2xl p-6 h-full hover:shadow-lg transition-shadow duration-300`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4`}
                  >
                    <Icon size={26} className={value.iconColor} />
                  </div>
                  <h3 className="font-heading font-bold text-primary-900 text-lg mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
