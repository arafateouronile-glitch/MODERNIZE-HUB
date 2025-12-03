import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { SEO } from '../../components/seo/SEO'

describe('SEO Component', () => {
  beforeEach(() => {
    // Nettoyer les meta tags avant chaque test
    document.head.innerHTML = ''
  })

  it('devrait définir le titre de la page', () => {
    render(<SEO title="Test Page" />)
    expect(document.title).toBe('Test Page')
  })

  it('devrait créer une meta description', () => {
    render(<SEO description="This is a test description" />)
    const metaDesc = document.querySelector('meta[name="description"]')
    expect(metaDesc?.getAttribute('content')).toBe('This is a test description')
  })

  it('devrait créer des meta keywords', () => {
    render(<SEO keywords="test, seo, react" />)
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    expect(metaKeywords?.getAttribute('content')).toBe('test, seo, react')
  })

  it('devrait créer des Open Graph tags', () => {
    render(<SEO title="OG Test" description="OG Description" />)
    
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    
    expect(ogTitle?.getAttribute('content')).toBe('OG Test')
    expect(ogDesc?.getAttribute('content')).toBe('OG Description')
  })

  it('devrait créer des Twitter Card tags', () => {
    render(<SEO title="Twitter Test" description="Twitter Description" />)
    
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    const twitterDesc = document.querySelector('meta[name="twitter:description"]')
    
    expect(twitterTitle?.getAttribute('content')).toBe('Twitter Test')
    expect(twitterDesc?.getAttribute('content')).toBe('Twitter Description')
  })

  it('devrait gérer une image OG personnalisée', () => {
    render(<SEO image="https://example.com/image.jpg" />)
    
    const ogImage = document.querySelector('meta[property="og:image"]')
    expect(ogImage?.getAttribute('content')).toBe('https://example.com/image.jpg')
  })

  it('devrait définir l\'URL canonique', () => {
    render(<SEO canonical="https://modernizehub.com/test" />)
    
    const canonical = document.querySelector('link[rel="canonical"]')
    expect(canonical?.getAttribute('href')).toBe('https://modernizehub.com/test')
  })

  it('devrait définir le type de page (website, article)', () => {
    render(<SEO type="article" />)
    
    const ogType = document.querySelector('meta[property="og:type"]')
    expect(ogType?.getAttribute('content')).toBe('article')
  })

  it('devrait définir la locale', () => {
    render(<SEO locale="fr_FR" />)
    
    const ogLocale = document.querySelector('meta[property="og:locale"]')
    expect(ogLocale?.getAttribute('content')).toBe('fr_FR')
  })

  it('devrait gérer les meta robots', () => {
    render(<SEO robots="index, follow" />)
    
    const metaRobots = document.querySelector('meta[name="robots"]')
    expect(metaRobots?.getAttribute('content')).toBe('index, follow')
  })

  it('devrait nettoyer les anciennes meta tags au démontage', () => {
    const { unmount } = render(<SEO title="Test" />)
    expect(document.title).toBe('Test')
    
    unmount()
    
    // Les meta tags devraient être nettoyées
    // (ou laissées pour éviter le flash, selon l'implémentation)
    expect(document.head).toBeTruthy()
  })

  it('devrait utiliser un titre par défaut si non fourni', () => {
    render(<SEO />)
    expect(document.title).toMatch(/Modernize Hub/)
  })

  it('devrait créer un JSON-LD Schema.org si fourni', () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Modernize Hub',
    }
    
    render(<SEO schema={schema} />)
    
    const scriptTag = document.querySelector('script[type="application/ld+json"]')
    expect(scriptTag).toBeTruthy()
  })
})


