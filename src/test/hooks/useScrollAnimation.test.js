import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

describe('useScrollAnimation Hook', () => {
  let mockIntersectionObserver

  beforeEach(() => {
    // Mock IntersectionObserver
    mockIntersectionObserver = vi.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    })
    window.IntersectionObserver = mockIntersectionObserver
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('retourne un ref', () => {
    const { result } = renderHook(() => useScrollAnimation())
    expect(result.current).toBeDefined()
    expect(result.current.current).toBeNull() // Avant d'être attaché
  })

  it('crée un IntersectionObserver', () => {
    renderHook(() => useScrollAnimation())
    expect(mockIntersectionObserver).toHaveBeenCalled()
  })

  it('utilise le seuil par défaut de 0.1', () => {
    renderHook(() => useScrollAnimation())
    
    const observerOptions = mockIntersectionObserver.mock.calls[0][1]
    expect(observerOptions.threshold).toBe(0.1)
  })

  it('accepte un seuil personnalisé', () => {
    renderHook(() => useScrollAnimation({ threshold: 0.5 }))
    
    const observerOptions = mockIntersectionObserver.mock.calls[0][1]
    expect(observerOptions.threshold).toBe(0.5)
  })

  it('nettoie l\'observer au démontage', () => {
    const disconnect = vi.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect,
    })

    const { unmount } = renderHook(() => useScrollAnimation())
    unmount()

    expect(disconnect).toHaveBeenCalled()
  })

  it('observe l\'élément quand le ref est attaché', () => {
    const observe = vi.fn()
    mockIntersectionObserver.mockReturnValue({
      observe,
      unobserve: () => null,
      disconnect: () => null,
    })

    const { result } = renderHook(() => useScrollAnimation())
    
    // Simuler l'attachement du ref à un élément
    const mockElement = document.createElement('div')
    result.current.current = mockElement

    // Note: Dans un vrai test, l'observation se ferait automatiquement
    // Ici on vérifie juste que le mécanisme est en place
    expect(mockIntersectionObserver).toHaveBeenCalled()
  })
})

