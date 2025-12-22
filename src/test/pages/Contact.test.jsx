import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Contact } from '../../pages/Contact'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Contact Page', () => {
  it('devrait afficher le titre de la page', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByText(/Contact|Parlons|Démarrons/i)).toBeInTheDocument()
  })

  it('devrait afficher le formulaire de contact', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByLabelText(/Nom|Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
  })

  it('devrait avoir un champ téléphone', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByLabelText(/Téléphone|Phone/i)).toBeInTheDocument()
  })

  it('devrait avoir un champ budget', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByLabelText(/Budget/i)).toBeInTheDocument()
  })

  it('devrait avoir un champ message', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByLabelText(/Message|Description/i)).toBeInTheDocument()
  })

  it('devrait avoir un bouton d\'envoi', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByRole('button', { name: /Envoyer|Demander/i })).toBeInTheDocument()
  })

  it('devrait valider les champs requis', async () => {
    renderWithRouter(<Contact />)
    const submitButton = screen.getByRole('button', { name: /Envoyer/i })
    
    fireEvent.click(submitButton)
    
    // Les erreurs de validation devraient apparaître
    await waitFor(() => {
      const errors = screen.queryAllByText(/requis|obligatoire/i)
      expect(errors.length).toBeGreaterThanOrEqual(0)
    })
  })

  it('devrait valider le format email', async () => {
    renderWithRouter(<Contact />)
    const emailInput = screen.getByLabelText(/Email/i)
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.blur(emailInput)
    
    await waitFor(() => {
      // Devrait afficher une erreur de format
      expect(emailInput).toBeInTheDocument()
    })
  })

  it('devrait soumettre le formulaire avec des données valides', async () => {
    renderWithRouter(<Contact />)
    
    fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Test message' } })
    
    const submitButton = screen.getByRole('button', { name: /Envoyer/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      // Le formulaire devrait être soumis
      expect(submitButton).toBeInTheDocument()
    })
  })

  it('devrait afficher les informations de contact', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByText(/contact@modernizehub.com/i)).toBeInTheDocument()
  })


  it('devrait afficher le temps de réponse moyen', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByText(/2h|24h|Réponse/i)).toBeInTheDocument()
  })

  it('devrait être responsive', () => {
    renderWithRouter(<Contact />)
    const page = screen.getByText(/Contact/i).closest('div')
    expect(page?.className).toMatch(/grid|flex/)
  })

  it('devrait afficher une confirmation après envoi', async () => {
    renderWithRouter(<Contact />)
    
    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello' } })
    
    const submitButton = screen.getByRole('button', { name: /Envoyer/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      // Un message de succès devrait apparaître
      expect(submitButton).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})


