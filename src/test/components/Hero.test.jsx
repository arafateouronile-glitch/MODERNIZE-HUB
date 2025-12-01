import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '../../components/sections/Hero'

// Mock des dépendances
vi.mock('../../hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => [{ current: null }, true],
}))

vi.mock('../../hooks/useCountUp', () => ({
  useCountUp: (value) => value,
}))

vi.mock('../animations/Reveal', () => ({
  Reveal: ({ children }) => <div>{children}</div>,
}))

vi.mock('../common/CalendlyButton', () => ({
  CalendlyButton: () => <button>Calendly</button>,
}))

vi.mock('../quiz/LeadQuiz', () => ({
  LeadQuiz: () => null,
}))

describe('Hero Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render hero section', () => {
    render(<Hero />)
    
    expect(screen.getByText(/VOTRE SITE/i)).toBeInTheDocument()
  })

  it('should display stats', () => {
    render(<Hero />)
    
    // Vérifier que les stats sont affichées
    expect(screen.getByText(/Sites Transformés/i)).toBeInTheDocument()
    expect(screen.getByText(/Leads en Moyenne/i)).toBeInTheDocument()
  })

  it('should display CTA buttons', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Obtenir Mon Devis Gratuit/i)).toBeInTheDocument()
  })
})


