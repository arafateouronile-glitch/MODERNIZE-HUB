import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { RefonteSite } from '../../pages/RefonteSite'

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  )
}

describe('RefonteSite Page', () => {
  it('devrait afficher le titre de la page', () => {
    renderWithProviders(<RefonteSite />)
    expect(screen.getByText(/Refonte de Site Web|Refonte/i)).toBeInTheDocument()
  })

  it('devrait afficher les 3 formules de refonte', () => {
    renderWithProviders(<RefonteSite />)
    expect(screen.getByText(/Refresh/i)).toBeInTheDocument()
    expect(screen.getByText(/Transformation/i)).toBeInTheDocument()
    expect(screen.getByText(/Métamorphose/i)).toBeInTheDocument()
  })

  it('devrait afficher le prix Refresh (1490€)', () => {
    renderWithProviders(<RefonteSite />)
    expect(screen.getByText(/1[\s,]?490/)).toBeInTheDocument()
  })

  it('devrait afficher le prix Transformation (2990€)', () => {
    renderWithProviders(<RefonteSite />)
    expect(screen.getByText(/2[\s,]?990/)).toBeInTheDocument()
  })

  it('devrait afficher le prix Métamorphose (4990€)', () => {
    renderWithProviders(<RefonteSite />)
    expect(screen.getByText(/4[\s,]?990/)).toBeInTheDocument()
  })

  it('devrait afficher le badge "PLUS POPULAIRE"', () => {
    renderWithProviders(<RefonteSite />)
    expect(screen.getByText(/PLUS POPULAIRE/i)).toBeInTheDocument()
  })

  it('devrait avoir des CTA "Choisir cette formule"', () => {
    renderWithProviders(<RefonteSite />)
    const buttons = screen.getAllByText(/Choisir/i)
    expect(buttons.length).toBeGreaterThanOrEqual(3)
  })

  it('devrait expliquer la différence entre refonte et création', () => {
    renderWithProviders(<RefonteSite />)
    const page = screen.getByText(/Refonte/i).closest('div')
    expect(page?.textContent).toMatch(/moderniser|améliorer|transformer/i)
  })

  it('devrait avoir une section FAQ', () => {
    renderWithProviders(<RefonteSite />)
    expect(screen.getByText(/Questions|FAQ/i)).toBeInTheDocument()
  })
})


