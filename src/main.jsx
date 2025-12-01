import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppRouter } from './AppRouter'
import { initStorage } from './utils/initStorage'
import './index.css'

// Initialiser le storage avec les données par défaut
initStorage()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </StrictMode>,
)
