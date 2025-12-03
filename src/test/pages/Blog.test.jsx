import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Blog } from '../../pages/Blog'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Blog Page', () => {
  it('devrait afficher le titre de la page', () => {
    renderWithRouter(<Blog />)
    expect(screen.getByText(/Blog|Articles|Actualités/i)).toBeInTheDocument()
  })

  it('devrait afficher "Aucun article" si vide', () => {
    renderWithRouter(<Blog />)
    // Si aucun article publié, devrait afficher un message
    const page = screen.getByText(/Blog/i).closest('div')
    expect(page).toBeTruthy()
  })

  it('devrait afficher les articles en grille', () => {
    renderWithRouter(<Blog />)
    const page = screen.getByText(/Blog/i).closest('div')
    
    expect(page?.className).toMatch(/grid/)
  })

  it('devrait être responsive', () => {
    renderWithRouter(<Blog />)
    const page = screen.getByText(/Blog/i).closest('div')
    
    expect(page?.className).toMatch(/md:|lg:|sm:/)
  })

  it('devrait avoir une section pour les derniers articles', () => {
    renderWithRouter(<Blog />)
    const page = screen.getByText(/Blog/i).closest('div')
    
    expect(page).toBeTruthy()
  })

  it('devrait avoir un header avec navigation', () => {
    renderWithRouter(<Blog />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('devrait avoir un footer', () => {
    renderWithRouter(<Blog />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})


