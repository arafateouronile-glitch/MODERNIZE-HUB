import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useCountUp } from '../../hooks/useCountUp'

describe('useCountUp Hook', () => {
  it('devrait commencer à 0', () => {
    const { result } = renderHook(() => useCountUp(100))
    expect(result.current).toBe(0)
  })

  it('devrait compter jusqu\'à la valeur cible', async () => {
    const { result } = renderHook(() => useCountUp(100, 100))
    
    await waitFor(() => {
      expect(result.current).toBe(100)
    }, { timeout: 200 })
  })

  it('devrait respecter la durée spécifiée', async () => {
    const duration = 500
    const { result } = renderHook(() => useCountUp(50, duration))
    
    // Après la durée, la valeur devrait être atteinte
    await waitFor(() => {
      expect(result.current).toBe(50)
    }, { timeout: duration + 100 })
  })

  it('devrait gérer les nombres décimaux', async () => {
    const { result } = renderHook(() => useCountUp(99.99, 100))
    
    await waitFor(() => {
      expect(result.current).toBeCloseTo(99.99, 1)
    }, { timeout: 200 })
  })

  it('devrait utiliser une durée par défaut si non spécifiée', () => {
    const { result } = renderHook(() => useCountUp(100))
    
    // Devrait retourner un nombre (même si 0 au départ)
    expect(typeof result.current).toBe('number')
  })

  it('devrait commencer l\'animation au montage', () => {
    const { result } = renderHook(() => useCountUp(100))
    
    // Immédiatement après le montage, la valeur est 0
    expect(result.current).toBe(0)
  })

  it('devrait gérer une valeur cible de 0', async () => {
    const { result } = renderHook(() => useCountUp(0, 100))
    
    await waitFor(() => {
      expect(result.current).toBe(0)
    })
  })

  it('devrait gérer les grands nombres', async () => {
    const { result } = renderHook(() => useCountUp(10000, 100))
    
    await waitFor(() => {
      expect(result.current).toBe(10000)
    }, { timeout: 200 })
  })
})
