import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Pricing } from '../../components/sections/Pricing'
import { pricingPlans } from '../../data/pricing'

// Mock des dépendances
vi.mock('../../hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => [{ current: null }, true],
}))

vi.mock('../animations/Reveal', () => ({
  Reveal: ({ children }) => <div>{children}</div>,
}))

describe('Pricing Component', () => {
  it('should render pricing section', () => {
    render(<Pricing />)
    
    expect(screen.getByText(/Nos Formules/i)).toBeInTheDocument()
  })

  it('should display all pricing plans', () => {
    render(<Pricing />)
    
    pricingPlans.forEach(plan => {
      expect(screen.getByText(plan.name)).toBeInTheDocument()
    })
  })

  it('should display pricing information', () => {
    render(<Pricing />)
    
    // Vérifier qu'il y a des prix affichés
    expect(screen.getByText(/€/)).toBeInTheDocument()
  })
})



