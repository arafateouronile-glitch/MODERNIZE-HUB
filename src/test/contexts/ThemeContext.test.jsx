import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, renderHook, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext'

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
  })

  describe('ThemeProvider', () => {
    it('devrait wrapper les enfants', () => {
      render(
        <ThemeProvider>
          <div>Test Content</div>
        </ThemeProvider>
      )
      
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('devrait initialiser avec le thème sombre par défaut', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })
      
      expect(result.current.theme).toBe('dark')
    })

    it('devrait charger le thème depuis localStorage', () => {
      localStorage.setItem('theme', 'light')
      
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })
      
      expect(result.current.theme).toBe('light')
    })
  })

  describe('useTheme Hook', () => {
    it('devrait retourner le thème actuel', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })
      
      expect(result.current.theme).toBeTruthy()
    })

    it('devrait fournir une fonction toggleTheme', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })
      
      expect(typeof result.current.toggleTheme).toBe('function')
    })

    it('devrait basculer entre dark et light', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })
      
      const initialTheme = result.current.theme
      
      act(() => {
        result.current.toggleTheme()
      })
      
      expect(result.current.theme).not.toBe(initialTheme)
    })

    it('devrait sauvegarder le thème dans localStorage', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })
      
      act(() => {
        result.current.toggleTheme()
      })
      
      const savedTheme = localStorage.getItem('theme')
      expect(savedTheme).toBeTruthy()
    })

    it('devrait appliquer la classe au <html>', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })
      
      act(() => {
        result.current.toggleTheme()
      })
      
      const htmlClass = document.documentElement.className
      expect(htmlClass).toMatch(/dark|light/)
    })

    it('devrait définir l\'attribut data-theme', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })
      
      act(() => {
        result.current.toggleTheme()
      })
      
      const dataTheme = document.documentElement.getAttribute('data-theme')
      expect(dataTheme).toMatch(/dark|light/)
    })
  })

  describe('Theme Persistence', () => {
    it('devrait restaurer le thème au reload', () => {
      localStorage.setItem('theme', 'light')
      
      const { result: result1 } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })
      
      expect(result1.current.theme).toBe('light')
      
      // Simuler un reload
      const { result: result2 } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })
      
      expect(result2.current.theme).toBe('light')
    })

    it('devrait gérer les valeurs invalides dans localStorage', () => {
      localStorage.setItem('theme', 'invalid-theme')
      
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      })
      
      // Devrait fallback sur 'dark'
      expect(result.current.theme).toMatch(/dark|light/)
    })
  })
})

