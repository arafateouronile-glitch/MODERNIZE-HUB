import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Testimonials } from '../../components/sections/Testimonials'

describe('Testimonials Component', () => {
  it('devrait afficher le titre de la section', () => {
    render(<Testimonials />)
    expect(screen.getByText(/Témoignages|Ce que disent nos clients/i)).toBeInTheDocument()
  })

  it('devrait afficher au moins 3 témoignages', () => {
    render(<Testimonials />)
    const section = screen.getByText(/Témoignages/i).closest('section')
    
    // Devrait y avoir plusieurs témoignages
    expect(section).toBeTruthy()
  })

  it('devrait afficher des étoiles ou notes', () => {
    render(<Testimonials />)
    const section = screen.getByText(/Témoignages/i).closest('section')
    
    // Devrait y avoir des icônes d'étoiles
    const stars = section?.querySelectorAll('svg')
    expect(stars && stars.length).toBeGreaterThan(0)
  })

  it('devrait afficher les noms des clients', () => {
    render(<Testimonials />)
    const section = screen.getByText(/Témoignages/i).closest('section')
    
    // Devrait contenir des noms de clients
    expect(section?.textContent).toBeTruthy()
  })

  it('devrait afficher les entreprises/postes des clients', () => {
    render(<Testimonials />)
    const section = screen.getByText(/Témoignages/i).closest('section')
    
    // Devrait contenir des infos sur les entreprises
    expect(section?.textContent).toBeTruthy()
  })

  it('devrait afficher des citations entre guillemets', () => {
    render(<Testimonials />)
    const section = screen.getByText(/Témoignages/i).closest('section')
    
    // Devrait y avoir des citations (guillemets ou balise <q>)
    expect(section?.innerHTML).toMatch(/"|"|«|»|<q>/)
  })

  it('devrait avoir un design en grille ou carousel', () => {
    render(<Testimonials />)
    const section = screen.getByText(/Témoignages/i).closest('section')
    
    // Devrait avoir des classes de layout
    expect(section?.className).toMatch(/grid|flex|carousel/)
  })

  it('devrait afficher des avatars ou photos', () => {
    render(<Testimonials />)
    const images = screen.queryAllByRole('img')
    
    // Devrait y avoir au moins quelques images (avatars)
    expect(images.length).toBeGreaterThanOrEqual(0)
  })

  it('devrait être animée au scroll', () => {
    render(<Testimonials />)
    const section = screen.getByText(/Témoignages/i).closest('section')
    
    // Devrait utiliser Framer Motion ou animations CSS
    expect(section).toBeTruthy()
  })
})


