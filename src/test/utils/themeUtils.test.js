import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getThemeClasses, applyTheme, toggleTheme } from '../../utils/themeUtils'

describe('Theme Utils', () => {
  beforeEach(() => {
    // Reset localStorage avant chaque test
    localStorage.clear()
    // Reset classes du document
    document.documentElement.className = ''
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('getThemeClasses', () => {
    it('retourne les classes pour le thème dark', () => {
      const classes = getThemeClasses('dark')
      expect(classes).toContain('dark')
      expect(classes).toContain('bg-black')
    })

    it('retourne les classes pour le thème light', () => {
      const classes = getThemeClasses('light')
      expect(classes).toContain('light')
      expect(classes).toContain('bg-white')
    })

    it('retourne dark par défaut si thème invalide', () => {
      const classes = getThemeClasses('invalid')
      expect(classes).toContain('dark')
    })
  })

  describe('applyTheme', () => {
    it('applique le thème dark au document', () => {
      applyTheme('dark')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })

    it('applique le thème light au document', () => {
      applyTheme('light')
      expect(document.documentElement.classList.contains('light')).toBe(true)
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    })

    it('sauvegarde le thème dans localStorage', () => {
      applyTheme('dark')
      expect(localStorage.getItem('theme')).toBe('dark')
      
      applyTheme('light')
      expect(localStorage.getItem('theme')).toBe('light')
    })

    it('retire les anciennes classes de thème', () => {
      document.documentElement.classList.add('dark')
      applyTheme('light')
      
      expect(document.documentElement.classList.contains('dark')).toBe(false)
      expect(document.documentElement.classList.contains('light')).toBe(true)
    })
  })

  describe('toggleTheme', () => {
    it('bascule de dark à light', () => {
      localStorage.setItem('theme', 'dark')
      const newTheme = toggleTheme()
      
      expect(newTheme).toBe('light')
      expect(localStorage.getItem('theme')).toBe('light')
    })

    it('bascule de light à dark', () => {
      localStorage.setItem('theme', 'light')
      const newTheme = toggleTheme()
      
      expect(newTheme).toBe('dark')
      expect(localStorage.getItem('theme')).toBe('dark')
    })

    it('utilise dark comme défaut si aucun thème n\'est défini', () => {
      const newTheme = toggleTheme()
      
      expect(newTheme).toBe('light') // Toggle de dark (défaut) vers light
    })

    it('applique les classes au document lors du toggle', () => {
      localStorage.setItem('theme', 'dark')
      toggleTheme()
      
      expect(document.documentElement.classList.contains('light')).toBe(true)
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    })
  })
})

