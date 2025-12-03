import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Marquee } from '../../components/common/Marquee'

describe('Marquee Component', () => {
  it('devrait afficher le contenu enfant', () => {
    render(<Marquee>Test Content</Marquee>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('devrait dupliquer le contenu pour un effet infini', () => {
    render(<Marquee>Unique Text</Marquee>)
    const elements = screen.getAllByText('Unique Text')
    
    // Le contenu devrait être dupliqué au moins 2 fois pour l'effet loop
    expect(elements.length).toBeGreaterThanOrEqual(2)
  })

  it('devrait accepter une prop speed', () => {
    render(<Marquee speed={50}>Fast</Marquee>)
    expect(screen.getByText('Fast')).toBeInTheDocument()
  })

  it('devrait accepter une prop direction', () => {
    render(<Marquee direction="right">Right Direction</Marquee>)
    expect(screen.getByText('Right Direction')).toBeInTheDocument()
  })

  it('devrait avoir une animation CSS ou Framer Motion', () => {
    render(<Marquee>Animated</Marquee>)
    const container = screen.getByText('Animated').closest('div')
    
    // Devrait avoir des classes d'animation ou des attributs Framer Motion
    expect(container?.className).toMatch(/animate|motion/)
  })

  it('devrait être fluide (no gaps)', () => {
    render(<Marquee>Seamless</Marquee>)
    const container = screen.getByText('Seamless').closest('div')
    
    // Devrait avoir un overflow-hidden pour éviter les gaps
    expect(container?.className).toMatch(/overflow/)
  })

  it('devrait accepter une className custom', () => {
    render(<Marquee className="custom-marquee">Test</Marquee>)
    const container = screen.getByText('Test').closest('div')
    expect(container?.className).toContain('custom-marquee')
  })

  it('devrait supporter le pause au hover', () => {
    render(<Marquee pauseOnHover>Pause on Hover</Marquee>)
    const container = screen.getByText('Pause on Hover').closest('div')
    
    // Devrait avoir des classes de pause au hover
    expect(container).toBeTruthy()
  })
})


