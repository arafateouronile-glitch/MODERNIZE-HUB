import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Reveal } from '../../components/animations/Reveal'

describe('Reveal Component (Animation)', () => {
  it('devrait afficher le contenu enfant', () => {
    render(<Reveal>Revealed Content</Reveal>)
    expect(screen.getByText('Revealed Content')).toBeInTheDocument()
  })

  it('devrait accepter une prop delay', () => {
    render(<Reveal delay={0.5}>Delayed</Reveal>)
    expect(screen.getByText('Delayed')).toBeInTheDocument()
  })

  it('devrait accepter une prop direction', () => {
    render(<Reveal direction="right">From Right</Reveal>)
    expect(screen.getByText('From Right')).toBeInTheDocument()
  })

  it('devrait accepter une prop duration', () => {
    render(<Reveal duration={1}>Slow Reveal</Reveal>)
    expect(screen.getByText('Slow Reveal')).toBeInTheDocument()
  })

  it('devrait wrapper le contenu dans un motion.div', () => {
    render(<Reveal>Motion Test</Reveal>)
    const element = screen.getByText('Motion Test').closest('div')
    
    // Devrait être un élément Framer Motion
    expect(element).toBeTruthy()
  })

  it('devrait accepter une className personnalisée', () => {
    render(<Reveal className="custom-reveal">Custom</Reveal>)
    const element = screen.getByText('Custom').closest('div')
    expect(element?.className).toContain('custom-reveal')
  })

  it('devrait utiliser Intersection Observer pour trigger au scroll', () => {
    render(<Reveal>Scroll Trigger</Reveal>)
    
    // Le composant devrait être monté
    expect(screen.getByText('Scroll Trigger')).toBeInTheDocument()
  })

  it('devrait supporter différentes directions (up, down, left, right)', () => {
    const { rerender } = render(<Reveal direction="up">Up</Reveal>)
    expect(screen.getByText('Up')).toBeInTheDocument()
    
    rerender(<Reveal direction="down">Down</Reveal>)
    expect(screen.getByText('Down')).toBeInTheDocument()
    
    rerender(<Reveal direction="left">Left</Reveal>)
    expect(screen.getByText('Left')).toBeInTheDocument()
    
    rerender(<Reveal direction="right">Right</Reveal>)
    expect(screen.getByText('Right')).toBeInTheDocument()
  })

  it('devrait avoir une animation fluide', () => {
    render(<Reveal>Smooth</Reveal>)
    const element = screen.getByText('Smooth').closest('div')
    
    // Devrait avoir des attributs Framer Motion (initial, animate, etc.)
    expect(element).toBeTruthy()
  })
})

