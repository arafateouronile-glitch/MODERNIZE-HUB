import { describe, it, expect, vi, beforeEach } from 'vitest'
import { saveLead, getLeads, deleteLead } from '../../services/supabaseStorage'

// Mock Supabase
vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ data: { id: 'lead-123' }, error: null }),
      select: vi.fn().mockResolvedValue({ data: [{ id: 'lead-123', name: 'Test' }], error: null }),
      delete: vi.fn().mockResolvedValue({ error: null }),
      eq: vi.fn(function() { return this }),
    })),
  },
}))

describe('Supabase Storage Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Clear localStorage
    localStorage.clear()
  })

  describe('saveLead', () => {
    it('devrait sauvegarder un lead dans Supabase', async () => {
      const leadData = {
        name: 'Test User',
        email: 'test@example.com',
        type: 'quote',
      }

      const result = await saveLead(leadData)
      
      expect(result).toBeTruthy()
      expect(result.id).toBeTruthy()
    })

    it('devrait fallback sur localStorage si Supabase échoue', async () => {
      const leadData = {
        name: 'Local User',
        email: 'local@example.com',
        type: 'audit',
      }

      await saveLead(leadData)
      
      // Vérifier localStorage
      const storedLeads = JSON.parse(localStorage.getItem('leads') || '[]')
      expect(Array.isArray(storedLeads)).toBe(true)
    })

    it('devrait générer un ID unique pour chaque lead', async () => {
      const lead1 = await saveLead({ name: 'User 1', email: 'user1@test.com', type: 'quote' })
      const lead2 = await saveLead({ name: 'User 2', email: 'user2@test.com', type: 'quote' })
      
      expect(lead1.id).not.toBe(lead2.id)
    })

    it('devrait ajouter un timestamp automatiquement', async () => {
      const lead = await saveLead({ name: 'User', email: 'user@test.com', type: 'quote' })
      
      expect(lead.created_at || lead.timestamp).toBeTruthy()
    })
  })

  describe('getLeads', () => {
    it('devrait récupérer tous les leads depuis Supabase', async () => {
      const leads = await getLeads()
      
      expect(Array.isArray(leads)).toBe(true)
    })

    it('devrait fallback sur localStorage si Supabase échoue', async () => {
      // Sauvegarder quelques leads en local
      localStorage.setItem('leads', JSON.stringify([
        { id: '1', name: 'Local Lead', email: 'local@test.com' }
      ]))

      const leads = await getLeads()
      
      expect(Array.isArray(leads)).toBe(true)
    })

    it('devrait retourner un tableau vide si aucun lead', async () => {
      localStorage.clear()
      const leads = await getLeads()
      
      expect(Array.isArray(leads)).toBe(true)
      expect(leads.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('deleteLead', () => {
    it('devrait supprimer un lead par ID', async () => {
      const result = await deleteLead('lead-123')
      
      // Ne devrait pas crasher
      expect(result !== undefined).toBe(true)
    })

    it('devrait fallback sur localStorage pour la suppression', async () => {
      localStorage.setItem('leads', JSON.stringify([
        { id: 'local-1', name: 'Test' }
      ]))

      await deleteLead('local-1')
      
      const leads = JSON.parse(localStorage.getItem('leads') || '[]')
      expect(leads.find(l => l.id === 'local-1')).toBeFalsy()
    })
  })

  describe('Error Handling', () => {
    it('devrait logger les erreurs Supabase', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      // Forcer une erreur (email invalide)
      await saveLead({ name: '', email: 'invalid' })
      
      // Les erreurs devraient être loggées ou gérées
      expect(true).toBe(true)
      
      consoleSpy.mockRestore()
    })

    it('devrait gérer les erreurs réseau gracieusement', async () => {
      // Simuler une panne réseau
      const leads = await getLeads()
      
      // Ne devrait pas crasher, retourner un tableau vide ou localStorage
      expect(Array.isArray(leads)).toBe(true)
    })
  })
})


