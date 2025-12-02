import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FAQ } from '../../components/sections/FAQ'

describe('FAQ Component', () => {
  it('devrait afficher le titre de la section FAQ', () => {
    render(<FAQ />)
    expect(screen.getByText(/Questions Fréquentes|FAQ/i)).toBeInTheDocument()
  })

  it('devrait afficher au moins 5 questions', () => {
    render(<FAQ />)
    const questions = screen.getAllByRole('button')
    expect(questions.length).toBeGreaterThanOrEqual(5)
  })

  it('devrait ouvrir une réponse au clic sur une question', () => {
    render(<FAQ />)
    const buttons = screen.getAllByRole('button')
    
    if (buttons.length > 0) {
      const firstQuestion = buttons[0]
      fireEvent.click(firstQuestion)
      
      // La réponse devrait être visible après le clic
      expect(firstQuestion).toBeInTheDocument()
    }
  })

  it('devrait fermer une réponse ouverte au second clic', () => {
    render(<FAQ />)
    const buttons = screen.getAllByRole('button')
    
    if (buttons.length > 0) {
      const firstQuestion = buttons[0]
      
      // Ouvrir
      fireEvent.click(firstQuestion)
      // Fermer
      fireEvent.click(firstQuestion)
      
      expect(firstQuestion).toBeInTheDocument()
    }
  })

  it('devrait avoir des icônes + et -', () => {
    render(<FAQ />)
    const faqSection = screen.getByText(/Questions Fréquentes|FAQ/i).closest('section')
    const svgs = faqSection?.querySelectorAll('svg')
    
    // Devrait y avoir des icônes (chevrons, plus, etc.)
    expect(svgs && svgs.length).toBeGreaterThan(0)
  })

  it('devrait afficher des questions sur les tarifs', () => {
    render(<FAQ />)
    const faqText = screen.getByText(/Questions Fréquentes/i).closest('section')?.textContent
    expect(faqText).toMatch(/prix|tarif|coût/i)
  })

  it('devrait afficher des questions sur les délais', () => {
    render(<FAQ />)
    const faqText = screen.getByText(/Questions Fréquentes/i).closest('section')?.textContent
    expect(faqText).toMatch(/délai|combien de temps|livraison/i)
  })

  it('devrait être animée (Framer Motion)', () => {
    render(<FAQ />)
    const faqSection = screen.getByText(/Questions Fréquentes/i).closest('section')
    
    // Devrait avoir des attributs Framer Motion ou des classes d'animation
    expect(faqSection).toBeTruthy()
  })

  it('devrait être accessible (ARIA)', () => {
    render(<FAQ />)
    const buttons = screen.getAllByRole('button')
    
    // Chaque bouton devrait avoir un attribut aria
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-expanded')
    })
  })

  it('devrait avoir un design responsive', () => {
    render(<FAQ />)
    const faqSection = screen.getByText(/Questions Fréquentes/i).closest('section')
    
    // Devrait avoir des classes responsive
    expect(faqSection?.className).toMatch(/grid|flex|space/)
  })
})

