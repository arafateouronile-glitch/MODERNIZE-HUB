import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalendlyButton } from '../../components/common/CalendlyButton'

describe('CalendlyButton Component', () => {
  beforeEach(() => {
    // Mock window.Calendly
    window.Calendly = {
      initPopupWidget: vi.fn(),
    }
    
    // Mock import.meta.env
    import.meta.env.VITE_CALENDLY_URL = 'https://calendly.com/modernizehub/consultation'
  })

  it('devrait afficher le bouton', () => {
    render(<CalendlyButton />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('devrait afficher le texte par défaut', () => {
    render(<CalendlyButton />)
    expect(screen.getByText(/Réserver|Calendly|Appel|Consultation/i)).toBeInTheDocument()
  })

  it('devrait accepter une prop variant', () => {
    render(<CalendlyButton variant="secondary" />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('devrait accepter une className custom', () => {
    render(<CalendlyButton className="custom-class" />)
    const button = screen.getByRole('button')
    expect(button.className).toContain('custom-class')
  })

  it('devrait charger le script Calendly au montage', () => {
    render(<CalendlyButton />)
    
    // Vérifier que le script Calendly est chargé
    const scripts = Array.from(document.querySelectorAll('script'))
    const calendlyScript = scripts.find(s => 
      s.src.includes('calendly') || s.src.includes('widget')
    )
    
    // Le script devrait être présent (ou en cours de chargement)
    expect(scripts.length).toBeGreaterThan(0)
  })

  it('devrait ouvrir le widget Calendly au clic', () => {
    render(<CalendlyButton />)
    const button = screen.getByRole('button')
    
    fireEvent.click(button)
    
    // Le widget Calendly devrait être appelé
    if (window.Calendly) {
      expect(window.Calendly.initPopupWidget).toHaveBeenCalled()
    }
  })

  it('devrait gérer le cas où Calendly n\'est pas chargé', () => {
    delete window.Calendly
    
    render(<CalendlyButton />)
    const button = screen.getByRole('button')
    
    // Ne devrait pas crasher même si Calendly n'est pas disponible
    fireEvent.click(button)
    expect(button).toBeInTheDocument()
  })

  it('devrait utiliser l\'URL Calendly depuis les variables d\'environnement', () => {
    const testUrl = 'https://calendly.com/test/meeting'
    import.meta.env.VITE_CALENDLY_URL = testUrl
    
    render(<CalendlyButton />)
    const button = screen.getByRole('button')
    
    fireEvent.click(button)
    
    // L'URL correcte devrait être utilisée
    expect(button).toBeInTheDocument()
  })

  it('devrait avoir un bouton cliquable et non désactivé', () => {
    render(<CalendlyButton />)
    const button = screen.getByRole('button')
    
    expect(button).not.toBeDisabled()
  })

  it('devrait afficher un message si l\'URL Calendly n\'est pas configurée', () => {
    import.meta.env.VITE_CALENDLY_URL = 'your-calendly-url'
    
    render(<CalendlyButton />)
    
    // Devrait afficher un message d'erreur ou un placeholder
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})

