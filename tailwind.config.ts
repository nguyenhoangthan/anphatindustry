import type { Config } from 'tailwindcss'

// ---------------------------------------------------------------------------
// AutoDetail – Tailwind Design System
// All accent / brand colors are driven by CSS variables so the "season"
// theme (Normal / Tết / Noël) can be swapped at runtime without a re-build.
// ---------------------------------------------------------------------------
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // toggled by SeasonProvider via `.dark` on <html>
  theme: {
    // ── Container ─────────────────────────────────────────────────────────
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        // mirrors --container-max-width: 1240px from style.css
        '2xl': '1240px',
      },
    },

    extend: {
      // ── Colors ────────────────────────────────────────────────────────────
      colors: {
        // Season-aware primary – powered by CSS variable
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-dim': 'rgb(var(--color-primary) / 0.15)',

        // Dark backgrounds (same hierarchy as original)
        'dark-1': 'rgb(var(--color-dark-1) / <alpha-value>)',
        'dark-2': 'rgb(var(--color-dark-2) / <alpha-value>)',
        'dark-3': 'rgb(var(--color-dark-3) / <alpha-value>)',

        // Season accent (secondary highlight used in Tết / Noël)
        accent: 'rgb(var(--color-accent) / <alpha-value>)',

        // Static neutrals
        'body-text': '#8a8a8a',
        'heading-text': '#002060',
        border: '#bbbbbb',
        'bg-light': '#F8F9FA',
        'bg-grey': '#eeeeee',

        // Admin palette (kept from previous config)
        admin: {
          50:  '#e8eef8',
          100: '#c5d4ed',
          500: '#2f6abf',
          900: '#0B2447',
        },
      },

      // ── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        // Body: Manrope (humanist sans-serif)
        sans: ['var(--font-body)', 'Manrope', 'Helvetica', 'Arial', 'sans-serif'],
        // Display / Headings: Oxanium (geometric / sci-fi)
        heading: ['var(--font-heading)', 'Oxanium', 'Helvetica', 'Arial', 'sans-serif'],
      },

      fontSize: {
        // Mirror theme token sizes
        'h1': ['60px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '500' }],
        'h2': ['48px', { lineHeight: '1.2',  letterSpacing: '-0.015em', fontWeight: '500' }],
        'h3': ['26px', { lineHeight: '1.5',  letterSpacing: '0',        fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '1.6',  letterSpacing: '0',        fontWeight: '600' }],
      },

      // ── Border Radius ─────────────────────────────────────────────────────
      borderRadius: {
        // --rounded-1: 10px
        card: '10px',
        btn:  '6px',
      },

      // ── Spacing extras ────────────────────────────────────────────────────
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '30':  '7.5rem',   // p-30 used in testimonial cards
        '40':  '10rem',    // p-40 used in contact section
      },

      // ── Max Width ─────────────────────────────────────────────────────────
      maxWidth: {
        'site': '1240px',
        'logo': '240px',
      },

      // ── Background Images ─────────────────────────────────────────────────
      backgroundImage: {
        // Gradient helpers matching theme utility classes
        'gradient-bottom':
          'linear-gradient(to top, rgb(var(--color-dark-1)) 0%, transparent 100%)',
        'gradient-top':
          'linear-gradient(to bottom, rgb(var(--color-dark-1)) 0%, transparent 100%)',
        'gradient-primary':
          'linear-gradient(0deg, rgb(var(--color-primary) / 0.1) 0%, rgb(var(--color-primary) / 0.2) 100%)',
        'hero-overlay':
          'linear-gradient(to right, rgb(var(--color-dark-1) / 0.85) 0%, rgb(var(--color-dark-1) / 0.45) 60%, transparent 100%)',
      },

      // ── Animations ────────────────────────────────────────────────────────
      animation: {
        'fade-up':      'fadeUp 0.6s ease-out both',
        'fade-in':      'fadeIn 0.6s ease-in-out both',
        'zoom-in':      'zoomIn 0.5s ease-out both',
        'scale-in':     'scaleIn 0.7s ease-out both',
        'bounce-slow':  'bounce 2s infinite',
        'spin-slow':    'spin 8s linear infinite',
        'slide-right':  'slideRight 0.5s ease-out both',
      },

      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zoomIn: {
          '0%':   { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleIn: {
          '0%':   { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },

      // ── Transition ────────────────────────────────────────────────────────
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ── Box Shadow ────────────────────────────────────────────────────────
      boxShadow: {
        'card-dark':  '0 4px 24px 0 rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px 0 rgba(0,0,0,0.55)',
        'primary':    '0 4px 20px 0 rgb(var(--color-primary) / 0.35)',
      },
    },
  },
  plugins: [],
}

export default config
