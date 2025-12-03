import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

describe('useMediaQuery Hook', () => {
  let matchMediaMock

  beforeEach(() => {
    matchMediaMock = vi.fn()
    window.matchMedia = matchMediaMock
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('devrait retourner true si la media query correspond', () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('devrait retourner false si la media query ne correspond pas', () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
  })

  it('devrait appeler window.matchMedia avec la bonne query', () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    renderHook(() => useMediaQuery('(max-width: 640px)'))
    expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 640px)')
  })

  it('devrait écouter les changements de media query', () => {
    const addEventListenerMock = vi.fn()
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: addEventListenerMock,
      removeEventListener: vi.fn(),
    })

    renderHook(() => useMediaQuery('(min-width: 1024px)'))
    expect(addEventListenerMock).toHaveBeenCalled()
  })

  it('devrait nettoyer les event listeners au démontage', () => {
    const removeEventListenerMock = vi.fn()
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerMock,
    })

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    unmount()
    
    expect(removeEventListenerMock).toHaveBeenCalled()
  })

  it('devrait gérer les breakpoints Tailwind communs', () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    // sm: 640px
    const { result: smResult } = renderHook(() => useMediaQuery('(min-width: 640px)'))
    expect(smResult.current).toBe(true)

    // md: 768px
    const { result: mdResult } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(mdResult.current).toBe(true)

    // lg: 1024px
    const { result: lgResult } = renderHook(() => useMediaQuery('(min-width: 1024px)'))
    expect(lgResult.current).toBe(true)
  })

  it('devrait gérer les queries de préférence de thème', () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => useMediaQuery('(prefers-color-scheme: dark)'))
    expect(typeof result.current).toBe('boolean')
  })

  it('devrait gérer les queries complexes', () => {
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    const { result } = renderHook(() => 
      useMediaQuery('(min-width: 768px) and (max-width: 1024px)')
    )
    expect(typeof result.current).toBe('boolean')
  })
})


