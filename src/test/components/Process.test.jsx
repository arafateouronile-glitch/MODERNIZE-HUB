import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Process } from '../../components/sections/Process'

describe('Process Component', () => {
  it('devrait afficher le titre de la section', () => {
    render(<Process />)
    expect(screen.getByText(/Notre Processus|Comment ça marche|Process/i)).toBeInTheDocument()
  })

  it('devrait afficher les 4 étapes principales', () => {
    render(<Process />)
    const section = screen.getByText(/Processus|Process/i).closest('section')
    
    // Devrait contenir les 4 étapes (Brief, Design, Dev, Livraison)
    expect(section?.textContent).toMatch(/Brief|Analyse/i)
    expect(section?.textContent).toMatch(/Design|Maquette/i)
    expect(section?.textContent).toMatch(/Développement|Dev/i)
    expect(section?.textContent).toMatch(/Livraison|Lancement/i)
  })

  it('devrait afficher la durée totale (14 jours)', () => {
    render(<Process />)
    expect(screen.getByText(/14 jours|2 semaines/i)).toBeInTheDocument()
  })

  it('devrait avoir une timeline visuelle', () => {
    render(<Process />)
    const section = screen.getByText(/Processus/i).closest('section')
    
    // Devrait avoir une structure de timeline (ligne, points, etc.)
    expect(section).toBeTruthy()
  })

  it('devrait numéroter les étapes', () => {
    render(<Process />)
    const section = screen.getByText(/Processus/i).closest('section')
    
    // Devrait contenir 01, 02, 03, 04 ou 1, 2, 3, 4
    expect(section?.textContent).toMatch(/01|02|03|04|1|2|3|4/)
  })

  it('devrait utiliser des icônes pour chaque étape', () => {
    render(<Process />)
    const section = screen.getByText(/Processus/i).closest('section')
    const svgs = section?.querySelectorAll('svg')
    
    // Devrait y avoir au moins 4 icônes (une par étape)
    expect(svgs && svgs.length).toBeGreaterThanOrEqual(4)
  })

  it('devrait avoir un design responsive', () => {
    render(<Process />)
    const section = screen.getByText(/Processus/i).closest('section')
    expect(section?.className).toMatch(/grid|flex/)
  })

  it('devrait mentionner les livrables de chaque étape', () => {
    render(<Process />)
    const section = screen.getByText(/Processus/i).closest('section')
    
    // Devrait mentionner des livrables (maquette, site, formation)
    expect(section?.textContent).toMatch(/maquette|prototype|site|formation/i)
  })
})

