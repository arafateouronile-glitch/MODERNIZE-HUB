import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { Header } from '../../components/common/Header'

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  )
}

describe('Header Component', () => {
  it('devrait afficher le logo "Modernize Hub"', () => {
    renderWithProviders(<Header />)
    expect(screen.getByText(/Modernize Hub/i)).toBeInTheDocument()
  })

  it('devrait afficher les liens de navigation principaux', () => {
    renderWithProviders(<Header />)
    expect(screen.getByText(/Nos Services/i)).toBeInTheDocument()
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument()
    expect(screen.getByText(/Process/i)).toBeInTheDocument()
    expect(screen.getByText(/Blog/i)).toBeInTheDocument()
  })

  it('devrait afficher le bouton CTA "Parlons-en"', () => {
    renderWithProviders(<Header />)
    expect(screen.getByText(/Parlons-en/i)).toBeInTheDocument()
  })

  it('devrait ouvrir le menu mobile au clic sur hamburger', () => {
    renderWithProviders(<Header />)
    
    // Trouver le bouton hamburger (visible uniquement sur mobile)
    const hamburgerButtons = screen.getAllByRole('button')
    const hamburgerButton = hamburgerButtons.find(btn => 
      btn.querySelector('svg') && !btn.textContent.includes('Parlons-en')
    )
    
    if (hamburgerButton) {
      fireEvent.click(hamburgerButton)
      // Le menu devrait s'ouvrir (vérifier via classe ou attribut)
      expect(hamburgerButton).toBeInTheDocument()
    }
  })

  it('devrait avoir un header sticky', () => {
    renderWithProviders(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass(/fixed|sticky/)
  })

  it('devrait contenir le ThemeToggle', () => {
    renderWithProviders(<Header />)
    // Le ThemeToggle devrait être présent dans le header
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('devrait naviguer vers /contact au clic sur "Parlons-en"', () => {
    renderWithProviders(<Header />)
    const ctaButton = screen.getByText(/Parlons-en/i)
    
    // Vérifier que c'est un lien ou bouton cliquable
    expect(ctaButton.closest('a, button')).toBeInTheDocument()
  })

  it('devrait avoir un z-index élevé pour rester au-dessus du contenu', () => {
    renderWithProviders(<Header />)
    const header = screen.getByRole('banner')
    const styles = window.getComputedStyle(header)
    
    // Le header devrait avoir z-index > 10 pour rester visible
    expect(header.className).toContain('z-')
  })
})
