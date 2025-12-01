import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Contact } from '../../components/sections/Contact'
import * as storageModule from '../../services/supabaseStorage'
import * as emailModule from '../../services/emailService'

// Mock des modules
vi.mock('../../services/supabaseStorage', () => ({
  supabaseStorage: {
    saveLead: vi.fn(),
  },
}))

vi.mock('../../services/emailService', () => ({
  sendLeadEmails: vi.fn(),
}))

vi.mock('../../hooks/useScrollAnimation', () => ({
  useScrollAnimation: () => [{ current: null }, true],
}))

vi.mock('../../components/animations/Reveal', () => ({
  Reveal: ({ children }) => <div>{children}</div>,
}))

vi.mock('../common/CalendlyButton', () => ({
  CalendlyButton: () => <button>Calendly</button>,
}))

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    storageModule.supabaseStorage.saveLead.mockResolvedValue({
      id: 'test-id',
      name: 'Test User',
      email: 'test@example.com',
    })
    emailModule.sendLeadEmails.mockResolvedValue({
      admin: { success: true },
      confirmation: { success: true },
    })
  })

  it('should render contact form', () => {
    render(<Contact />)
    
    expect(screen.getByPlaceholderText(/VOTRE NOM/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/VOTRE EMAIL/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/VOTRE TÉLÉPHONE/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ENVOYER/i })).toBeInTheDocument()
  })

  it('should validate required fields', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const submitButton = screen.getByRole('button', { name: /ENVOYER/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Nom requis/i)).toBeInTheDocument()
    })
  })

  it('should validate email format', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const nameInput = screen.getByPlaceholderText(/VOTRE NOM/i)
    const emailInput = screen.getByPlaceholderText(/VOTRE EMAIL/i)
    const submitButton = screen.getByRole('button', { name: /ENVOYER/i })

    await user.type(nameInput, 'Test')
    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Email invalide/i)).toBeInTheDocument()
    })
  })

  it('should submit form with valid data', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const nameInput = screen.getByPlaceholderText(/VOTRE NOM/i)
    const emailInput = screen.getByPlaceholderText(/VOTRE EMAIL/i)
    const budgetSelect = screen.getByRole('combobox')
    const submitButton = screen.getByRole('button', { name: /ENVOYER/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.selectOptions(budgetSelect, '1.5k-3k')
    await user.click(submitButton)

    await waitFor(() => {
      expect(storageModule.supabaseStorage.saveLead).toHaveBeenCalledWith({
        type: 'quote',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '',
        budget: '1.5k-3k',
        message: '',
      })
    })
  })

  it('should show success message after submission', async () => {
    const user = userEvent.setup()
    render(<Contact />)
    
    const nameInput = screen.getByPlaceholderText(/VOTRE NOM/i)
    const emailInput = screen.getByPlaceholderText(/VOTRE EMAIL/i)
    const budgetSelect = screen.getByRole('combobox')
    const submitButton = screen.getByRole('button', { name: /ENVOYER/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.selectOptions(budgetSelect, '1.5k-3k')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Demande Reçue/i)).toBeInTheDocument()
    })
  })
})

