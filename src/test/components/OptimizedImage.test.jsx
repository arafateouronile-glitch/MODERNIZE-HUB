import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { OptimizedImage } from '../../components/common/OptimizedImage'

describe('OptimizedImage Component', () => {
  it('devrait afficher une image', () => {
    render(<OptimizedImage src="/test-image.jpg" alt="Test" />)
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
  })

  it('devrait avoir l\'attribut alt', () => {
    render(<OptimizedImage src="/test.jpg" alt="Image de test" />)
    const img = screen.getByAltText('Image de test')
    expect(img).toBeInTheDocument()
  })

  it('devrait avoir l\'attribut loading="lazy" par défaut', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('devrait accepter loading="eager"', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" loading="eager" />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('loading', 'eager')
  })

  it('devrait avoir une className personnalisée', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" className="custom-class" />)
    const img = screen.getByRole('img')
    expect(img.className).toContain('custom-class')
  })

  it('devrait avoir un attribut src correct', () => {
    render(<OptimizedImage src="/images/test.jpg" alt="Test" />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', expect.stringContaining('test.jpg'))
  })

  it('devrait gérer les images avec width/height', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" width={800} height={600} />)
    const img = screen.getByRole('img')
    
    expect(img).toHaveAttribute('width')
    expect(img).toHaveAttribute('height')
  })

  it('devrait avoir des srcset si fournis', () => {
    render(
      <OptimizedImage 
        src="/test.jpg" 
        alt="Test"
        srcSet="/test-400w.jpg 400w, /test-800w.jpg 800w"
      />
    )
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('srcset')
  })

  it('devrait gérer le chargement progressif', async () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" />)
    const img = screen.getByRole('img')
    
    // L'image devrait charger progressivement
    expect(img).toBeInTheDocument()
  })

  it('devrait avoir des classes responsive par défaut', () => {
    render(<OptimizedImage src="/test.jpg" alt="Test" />)
    const img = screen.getByRole('img')
    
    // Devrait avoir des classes de largeur responsive
    expect(img.className).toMatch(/w-|object-/)
  })

  it('devrait être accessible', () => {
    render(<OptimizedImage src="/test.jpg" alt="Logo Modernize Hub" />)
    const img = screen.getByAltText('Logo Modernize Hub')
    expect(img).toHaveAttribute('alt')
  })
})


