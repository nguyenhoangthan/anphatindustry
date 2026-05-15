'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { Season } from '@/types/season'
import { SEASON_CONFIGS } from '@/types/season'

interface SeasonContextValue {
  season: Season
  setSeason: (s: Season) => void
}

const SeasonContext = createContext<SeasonContextValue>({
  season: 'normal',
  setSeason: () => {},
})

export function useSeasonContext() {
  return useContext(SeasonContext)
}

interface Props {
  children: React.ReactNode
  /** Initial season passed from server (auto-detected in layout.tsx) */
  initialSeason: Season
}

export default function SeasonProvider({ children, initialSeason }: Props) {
  const [season, setSeasonState] = useState<Season>(initialSeason)

  // Write data-season attribute on <html> so CSS variables take effect
  const applySeason = useCallback((s: Season) => {
    document.documentElement.setAttribute('data-season', s)
    // Persist preference in localStorage for returning visitors
    try { localStorage.setItem('season', s) } catch {}
  }, [])

  // On mount: check localStorage override, then apply
  useEffect(() => {
    let resolved: Season = initialSeason
    try {
      const stored = localStorage.getItem('season') as Season | null
      if (stored && stored in SEASON_CONFIGS) resolved = stored
    } catch {}
    setSeasonState(resolved)
    applySeason(resolved)
  }, [initialSeason, applySeason])

  const setSeason = useCallback((s: Season) => {
    setSeasonState(s)
    applySeason(s)
  }, [applySeason])

  return (
    <SeasonContext.Provider value={{ season, setSeason }}>
      {children}
    </SeasonContext.Provider>
  )
}
