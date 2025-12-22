// Version ultra-simple pour tester
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('root')
if (rootElement) {
  rootElement.innerHTML = '<div style="background: red; color: white; padding: 40px; font-size: 32px; min-height: 100vh;"><h1>TEST SIMPLE</h1><p>Si vous voyez ceci, le problème vient du CSS ou des composants React.</p></div>'
  
  // Puis essayer React
  setTimeout(() => {
    createRoot(rootElement).render(
      <div style={{ background: 'green', color: 'white', padding: '40px', fontSize: '32px', minHeight: '100vh' }}>
        <h1>REACT FONCTIONNE</h1>
        <p>Si vous voyez ce texte en vert, React fonctionne !</p>
      </div>
    )
  }, 1000)
} else {
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Erreur: élément #root introuvable</div>'
}



