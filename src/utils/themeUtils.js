/**
 * Utilitaires pour la gestion du thème clair/sombre
 */

/**
 * Retourne les classes CSS appropriées pour un thème
 * @param {string} theme - 'light' ou 'dark'
 * @returns {string} Classes CSS
 */
export const getThemeClasses = (theme) => {
  if (theme === 'light') {
    return 'light bg-white text-black'
  }
  return 'dark bg-black text-white'
}

/**
 * Applique un thème au document
 * @param {string} theme - 'light' ou 'dark'
 */
export const applyTheme = (theme) => {
  const root = document.documentElement
  
  // Retirer les anciennes classes
  root.classList.remove('light', 'dark', 'bg-white', 'bg-black', 'text-white', 'text-black')
  
  // Appliquer les nouvelles classes
  const classes = getThemeClasses(theme).split(' ')
  root.classList.add(...classes)
  
  // Définir l'attribut data-theme
  root.setAttribute('data-theme', theme)
  
  // Sauvegarder dans localStorage
  localStorage.setItem('theme', theme)
}

/**
 * Récupère le thème depuis localStorage ou le système
 * @returns {string} 'light' ou 'dark'
 */
export const getStoredTheme = () => {
  // 1. Vérifier localStorage
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }
  
  // 2. Vérifier préférence système
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  
  // 3. Défaut: dark
  return 'dark'
}

/**
 * Bascule entre light et dark
 * @returns {string} Nouveau thème
 */
export const toggleTheme = () => {
  const currentTheme = getStoredTheme()
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  applyTheme(newTheme)
  return newTheme
}

/**
 * Initialise le thème au chargement de la page
 */
export const initTheme = () => {
  const theme = getStoredTheme()
  applyTheme(theme)
  return theme
}

/**
 * Écoute les changements de préférence système
 * @param {Function} callback - Fonction appelée lors du changement
 * @returns {Function} Fonction de nettoyage
 */
export const watchSystemTheme = (callback) => {
  if (!window.matchMedia) return () => {}
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
  const handler = (e) => {
    const newTheme = e.matches ? 'light' : 'dark'
    callback(newTheme)
  }
  
  mediaQuery.addEventListener('change', handler)
  
  // Retourner une fonction de nettoyage
  return () => mediaQuery.removeEventListener('change', handler)
}

/**
 * Retourne les couleurs du thème actuel
 * @param {string} theme - 'light' ou 'dark'
 * @returns {object} Objet contenant les couleurs
 */
export const getThemeColors = (theme) => {
  if (theme === 'light') {
    return {
      bg: '#FFFFFF',
      text: '#000000',
      accent: '#D9FF00',
      secondary: '#6366F1',
      border: '#E5E7EB',
    }
  }
  
  return {
    bg: '#000000',
    text: '#FFFFFF',
    accent: '#D9FF00',
    secondary: '#6366F1',
    border: '#1F2937',
  }
}
