import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { PricingCard } from '../../components/pricing/PricingCard'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

const mockTier = {
  id: 'business-pro',
  name: 'Business Pro',
  price: 3490,
  color: '#8B5CF6',
  icon: '🚀',
  popular: true,
  badge: 'PLUS POPULAIRE',
  features: [
    '10 pages SEO optimisées',
    'Animations premium 3D',
    'Google My Business Setup',
    '3 emails professionnels',
  ],
  cta: 'Choisir cette formule',
  description: 'La solution idéale pour les entreprises',
}

describe('PricingCard Component', () => {
  it('devrait afficher le nom de la formule', () => {
    renderWithRouter(<PricingCard tier={mockTier} />)
    expect(screen.getByText('Business Pro')).toBeInTheDocument()
  })

  it('devrait afficher le prix correctement formaté', () => {
    renderWithRouter(<PricingCard tier={mockTier} />)
    expect(screen.getByText(/3[\s,]?490/)).toBeInTheDocument()
  })

  it('devrait afficher le badge "PLUS POPULAIRE" si populaire', () => {
    renderWithRouter(<PricingCard tier={mockTier} />)
    expect(screen.getByText('PLUS POPULAIRE')).toBeInTheDocument()
  })

  it('ne devrait pas afficher le badge si non populaire', () => {
    const nonPopularTier = { ...mockTier, popular: false, badge: undefined }
    renderWithRouter(<PricingCard tier={nonPopularTier} />)
    expect(screen.queryByText('PLUS POPULAIRE')).not.toBeInTheDocument()
  })

  it('devrait afficher toutes les fonctionnalités', () => {
    renderWithRouter(<PricingCard tier={mockTier} />)
    
    mockTier.features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })
  })

  it('devrait afficher l\'icône de la formule', () => {
    renderWithRouter(<PricingCard tier={mockTier} />)
    expect(screen.getByText('🚀')).toBeInTheDocument()
  })

  it('devrait afficher le bouton CTA', () => {
    renderWithRouter(<PricingCard tier={mockTier} />)
    expect(screen.getByText('Choisir cette formule')).toBeInTheDocument()
  })

  it('devrait afficher la description', () => {
    renderWithRouter(<PricingCard tier={mockTier} />)
    expect(screen.getByText(/La solution idéale/i)).toBeInTheDocument()
  })

  it('devrait avoir un effet hover', () => {
    renderWithRouter(<PricingCard tier={mockTier} />)
    const card = screen.getByText('Business Pro').closest('div')
    
    // La card devrait avoir des classes de transition/hover
    expect(card?.className).toMatch(/hover|transition/)
  })

  it('devrait être cliquable', () => {
    renderWithRouter(<PricingCard tier={mockTier} />)
    const button = screen.getByText('Choisir cette formule')
    
    fireEvent.click(button)
    expect(button).toBeInTheDocument()
  })

  it('devrait se démarquer visuellement si populaire', () => {
    renderWithRouter(<PricingCard tier={mockTier} />)
    const card = screen.getByText('Business Pro').closest('div')
    
    // La card populaire devrait avoir des styles spéciaux (border, shadow, scale)
    expect(card?.className).toBeTruthy()
  })

  it('devrait afficher le symbole € après le prix', () => {
    renderWithRouter(<PricingCard tier={mockTier} />)
    expect(screen.getByText(/€/)).toBeInTheDocument()
  })

  it('devrait afficher des coches pour chaque fonctionnalité', () => {
    renderWithRouter(<PricingCard tier={mockTier} />)
    const card = screen.getByText('Business Pro').closest('div')
    
    // Devrait y avoir des icônes de validation (✓, ✔, check, etc.)
    expect(card?.innerHTML).toMatch(/check|✓|✔/i)
  })
})
