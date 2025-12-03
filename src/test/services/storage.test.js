import { describe, it, expect, vi, beforeEach } from 'vitest'
import { supabaseStorage } from '../../services/supabaseStorage'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

describe('Storage Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue('[]')
  })

  it('should get leads from localStorage when Supabase is not configured', async () => {
    // Mock Supabase non configuré
    const originalEnv = import.meta.env
    vi.stubEnv('VITE_SUPABASE_URL', '')
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '')

    const leads = await supabaseStorage.getLeads()
    
    expect(leads).toEqual([])
    expect(localStorageMock.getItem).toHaveBeenCalled()
  })

  it('should save lead structure correctly', async () => {
    const lead = {
      type: 'quote',
      name: 'Test User',
      email: 'test@example.com',
      phone: '0123456789',
      budget: '1.5k-3k',
      message: 'Test message',
    }

    // Mock Supabase non configuré pour utiliser localStorage
    vi.stubEnv('VITE_SUPABASE_URL', '')
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '')

    const saved = await supabaseStorage.saveLead(lead)

    expect(saved).toHaveProperty('id')
    expect(saved.name).toBe(lead.name)
    expect(saved.email).toBe(lead.email)
  })
})



