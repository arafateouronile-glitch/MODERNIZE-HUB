/**
 * Utilitaires pour générer des classes qui s'adaptent au thème
 */

export const themeClasses = {
  // Backgrounds
  bg: {
    main: 'bg-background dark:bg-background',
    surface: 'bg-surface dark:bg-surface',
    highlight: 'bg-surfaceHighlight dark:bg-surfaceHighlight',
  },
  
  // Textes
  text: {
    main: 'text-text-main dark:text-text-main',
    muted: 'text-text-muted dark:text-text-muted',
    white: 'text-white dark:text-white [data-theme="light"]:text-[#0F1116]',
    black: 'text-black dark:text-white',
  },
  
  // Bordures
  border: {
    default: 'border-white/10 dark:border-white/10 [data-theme="light"]:border-black/10',
    accent: 'border-primary dark:border-primary',
  },
}

/**
 * Helper pour obtenir des classes adaptatives
 */
export const getThemeClass = (baseClass, lightClass, darkClass) => {
  return `${baseClass} ${lightClass} ${darkClass}`
}



