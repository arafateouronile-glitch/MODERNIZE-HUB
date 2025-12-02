import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppRouter } from './AppRouter'
import { initStorage } from './utils/initStorage'
import { loadCrisp } from './lib/crisp'
import { registerServiceWorker, promptPWAInstall } from './utils/registerServiceWorker'
import './index.css'

// Initialiser le storage avec les données par défaut
initStorage()

// Charger Crisp Chat après un délai (pour ne pas ralentir le chargement initial)
setTimeout(() => {
  loadCrisp()
}, 2000)

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
