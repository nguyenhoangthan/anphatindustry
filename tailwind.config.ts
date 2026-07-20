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
        // ─── Season-aware frontend tokens (CSS variable driven) ───────────
        // Using DEFAULT + dim so `bg-primary` uses the var, scale shades stay static
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dim:     'rgb(var(--color-primary) / 0.15)',
          // Static coral scale – matches --color-primary (#FB5A5A)
          50:  '#fff1f1',
          100: '#ffdede',
          200: '#ffc2c2',
          300: '#ff9b9b',
          400: '#fd7676',
          500: '#fb5a5a',
          600: '#ec3b3b',
          700: '#c72727',
          800: '#a52424',
          900: '#882424',
          950: '#4b0e0e',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          // Static indigo scale – matches --color-accent (#2E2A8F)
          50:  '#eeeefb',
          100: '#e0e0f7',
          200: '#c6c6f0',
          300: '#a3a2e4',
          400: '#807dd6',
          500: '#635ec7',
          600: '#4f47b8',
          700: '#3f38a0',
          800: '#2e2a8f',
          900: '#282573',
          950: '#191643',
        },

        // ─── Dark backgrounds (CSS variable driven) ───────────────────────
        'dark-1': 'rgb(var(--color-dark-1) / <alpha-value>)',
        'dark-2': 'rgb(var(--color-dark-2) / <alpha-value>)',
        'dark-3': 'rgb(var(--color-dark-3) / <alpha-value>)',

        // ─── Static neutrals ──────────────────────────────────────────────
        'body-text':  '#5b6080',
        'heading-text': '#2e2a8f',
        border:       '#e4e5f2',
        'bg-light':   '#F8F9FA',
        'bg-grey':    '#eeeeee',
        // Legacy aliases kept for existing pages
        'light-gray': '#F8F9FA',
        'mid-gray':   '#E9ECEF',
        dark:         '#1A1A2E',
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
        'card-dark':  '0 4px 24px 0 rgba(46,42,143,0.08)',
        'card-hover': '0 12px 40px 0 rgba(46,42,143,0.16)',
        'primary':    '0 4px 20px 0 rgb(var(--color-primary) / 0.35)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
