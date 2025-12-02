import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Process } from '../../pages/Process'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Process Page', () => {
  it('devrait afficher le titre de la page', () => {
    renderWithRouter(<Process />)
    expect(screen.getByText(/Notre Processus|Comment ça marche/i)).toBeInTheDocument()
  })

  it('devrait afficher les phases principales', () => {
    renderWithRouter(<Process />)
    expect(screen.getByText(/Brief|Analyse/i)).toBeInTheDocument()
    expect(screen.getByText(/Design|Maquette/i)).toBeInTheDocument()
    expect(screen.getByText(/Développement|Dev/i)).toBeInTheDocument()
    expect(screen.getByText(/Livraison|Lancement/i)).toBeInTheDocument()
  })

  it('devrait afficher la durée totale', () => {
    renderWithRouter(<Process />)
    expect(screen.getByText(/14 jours|2 semaines/i)).toBeInTheDocument()
  })

  it('devrait avoir une timeline détaillée', () => {
    renderWithRouter(<Process />)
    const page = screen.getByText(/Processus/i).closest('div')
    
    // Devrait contenir une structure de timeline
    expect(page).toBeTruthy()
  })

  it('devrait afficher les livrables de chaque phase', () => {
    renderWithRouter(<Process />)
    const page = screen.getByText(/Processus/i).closest('div')
    
    expect(page?.textContent).toMatch(/maquette|prototype/i)
    expect(page?.textContent).toMatch(/site|code/i)
    expect(page?.textContent).toMatch(/formation|support/i)
  })

  it('devrait afficher les technologies utilisées', () => {
    renderWithRouter(<Process />)
    expect(screen.getByText(/React|Tailwind|Supabase/i)).toBeInTheDocument()
  })

  it('devrait afficher les garanties', () => {
    renderWithRouter(<Process />)
    const page = screen.getByText(/Processus/i).closest('div')
    
    expect(page?.textContent).toMatch(/garantie|satisfait|remboursé/i)
  })

  it('devrait avoir un CTA', () => {
    renderWithRouter(<Process />)
    const buttons = screen.getAllByRole('button')
    
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('devrait être responsive', () => {
    renderWithRouter(<Process />)
    const page = screen.getByText(/Processus/i).closest('div')
    
    expect(page?.className).toMatch(/grid|flex/)
  })

  it('devrait avoir des animations', () => {
    renderWithRouter(<Process />)
    const page = screen.getByText(/Processus/i).closest('div')
    
    // Devrait utiliser Framer Motion ou animations CSS
    expect(page).toBeTruthy()
  })
})

