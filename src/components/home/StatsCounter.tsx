'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import type { WithSeason } from '@/types/season'

interface Stat {
  icon?: string
  value: number
  suffix?: string
  label: string
}

interface Props extends WithSeason {
  stats: Stat[]
}

function useCountUp(target: number, duration = 2000, active: boolean) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration, active])

  return count
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.value, 2200, active)
  return (
    <div className="text-center py-4 px-3">
      {stat.icon && (
        <div className="text-2xl mb-2 text-primary">{stat.icon}</div>
      )}
      <div className="font-heading font-bold text-white text-3xl lg:text-4xl leading-none mb-1">
        {count.toLocaleString()}{stat.suffix ?? ''}
      </div>
      <div className="text-white/45 text-xs font-medium">{stat.label}</div>
    </div>
  )
}

export default function StatsCounter({ stats }: Omit<Props, 'season'>) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-card bg-dark-2 border border-white/5"
    >
      {stats.map((stat, i) => (
        <StatItem key={i} stat={stat} active={inView} />
      ))}
    </div>
  )
}
