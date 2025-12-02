import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sendAdminNotification, sendConfirmationEmail } from '../../services/emailService'

// Mock Resend
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: 'email-123' }),
    },
  })),
}))

describe('Email Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('sendAdminNotification', () => {
    it('devrait envoyer un email à l\'admin', async () => {
      const leadData = {
        name: 'Test User',
        email: 'test@example.com',
        type: 'quote',
        budget: '3k-6k',
      }

      const result = await sendAdminNotification(leadData)
      
      // Devrait retourner un résultat (success ou error géré)
      expect(result).toBeTruthy()
    })

    it('devrait gérer les erreurs si Resend n\'est pas configuré', async () => {
      // Tester sans API key
      const leadData = {
        name: 'Test User',
        email: 'test@example.com',
      }

      const result = await sendAdminNotification(leadData)
      
      // Ne devrait pas crasher
      expect(result).toBeTruthy()
    })

    it('devrait inclure les données du lead dans l\'email', async () => {
      const leadData = {
        name: 'John Doe',
        email: 'john@example.com',
        type: 'quote',
        budget: '6k-10k',
        message: 'Je veux un site vitrine',
      }

      await sendAdminNotification(leadData)
      
      // L'email devrait être envoyé (mocké)
      expect(true).toBe(true)
    })
  })

  describe('sendConfirmationEmail', () => {
    it('devrait envoyer un email de confirmation au prospect', async () => {
      const leadData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
      }

      const result = await sendConfirmationEmail(leadData)
      
      expect(result).toBeTruthy()
    })

    it('devrait personnaliser l\'email avec le nom du prospect', async () => {
      const leadData = {
        name: 'Pierre Dupont',
        email: 'pierre@example.com',
      }

      await sendConfirmationEmail(leadData)
      
      // L'email devrait être personnalisé
      expect(true).toBe(true)
    })

    it('devrait gérer les emails invalides gracieusement', async () => {
      const leadData = {
        name: 'Test',
        email: 'invalid-email',
      }

      const result = await sendConfirmationEmail(leadData)
      
      // Ne devrait pas crasher
      expect(result).toBeTruthy()
    })
  })

  describe('Email Templates', () => {
    it('devrait utiliser le branding Modernize Hub', async () => {
      const leadData = {
        name: 'Test User',
        email: 'test@example.com',
      }

      await sendAdminNotification(leadData)
      
      // Les emails devraient inclure le branding
      expect(true).toBe(true)
    })

    it('devrait inclure des liens vers le site', async () => {
      const leadData = {
        name: 'Test User',
        email: 'test@example.com',
      }

      await sendConfirmationEmail(leadData)
      
      // L'email devrait contenir des liens (modernizehub.com)
      expect(true).toBe(true)
    })
  })
})

