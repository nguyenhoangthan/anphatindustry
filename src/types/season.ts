// ============================================================
// Season type system
// Controls colour palette, imagery and decorative elements
// across the entire site without a re-build.
// ============================================================

export type Season = 'normal' | 'tet' | 'noel'

// ── Season metadata ──────────────────────────────────────────
export interface SeasonConfig {
  /** data-season attribute value written to <html> */
  key: Season
  /** Human-readable display label */
  label: string
  /** CSS hex value for --color-primary (reference only) */
  primaryHex: string
  /** CSS hex value for --color-accent (reference only) */
  accentHex: string
  /** Optional floating decoration image (e.g. snowflakes, peach blossoms) */
  decorationSrc?: string
  /** Greeting text shown in hero / hero overlay */
  greeting?: string
}

export const SEASON_CONFIGS: Record<Season, SeasonConfig> = {
  normal: {
    key:         'normal',
    label:       'Thường ngày',
    primaryHex:  '#E9021E',
    accentHex:   '#E9021E',
  },
  tet: {
    key:         'tet',
    label:       'Tết Nguyên Đán',
    primaryHex:  '#D4A017',
    accentHex:   '#DC2626',
    decorationSrc: '/images/seasons/tet/decoration.webp',
    greeting:    'Chúc Mừng Năm Mới 🧧',
  },
  noel: {
    key:         'noel',
    label:       'Giáng Sinh',
    primaryHex:  '#2E7D32',
    accentHex:   '#C62828',
    decorationSrc: '/images/seasons/noel/decoration.webp',
    greeting:    'Merry Christmas 🎄',
  },
}

// ── Prop type helper ─────────────────────────────────────────
// Add `season?: Season` to any component that adapts visually.
export interface WithSeason {
  season?: Season
}
