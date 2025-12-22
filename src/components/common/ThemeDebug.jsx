import { useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

/**
 * Composant de debug pour vérifier que le thème fonctionne
 * À supprimer en production
 */
export const ThemeDebug = () => {
  const { theme } = useTheme()

  useEffect(() => {
    // Vérifier que les variables CSS changent (silencieux en production)
    // Les variables CSS sont mises à jour automatiquement via ThemeContext
  }, [theme])

  if (process.env.NODE_ENV === 'production') return null

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 9999,
        color: 'var(--color-text-main)',
      }}
    >
      Theme: {theme}
    </div>
  )
}



