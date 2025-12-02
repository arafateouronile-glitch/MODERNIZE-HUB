import { describe, it, expect } from 'vitest'
import { 
  formatPrice, 
  formatDate, 
  slugify, 
  truncateText, 
  validateEmail, 
  validatePhone,
  cn 
} from '../../utils/helpers'

describe('Helper Functions', () => {
  describe('formatPrice', () => {
    it('formate un prix avec espace comme séparateur de milliers', () => {
      // Utiliser une regex flexible pour l'espace
      const result = formatPrice(1990)
      expect(result).toMatch(/1[\s\u202f]990€/)
    })

    it('gère les nombres sans milliers', () => {
      expect(formatPrice(500)).toMatch(/500€/)
    })

    it('gère zéro', () => {
      expect(formatPrice(0)).toMatch(/0€/)
    })
  })

  describe('formatDate', () => {
    it('formate une date en français', () => {
      const date = new Date('2025-01-15')
      const result = formatDate(date)
      expect(result).toMatch(/15|jan|2025/i)
    })

    it('accepte une string de date', () => {
      const result = formatDate('2025-01-15')
      expect(result).toMatch(/15|jan|2025/i)
    })
  })

  describe('slugify', () => {
    it('convertit un texte en slug', () => {
      expect(slugify('Hello World')).toBe('hello-world')
    })

    it('retire les caractères spéciaux', () => {
      expect(slugify('Hello @#$ World!')).toBe('hello-world')
    })

    it('gère les accents', () => {
      expect(slugify('Café Crème')).toBe('cafe-creme')
    })

    it('convertit les espaces en tirets', () => {
      expect(slugify('multiple   spaces')).toBe('multiple-spaces')
    })

    it('gère les tirets multiples', () => {
      expect(slugify('hello---world')).toBe('hello-world')
    })
  })

  describe('truncateText', () => {
    it('tronque un texte long', () => {
      const longText = 'A'.repeat(150)
      const result = truncateText(longText, 50)
      expect(result.length).toBeLessThanOrEqual(53) // 50 + '...'
      expect(result).toContain('...')
    })

    it('ne tronque pas un texte court', () => {
      const shortText = 'Short text'
      expect(truncateText(shortText, 50)).toBe(shortText)
    })

    it('utilise la limite par défaut de 100', () => {
      const text = 'A'.repeat(150)
      const result = truncateText(text)
      expect(result.length).toBeLessThanOrEqual(103) // 100 + '...'
    })
  })

  describe('validateEmail', () => {
    it('valide un email correct', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name+tag@example.co.uk')).toBe(true)
    })

    it('rejette un email invalide', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
    })

    it('gère les strings vides', () => {
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('validatePhone', () => {
    it('valide un numéro français', () => {
      expect(validatePhone('0612345678')).toBe(true)
      expect(validatePhone('+33612345678')).toBe(true)
    })

    it('rejette un numéro invalide', () => {
      expect(validatePhone('123')).toBe(false)
      expect(validatePhone('abcdefghij')).toBe(false)
    })

    it('accepte différents formats', () => {
      expect(validatePhone('06 12 34 56 78')).toBe(true)
      expect(validatePhone('06-12-34-56-78')).toBe(true)
      expect(validatePhone('06.12.34.56.78')).toBe(true)
    })
  })

  describe('cn (classnames utility)', () => {
    it('combine plusieurs classes', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
    })

    it('filtre les valeurs falsy', () => {
      expect(cn('class1', false, 'class2', null, undefined)).toBe('class1 class2')
    })

    it('gère les conditionnels', () => {
      const isActive = true
      expect(cn('base', isActive && 'active')).toBe('base active')
    })

    it('retourne une string vide si aucune classe', () => {
      expect(cn()).toBe('')
      expect(cn(false, null, undefined)).toBe('')
    })
  })
})
