/**
 * Design token reference — mirrors the CSS custom properties defined in
 * assets/css/main.css (@theme block).
 *
 * Use this object when you need design values in TypeScript logic
 * (e.g. dynamic SVG fills, canvas drawing, charting).
 * For Tailwind/CSS usage prefer the token classes directly:
 *   bg-primary-500, text-primary-600, bg-surface, …
 *
 * ⚠️  The CSS @theme block is the authoritative source of truth.
 *     Keep this file in sync whenever a CSS variable changes.
 */
export const themeConfig = {
  colors: {
    primary: {
      50:  '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      /** DEFAULT brand color → var(--color-primary-500) */
      500: '#912efb',
      /** Hover / pressed state → var(--color-primary-600) */
      600: '#7e1fe0',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
      950: '#2e1065',
    },
    /** Secondary page background → var(--color-surface) */
    surface: '#eff0f0',
  },
  borderRadius: {
    sm:   '0.5rem',
    md:   '0.75rem',
    lg:   '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
} as const

export type ThemeConfig = typeof themeConfig
