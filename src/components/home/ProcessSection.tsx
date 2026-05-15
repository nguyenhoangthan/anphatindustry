'use client'

import { motion } from 'framer-motion'
import {
  ClipboardList,
  Search,
  FileText,
  Wrench,
  CheckSquare,
  Car,
} from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { defaultProcessSteps } from '@/lib/defaultContent'

type ProcessData = typeof defaultProcessSteps

const stepIcons = [Car, Search, FileText, ClipboardList, Wrench, CheckSquare]

export default function ProcessSection({ data = defaultProcessSteps }: { data?: ProcessData }) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container">
        <SectionHeader
          badge={data.badge}
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.steps.map((step, index) => {
            const Icon = stepIcons[index] ?? Wrench
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative group"
              >
                {/* Connector Line */}
                {index < data.steps.length - 1 && index % 3 !== 2 && (
                  <div className="absolute top-7 left-full w-full h-0.5 bg-gray-200 z-0 hidden lg:block -translate-x-1/2" />
                )}
                <div className="bg-light-gray rounded-2xl p-6 lg:p-7 h-full hover:shadow-md transition-shadow duration-300 relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 bg-primary-900 rounded-xl flex items-center justify-center shadow-md group-hover:bg-accent-500 transition-colors duration-300">
                        <Icon size={24} className="text-white" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 text-white text-xs font-black rounded-full flex items-center justify-center">
                        {step.step}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-primary-900 text-base lg:text-lg leading-tight">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
