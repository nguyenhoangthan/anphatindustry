// ============================================================
// Season utilities
// Used server-side (layout.tsx) to determine the active season
// and pass it down as a prop / data attribute.
// ============================================================

import { Season, SEASON_CONFIGS } from '@/types/season'

/**
 * Detect the active season from an environment variable.
 * Set NEXT_PUBLIC_SEASON=tet|noel in .env.local to override.
 * Falls back to auto-detection by calendar month.
 */
export function getActiveSeason(): Season {
  // 1. Explicit override (useful for staging/preview environments)
  const env = process.env.NEXT_PUBLIC_SEASON as Season | undefined
  if (env && env in SEASON_CONFIGS) return env

  // 2. Auto-detect by month (Vietnam timezone UTC+7)
  const now = new Date()
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000
  const vn  = new Date(utc + 7 * 3_600_000)
  const month = vn.getMonth() + 1 // 1-based

  // Noël: December
  if (month === 12) return 'noel'

  // Tết window: January – early February
  // Simplistic: month 1 = always Tết; month 2 = Tết if before 15th
  if (month === 1) return 'tet'
  if (month === 2 && vn.getDate() <= 15) return 'tet'

  return 'normal'
}

/** Returns the config object for the active season. */
export function getSeasonConfig(season?: Season) {
  return SEASON_CONFIGS[season ?? getActiveSeason()]
}

/**
 * Returns season-specific image path with a fallback to the
 * default images folder when the seasonal asset doesn't exist.
 *
 * Usage:
 *   seasonImage('hero/1.webp', 'tet')
 *   → '/images/seasons/tet/hero/1.webp'  (if exists, otherwise fallback)
 *   → '/images/hero/1.webp'              (fallback)
 */
export function seasonImage(defaultPath: string, season?: Season): string {
  const s = season ?? getActiveSeason()
  if (s === 'normal') return `/images/${defaultPath}`
  return `/images/seasons/${s}/${defaultPath}`
}

/**
 * Merge base class with optional season-specific modifier class.
 * e.g. seasonClass('btn-main', season) → 'btn-main btn-main--tet'
 */
export function seasonClass(base: string, season?: Season): string {
  const s = season ?? getActiveSeason()
  if (s === 'normal') return base
  return `${base} ${base}--${s}`
}
