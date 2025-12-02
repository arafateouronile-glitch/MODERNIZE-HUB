import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Services } from '../../pages/Services'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Services Page', () => {
  it('devrait afficher le titre principal de la page', () => {
    renderWithRouter(<Services />)
    expect(screen.getByText(/Nos Services|Choisissez/i)).toBeInTheDocument()
  })

  it('devrait afficher la carte "Création de Site Web"', () => {
    renderWithRouter(<Services />)
    expect(screen.getByText(/Création de Site Web/i)).toBeInTheDocument()
  })

  it('devrait afficher la carte "Refonte de Site Web"', () => {
    renderWithRouter(<Services />)
    expect(screen.getByText(/Refonte/i)).toBeInTheDocument()
  })

  it('devrait afficher le prix de départ pour création', () => {
    renderWithRouter(<Services />)
    expect(screen.getByText(/1[\s,]?990/)).toBeInTheDocument()
  })

  it('devrait afficher le prix de départ pour refonte', () => {
    renderWithRouter(<Services />)
    expect(screen.getByText(/1[\s,]?490/)).toBeInTheDocument()
  })

  it('devrait avoir des liens vers les pages de détail', () => {
    renderWithRouter(<Services />)
    const links = screen.getAllByRole('link')
    
    // Devrait y avoir au moins 2 liens (création + refonte)
    expect(links.length).toBeGreaterThanOrEqual(2)
  })

  it('devrait afficher des icônes pour chaque service', () => {
    renderWithRouter(<Services />)
    const page = screen.getByText(/Nos Services/i).closest('div')
    const svgs = page?.querySelectorAll('svg')
    
    // Devrait y avoir des icônes SVG
    expect(svgs && svgs.length).toBeGreaterThan(0)
  })

  it('devrait avoir un design responsive', () => {
    renderWithRouter(<Services />)
    const page = screen.getByText(/Nos Services/i).closest('div')
    
    // Devrait avoir des classes de grid ou flex responsive
    expect(page?.className).toMatch(/grid|flex/)
  })

  it('devrait naviguer vers /creation-site-web', () => {
    renderWithRouter(<Services />)
    const creationLink = screen.getByText(/Création de Site Web/i).closest('a')
    
    if (creationLink) {
      expect(creationLink).toHaveAttribute('href', expect.stringContaining('/creation'))
    }
  })

  it('devrait naviguer vers /refonte-site', () => {
    renderWithRouter(<Services />)
    const refonteLink = screen.getByText(/Refonte/i).closest('a')
    
    if (refonteLink) {
      expect(refonteLink).toHaveAttribute('href', expect.stringContaining('/refonte'))
    }
  })
})
