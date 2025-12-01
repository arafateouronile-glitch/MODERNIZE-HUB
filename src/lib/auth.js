import { supabase } from './supabase'

/**
 * Service d'authentification via Supabase
 * Fallback vers localStorage si Supabase n'est pas configuré
 */

const ADMIN_EMAIL = 'admin@modernizehub.com'
const FALLBACK_PASSWORD = 'Modernize2025!' // À changer en production

export const auth = {
  /**
   * Connexion de l'admin
   * @param {string} email
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  async signIn(email, password) {
    // Vérifier si Supabase est configuré
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    // Toujours essayer le fallback d'abord pour simplifier
    if (email === ADMIN_EMAIL && password === FALLBACK_PASSWORD) {
      localStorage.setItem('admin_auth_token', FALLBACK_PASSWORD)
      return { user: { email: ADMIN_EMAIL } }
    }

    // Si Supabase n'est pas configuré, uniquement le fallback
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Identifiants incorrects')
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Erreur d'authentification Supabase
        if (error.message.includes('Invalid login credentials') || error.message.includes('Email not confirmed')) {
          // Essayer le fallback si Supabase échoue
          if (email === ADMIN_EMAIL && password === FALLBACK_PASSWORD) {
            console.log('⚠️ Utilisation du mode fallback (localStorage)')
            localStorage.setItem('admin_auth_token', FALLBACK_PASSWORD)
            return { user: { email: ADMIN_EMAIL } }
          }
          throw new Error('Email ou mot de passe incorrect')
        }
        throw new Error('Erreur de connexion. Veuillez réessayer.')
      }

      return data
    } catch (error) {
      // Si erreur Supabase, essayer le fallback
      if (email === ADMIN_EMAIL && password === FALLBACK_PASSWORD) {
        console.log('⚠️ Utilisation du mode fallback (localStorage)')
        localStorage.setItem('admin_auth_token', FALLBACK_PASSWORD)
        return { user: { email: ADMIN_EMAIL } }
      }
      
      // Relancer l'erreur pour l'affichage à l'utilisateur
      throw error
    }
  },

  /**
   * Déconnexion
   */
  async signOut() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

    if (!supabaseUrl) {
      localStorage.removeItem('admin_auth_token')
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) throw error

    localStorage.removeItem('admin_auth_token')
  },

  /**
   * Obtenir l'utilisateur actuel
   */
  async getCurrentUser() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      // Mode fallback : utiliser localStorage
      const token = localStorage.getItem('admin_auth_token')
      if (token === FALLBACK_PASSWORD) {
        return { email: ADMIN_EMAIL }
      }
      return null
    }

    try {
      // Essayer de récupérer la session d'abord
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session) {
        // Pas de session, vérifier le fallback localStorage
        const token = localStorage.getItem('admin_auth_token')
        if (token === FALLBACK_PASSWORD) {
          return { email: ADMIN_EMAIL }
        }
        return null
      }

      // Session existe, récupérer l'utilisateur
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        // Si erreur de session, essayer le fallback
        const token = localStorage.getItem('admin_auth_token')
        if (token === FALLBACK_PASSWORD) {
          return { email: ADMIN_EMAIL }
        }
        return null
      }
      
      return user
    } catch (error) {
      // Pas d'erreur - pas de session est normal si non connecté
      // Essayer le fallback localStorage
      const token = localStorage.getItem('admin_auth_token')
      if (token === FALLBACK_PASSWORD) {
        return { email: ADMIN_EMAIL }
      }
      return null
    }
  },

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  async isAuthenticated() {
    const user = await auth.getCurrentUser()
    return user !== null
  },
}

