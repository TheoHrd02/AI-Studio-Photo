/**
 * Configuration centralisée du thème AI Studio Photo
 * 
 * Ce fichier définit toutes les couleurs et variables de design
 * utilisées à travers l'application pour maintenir la cohérence visuelle.
 * 
 * ⚠️ Ce projet utilise uniquement le thème LIGHT (pas de dark mode)
 */

export const themeConfig = {
  /**
   * Couleurs principales
   */
  colors: {
    // Couleur primaire (violet personnalisé)
    primary: {
      DEFAULT: '#912efb',
      hover: '#7e1fe0',
      light: '#c179ff',
    },

    // Couleur secondaire (gris clair)
    secondary: '#eff0f0',

    // Couleurs grises (pour textes et borders)
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },

  /**
   * Backgrounds (Light mode uniquement)
   */
  backgrounds: {
    primary: '#ffffff',
    secondary: '#eff0f0',   // Couleur personnalisée
    input: '#eff0f0',       // Couleur personnalisée
    card: '#ffffff',
  },

  /**
   * Borders (Light mode uniquement)
   */
  borders: {
    default: '#e5e7eb',     // gray-200
    hover: '#912efb',       // primary
  },

  /**
   * Textes (Light mode uniquement)
   */
  text: {
    primary: '#111827',     // gray-900
    secondary: '#374151',   // gray-700
    tertiary: '#6b7280',    // gray-500
    placeholder: '#6b7280', // gray-500
  },

  /**
   * Spacing
   */
  spacing: {
    input: {
      padding: '0.75rem 1rem',  // py-3 px-4
    },
    card: {
      padding: '1rem 1.25rem',  // py-4 px-5
    },
  },

  /**
   * Border radius
   */
  borderRadius: {
    sm: '0.5rem',    // rounded-lg
    md: '0.75rem',   // rounded-xl
    lg: '1rem',      // rounded-2xl
    full: '9999px',  // rounded-full
  },

  /**
   * Shadows
   */
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
}

export type ThemeConfig = typeof themeConfig
