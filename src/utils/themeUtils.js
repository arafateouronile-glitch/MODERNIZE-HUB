/**
 * Utilitaires pour gérer les classes CSS selon le thème
 */

export const getThemeClasses = (lightClass, darkClass, currentTheme) => {
  return currentTheme === 'light' ? lightClass : darkClass
}

export const getThemeColor = (lightColor, darkColor, currentTheme) => {
  return currentTheme === 'light' ? lightColor : darkColor
}

/**
 * Hook pour obtenir les classes conditionnelles selon le thème
 */
export const useThemeClasses = (theme) => {
  return {
    bg: {
      main: theme === 'light' ? 'bg-white' : 'bg-[#0F1116]',
      surface: theme === 'light' ? 'bg-[#F8F9FA]' : 'bg-[#161B22]',
      highlight: theme === 'light' ? 'bg-[#E9ECEF]' : 'bg-[#1F242C]',
    },
    text: {
      main: theme === 'light' ? 'text-[#0F1116]' : 'text-white',
      muted: theme === 'light' ? 'text-[#6C757D]' : 'text-[#D9FF00]',
    },
    border: theme === 'light' ? 'border-black/10' : 'border-white/10',
  }
}


