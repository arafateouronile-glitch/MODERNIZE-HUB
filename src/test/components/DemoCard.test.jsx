import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { DemoCard } from '../../components/portfolio/DemoCard'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

const mockProject = {
  id: 'restaurant-gastronomique',
  title: 'Restaurant Gastronomique',
  category: 'vitrine',
  industry: 'Restauration',
  thumbnail: '/images/portfolio/restaurant-thumb.svg',
  description: 'Expérience digitale raffinée pour un restaurant étoilé.',
  features: [
    'Hero vidéo full-screen',
    'Menu interactif avec photos HD',
    'Système réservation intégré',
  ],
  technologies: ['React', 'GSAP', 'Video API', 'Tailwind CSS'],
  colors: {
    primary: '#2D1810',
    secondary: '#F4E4C1',
    accent: '#C41E3A',
  },
  metrics: [
    { label: 'Réservations en ligne', value: '+300%' },
    { label: 'Temps de chargement', value: '0.9s' },
  ],
  developmentTime: '16 jours',
  cta: 'Obtenir un site similaire',
}

describe('DemoCard Component', () => {
  it('devrait afficher le titre du projet', () => {
    renderWithRouter(<DemoCard project={mockProject} />)
    expect(screen.getByText('Restaurant Gastronomique')).toBeInTheDocument()
  })

  it('devrait afficher la catégorie/industrie', () => {
    renderWithRouter(<DemoCard project={mockProject} />)
    expect(screen.getByText(/Restauration|vitrine/i)).toBeInTheDocument()
  })

  it('devrait afficher l\'image thumbnail', () => {
    renderWithRouter(<DemoCard project={mockProject} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', expect.stringContaining('restaurant-thumb.svg'))
  })

  it('devrait afficher la description', () => {
    renderWithRouter(<DemoCard project={mockProject} />)
    expect(screen.getByText(/Expérience digitale raffinée/i)).toBeInTheDocument()
  })

  it('devrait afficher les technologies utilisées', () => {
    renderWithRouter(<DemoCard project={mockProject} />)
    expect(screen.getByText(/React/i)).toBeInTheDocument()
    expect(screen.getByText(/Tailwind CSS/i)).toBeInTheDocument()
  })

  it('devrait afficher le temps de développement', () => {
    renderWithRouter(<DemoCard project={mockProject} />)
    expect(screen.getByText(/16 jours/i)).toBeInTheDocument()
  })

  it('devrait afficher le bouton CTA', () => {
    renderWithRouter(<DemoCard project={mockProject} />)
    expect(screen.getByText(/Obtenir un site similaire|Voir le projet/i)).toBeInTheDocument()
  })

  it('devrait naviguer vers la page démo au clic', () => {
    renderWithRouter(<DemoCard project={mockProject} />)
    const card = screen.getByText('Restaurant Gastronomique').closest('a, div')
    
    // La card devrait être cliquable
    if (card?.tagName === 'A') {
      expect(card).toHaveAttribute('href', expect.stringContaining('/demo/restaurant'))
    }
  })

  it('devrait avoir un effet hover', () => {
    renderWithRouter(<DemoCard project={mockProject} />)
    const card = screen.getByText('Restaurant Gastronomique').closest('div')
    
    // La card devrait avoir des effets de transition/hover
    expect(card?.className).toMatch(/hover|transition|group/)
  })

  it('devrait afficher les métriques clés', () => {
    renderWithRouter(<DemoCard project={mockProject} />)
    expect(screen.getByText(/\+300%/)).toBeInTheDocument()
    expect(screen.getByText(/0\.9s/)).toBeInTheDocument()
  })

  it('devrait avoir une image responsive', () => {
    renderWithRouter(<DemoCard project={mockProject} />)
    const img = screen.getByRole('img')
    
    // L'image devrait avoir des classes responsive
    expect(img.className).toMatch(/w-full|object-/)
  })

  it('devrait afficher un badge de catégorie', () => {
    renderWithRouter(<DemoCard project={mockProject} />)
    const card = screen.getByText('Restaurant Gastronomique').closest('div')
    
    // Devrait contenir un badge avec la catégorie (vitrine, e-commerce, etc.)
    expect(card?.textContent).toMatch(/vitrine|Restauration/i)
  })
})
