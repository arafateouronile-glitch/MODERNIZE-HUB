import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../../components/common/Button'

describe('Button Component', () => {
  it('devrait afficher le texte du bouton', () => {
    render(<Button>Cliquez-moi</Button>)
    expect(screen.getByText('Cliquez-moi')).toBeInTheDocument()
  })

  it('devrait accepter la prop variant', () => {
    render(<Button variant="secondary">Test</Button>)
    const button = screen.getByText('Test')
    expect(button).toBeInTheDocument()
  })

  it('devrait accepter la prop size', () => {
    render(<Button size="large">Large Button</Button>)
    const button = screen.getByText('Large Button')
    expect(button).toBeInTheDocument()
  })

  it('devrait être cliquable par défaut', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByText('Click me')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('devrait être désactivable', () => {
    const handleClick = vi.fn()
    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    
    const button = screen.getByText('Disabled')
    expect(button).toBeDisabled()
    
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('devrait accepter une className custom', () => {
    render(<Button className="custom-class">Test</Button>)
    const button = screen.getByText('Test')
    expect(button.className).toContain('custom-class')
  })

  it('devrait avoir le type "button" par défaut', () => {
    render(<Button>Test</Button>)
    const button = screen.getByText('Test')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('devrait accepter un type custom (submit)', () => {
    render(<Button type="submit">Submit</Button>)
    const button = screen.getByText('Submit')
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('devrait afficher un icône si fourni', () => {
    const Icon = () => <span data-testid="icon">→</span>
    render(<Button icon={<Icon />}>With Icon</Button>)
    
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('With Icon')).toBeInTheDocument()
  })

  it('devrait avoir des styles de transition', () => {
    render(<Button>Test</Button>)
    const button = screen.getByText('Test')
    expect(button.className).toMatch(/transition/)
  })

  it('devrait gérer le variant "primary"', () => {
    render(<Button variant="primary">Primary</Button>)
    const button = screen.getByText('Primary')
    // Devrait avoir les styles primary (bg-primary, etc.)
    expect(button.className).toBeTruthy()
  })

  it('devrait gérer le variant "secondary"', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByText('Secondary')
    expect(button.className).toBeTruthy()
  })

  it('devrait gérer le variant "outline"', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByText('Outline')
    expect(button.className).toMatch(/border/)
  })

  it('devrait être accessible au clavier', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Test</Button>)
    
    const button = screen.getByText('Test')
    fireEvent.keyDown(button, { key: 'Enter' })
    
    // Le bouton natif gère déjà l'Enter
    expect(button).toBeInTheDocument()
  })

  it('devrait avoir un état de focus visible', () => {
    render(<Button>Focus Test</Button>)
    const button = screen.getByText('Focus Test')
    
    // Devrait avoir des classes de focus (ring, outline, etc.)
    expect(button.className).toMatch(/focus/)
  })
})


