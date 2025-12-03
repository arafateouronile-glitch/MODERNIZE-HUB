import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { CreationSiteWeb } from '../../pages/CreationSiteWeb'

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  )
}

describe('CreationSiteWeb Page', () => {
  it('devrait afficher le titre de la page', () => {
    renderWithProviders(<CreationSiteWeb />)
    expect(screen.getByText(/Création de Site Web|Nos Formules/i)).toBeInTheDocument()
  })

  it('devrait afficher les 3 formules de pricing', () => {
    renderWithProviders(<CreationSiteWeb />)
    expect(screen.getByText(/Essentiel/i)).toBeInTheDocument()
    expect(screen.getByText(/Business Pro/i)).toBeInTheDocument()
    expect(screen.getByText(/Élite Total/i)).toBeInTheDocument()
  })

  it('devrait afficher le prix de la formule Essentiel (1990€)', () => {
    renderWithProviders(<CreationSiteWeb />)
    expect(screen.getByText(/1[\s,]?990/)).toBeInTheDocument()
  })

  it('devrait afficher le prix de la formule Business Pro (3490€)', () => {
    renderWithProviders(<CreationSiteWeb />)
    expect(screen.getByText(/3[\s,]?490/)).toBeInTheDocument()
  })

  it('devrait afficher le prix de la formule Élite Total (6490€)', () => {
    renderWithProviders(<CreationSiteWeb />)
    expect(screen.getByText(/6[\s,]?490/)).toBeInTheDocument()
  })

  it('devrait afficher le badge "PLUS POPULAIRE" sur Business Pro', () => {
    renderWithProviders(<CreationSiteWeb />)
    expect(screen.getByText(/PLUS POPULAIRE/i)).toBeInTheDocument()
  })

  it('devrait afficher des CTA "Choisir cette formule"', () => {
    renderWithProviders(<CreationSiteWeb />)
    const buttons = screen.getAllByText(/Choisir/i)
    expect(buttons.length).toBeGreaterThanOrEqual(3)
  })

  it('devrait afficher les services complémentaires', () => {
    renderWithProviders(<CreationSiteWeb />)
    expect(screen.getByText(/Google My Business|Emails Professionnels|Complémentaires/i)).toBeInTheDocument()
  })

  it('devrait avoir une section FAQ', () => {
    renderWithProviders(<CreationSiteWeb />)
    expect(screen.getByText(/Questions|FAQ/i)).toBeInTheDocument()
  })

  it('devrait afficher un CTA final', () => {
    renderWithProviders(<CreationSiteWeb />)
    const page = screen.getByText(/Création de Site Web/i).closest('div')
    expect(page?.textContent).toMatch(/Démarrer|Commencer|Projet/i)
  })
})


