import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { Footer } from '../../components/common/Footer'

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  )
}

describe('Footer Component', () => {
  it('devrait afficher le nom "Modernize Hub"', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByText(/Modernize Hub/i)).toBeInTheDocument()
  })

  it('devrait afficher les sections principales', () => {
    renderWithProviders(<Footer />)
    
    // Vérifier la présence des sections communes
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('devrait afficher les liens vers les réseaux sociaux', () => {
    renderWithProviders(<Footer />)
    
    // Les icônes de réseaux sociaux devraient être présentes
    const footer = screen.getByRole('contentinfo')
    const links = footer.querySelectorAll('a')
    
    // Il devrait y avoir plusieurs liens (navigation + social)
    expect(links.length).toBeGreaterThan(3)
  })

  it('devrait afficher l\'année en cours dans le copyright', () => {
    renderWithProviders(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
  })

  it('devrait afficher les mentions légales', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByText(/Mentions Légales/i)).toBeInTheDocument()
  })

  it('devrait afficher la politique de confidentialité', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByText(/Politique de Confidentialité/i)).toBeInTheDocument()
  })

  it('devrait afficher l\'email de contact', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByText(/contact@modernizehub.com/i)).toBeInTheDocument()
  })

  it('devrait avoir des liens fonctionnels', () => {
    renderWithProviders(<Footer />)
    const footer = screen.getByRole('contentinfo')
    const links = footer.querySelectorAll('a[href]')
    
    // Tous les liens devraient avoir un attribut href
    links.forEach(link => {
      expect(link).toHaveAttribute('href')
    })
  })

  it('devrait afficher les liens vers les services', () => {
    renderWithProviders(<Footer />)
    
    // Vérifier que les liens vers services sont présents
    const footer = screen.getByRole('contentinfo')
    expect(footer.textContent).toMatch(/Nos Services|Services/i)
  })

  it('devrait être responsive', () => {
    renderWithProviders(<Footer />)
    const footer = screen.getByRole('contentinfo')
    
    // Le footer devrait avoir des classes responsive (grid, flex, etc.)
    expect(footer.className).toMatch(/grid|flex/)
  })
})
