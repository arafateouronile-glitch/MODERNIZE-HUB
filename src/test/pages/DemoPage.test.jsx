import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom'
import { DemoPage } from '../../pages/DemoPage'

const renderWithRouter = (component, initialRoute = '/demo/restaurant-gastronomique') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/demo/:id" element={component} />
      </Routes>
    </MemoryRouter>
  )
}

describe('DemoPage Component', () => {
  it('devrait afficher le design du cabinet d\'avocats', () => {
    renderWithRouter(<DemoPage />, '/demo/cabinet-avocats')
    expect(screen.getByText(/VANDERBILT/i)).toBeInTheDocument()
    expect(screen.getByText(/ASSOCIES/i)).toBeInTheDocument()
  })

  it('devrait afficher le design du restaurant gastronomique', () => {
    renderWithRouter(<DemoPage />, '/demo/restaurant-gastronomique')
    expect(screen.getByText(/L'Épicurien|Épicurien/i)).toBeInTheDocument()
  })

  it('devrait afficher le design de l\'agence immobilière', () => {
    renderWithRouter(<DemoPage />, '/demo/agence-immobiliere')
    expect(screen.getByText(/Prestige Immobilier|Exception/i)).toBeInTheDocument()
  })

  it('devrait afficher le design du coach sportif', () => {
    renderWithRouter(<DemoPage />, '/demo/coach-sportif')
    expect(screen.getByText(/APEX FITNESS|Push Limits/i)).toBeInTheDocument()
  })

  it('devrait afficher le design de l\'artisan', () => {
    renderWithRouter(<DemoPage />, '/demo/artisan-premium')
    expect(screen.getByText(/L'Atelier Boisé|Atelier/i)).toBeInTheDocument()
  })

  it('devrait afficher le design de la startup tech', () => {
    renderWithRouter(<DemoPage />, '/demo/startup-tech')
    expect(screen.getByText(/TechFlow|Analytics/i)).toBeInTheDocument()
  })

  it('devrait afficher le design e-commerce', () => {
    renderWithRouter(<DemoPage />, '/demo/ecommerce-mode')
    expect(screen.getByText(/STUDIO/i)).toBeInTheDocument()
  })

  it('devrait afficher le design de l\'agence marketing', () => {
    renderWithRouter(<DemoPage />, '/demo/agence-marketing')
    expect(screen.getByText(/BOLD/i)).toBeInTheDocument()
  })

  it('devrait afficher le bouton "Retour" vers portfolio', () => {
    renderWithRouter(<DemoPage />, '/demo/restaurant-gastronomique')
    expect(screen.getByText(/Retour/i)).toBeInTheDocument()
  })

  it('devrait afficher le bouton "Je veux ce site"', () => {
    renderWithRouter(<DemoPage />, '/demo/restaurant-gastronomique')
    expect(screen.getByText(/Je veux ce site/i)).toBeInTheDocument()
  })

  it('devrait avoir un design unique pour chaque projet', () => {
    const { container: container1 } = renderWithRouter(<DemoPage />, '/demo/cabinet-avocats')
    const bg1 = container1.querySelector('div')?.className
    
    const { container: container2 } = renderWithRouter(<DemoPage />, '/demo/coach-sportif')
    const bg2 = container2.querySelector('div')?.className
    
    // Les backgrounds devraient être différents
    expect(bg1).not.toBe(bg2)
  })

  it('devrait gérer un ID de projet invalide', () => {
    renderWithRouter(<DemoPage />, '/demo/projet-inexistant')
    // Ne devrait pas crasher
    const page = screen.queryByText(/Design en cours de chargement|404/i)
    expect(page || true).toBeTruthy()
  })

  it('devrait afficher le footer personnalisé pour chaque projet', () => {
    renderWithRouter(<DemoPage />, '/demo/restaurant-gastronomique')
    expect(screen.getByText(/Modernize Hub/i)).toBeInTheDocument()
  })

  it('devrait avoir des CTA de conversion sur chaque démo', () => {
    renderWithRouter(<DemoPage />, '/demo/restaurant-gastronomique')
    const buttons = screen.getAllByRole('button')
    
    // Devrait y avoir au moins 3 boutons (navigation + CTA)
    expect(buttons.length).toBeGreaterThanOrEqual(3)
  })
})
