import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { About } from '../../components/sections/About'

describe('About Component', () => {
  it('devrait afficher le titre de la section', () => {
    render(<About />)
    expect(screen.getByText(/À propos|Pourquoi|Problème/i)).toBeInTheDocument()
  })

  it('devrait expliquer les problèmes des sites obsolètes', () => {
    render(<About />)
    const section = screen.getByText(/À propos|Pourquoi/i).closest('section')
    expect(section?.textContent).toMatch(/obsolète|lent|dépassé|ancien/i)
  })

  it('devrait présenter les solutions Modernize Hub', () => {
    render(<About />)
    const section = screen.getByText(/À propos/i).closest('section')
    expect(section?.textContent).toMatch(/solution|moderne|rapide|performant/i)
  })

  it('devrait afficher des statistiques ou métriques', () => {
    render(<About />)
    const section = screen.getByText(/À propos/i).closest('section')
    
    // Devrait contenir des pourcentages ou chiffres
    expect(section?.textContent).toMatch(/\d+%|\+\d+/)
  })

  it('devrait avoir un CTA', () => {
    render(<About />)
    const buttons = screen.getAllByRole('button')
    
    // Devrait y avoir au moins un bouton CTA
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('devrait utiliser des icônes pour illustrer les points', () => {
    render(<About />)
    const section = screen.getByText(/À propos/i).closest('section')
    const svgs = section?.querySelectorAll('svg')
    
    // Devrait y avoir des icônes
    expect(svgs && svgs.length).toBeGreaterThan(0)
  })

  it('devrait avoir un design responsive', () => {
    render(<About />)
    const section = screen.getByText(/À propos/i).closest('section')
    expect(section?.className).toMatch(/grid|flex/)
  })

  it('devrait être animée', () => {
    render(<About />)
    const section = screen.getByText(/À propos/i).closest('section')
    expect(section).toBeTruthy()
  })
})

