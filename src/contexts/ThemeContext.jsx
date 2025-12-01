import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    
    // Vérifier localStorage d'abord
    const saved = localStorage.getItem('theme')
    if (saved && (saved === 'light' || saved === 'dark')) {
      return saved
    }
    
    // Par défaut sombre
    return 'dark'
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
    
    // Mettre à jour l'attribut data-theme pour le CSS
    root.setAttribute('data-theme', theme)
    
    console.log('✅ Theme changed to:', theme)
    console.log('📋 HTML classes:', root.className)
    console.log('📋 data-theme:', root.getAttribute('data-theme'))
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

