import { createClient } from '@supabase/supabase-js'

// Variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Helper pour vérifier la connexion
export const checkSupabaseConnection = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase non configuré. Utilisation du mode localStorage.')
    return false
  }
  
  try {
    const { data, error } = await supabase.from('leads').select('count').limit(1)
    if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist (normal au début)
      console.error('Erreur de connexion Supabase:', error)
      return false
    }
    return true
  } catch (error) {
    console.error('Impossible de se connecter à Supabase:', error)
    return false
  }
}


