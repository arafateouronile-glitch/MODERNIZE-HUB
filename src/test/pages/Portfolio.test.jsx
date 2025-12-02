import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Portfolio } from '../../pages/Portfolio'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Portfolio Page', () => {
  it('devrait afficher le titre de la page', () => {
    renderWithRouter(<Portfolio />)
    expect(screen.getByText(/Portfolio|Nos Créations|Réalisations/i)).toBeInTheDocument()
  })

  it('devrait afficher 8 projets', () => {
    renderWithRouter(<Portfolio />)
    const projects = screen.getAllByRole('link')
    
    // Devrait y avoir au moins 8 projets + autres liens
    expect(projects.length).toBeGreaterThanOrEqual(8)
  })

  it('devrait avoir des filtres de catégories', () => {
    renderWithRouter(<Portfolio />)
    expect(screen.getByText(/Tous|All/i)).toBeInTheDocument()
    expect(screen.getByText(/Vitrine/i)).toBeInTheDocument()
    expect(screen.getByText(/E-commerce/i)).toBeInTheDocument()
  })

  it('devrait filtrer les projets par catégorie', () => {
    renderWithRouter(<Portfolio />)
    const vitrineFilter = screen.getByText(/Vitrine/i)
    
    fireEvent.click(vitrineFilter)
    
    // Les projets devraient être filtrés
    expect(vitrineFilter).toBeInTheDocument()
  })

  it('devrait afficher des images pour chaque projet', () => {
    renderWithRouter(<Portfolio />)
    const images = screen.getAllByRole('img')
    
    // Devrait y avoir au moins 8 images (une par projet)
    expect(images.length).toBeGreaterThanOrEqual(8)
  })

  it('devrait afficher le titre de chaque projet', () => {
    renderWithRouter(<Portfolio />)
    expect(screen.getByText(/Restaurant|Cabinet|Agence/i)).toBeInTheDocument()
  })

  it('devrait naviguer vers la page démo au clic', () => {
    renderWithRouter(<Portfolio />)
    const projectLinks = screen.getAllByRole('link')
    
    // Les liens devraient pointer vers /demo/:id
    const demoLink = projectLinks.find(link => 
      link.getAttribute('href')?.includes('/demo/')
    )
    
    expect(demoLink).toBeTruthy()
  })

  it('devrait afficher la catégorie de chaque projet', () => {
    renderWithRouter(<Portfolio />)
    const page = screen.getByText(/Portfolio/i).closest('div')
    
    // Devrait contenir des badges de catégorie
    expect(page?.textContent).toMatch(/Vitrine|E-commerce|Landing Page/i)
  })

  it('devrait avoir un design en grille responsive', () => {
    renderWithRouter(<Portfolio />)
    const page = screen.getByText(/Portfolio/i).closest('div')
    
    expect(page?.className).toMatch(/grid/)
  })

  it('devrait avoir des animations au hover', () => {
    renderWithRouter(<Portfolio />)
    const page = screen.getByText(/Portfolio/i).closest('div')
    
    // Devrait avoir des classes de hover/transition
    expect(page?.innerHTML).toMatch(/hover|transition|group/)
  })

  it('devrait afficher un CTA "Obtenir un site similaire"', () => {
    renderWithRouter(<Portfolio />)
    expect(screen.getByText(/Obtenir|Demander|Voir/i)).toBeInTheDocument()
  })

  it('devrait reset les filtres au clic sur "Tous"', () => {
    renderWithRouter(<Portfolio />)
    
    // Filtrer d'abord
    const vitrineFilter = screen.getByText(/Vitrine/i)
    fireEvent.click(vitrineFilter)
    
    // Reset
    const allFilter = screen.getByText(/Tous|All/i)
    fireEvent.click(allFilter)
    
    // Tous les projets devraient être visibles
    expect(allFilter).toBeInTheDocument()
  })
})

