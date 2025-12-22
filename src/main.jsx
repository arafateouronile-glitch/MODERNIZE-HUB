import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppRouter } from './AppRouter'
import { initStorage } from './utils/initStorage'
import { registerServiceWorker, promptPWAInstall } from './utils/registerServiceWorker'
import './index.css'

// Initialiser le storage avec les données par défaut
initStorage()


// Enregistrer le Service Worker pour PWA
if (import.meta.env.PROD) {
  registerServiceWorker()
  promptPWAInstall()
} else {
  console.log('[PWA] Service Worker désactivé en développement')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </StrictMode>,
)
