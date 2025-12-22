// Version de test minimale pour diagnostiquer le problème
function AppTest() {
  return (
    <div style={{
      backgroundColor: '#0F1116',
      color: '#FFFFFF',
      minHeight: '100vh',
      padding: '40px',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#D9FF00', marginBottom: '20px' }}>
        🎯 TEST - Si vous voyez ceci, React fonctionne !
      </h1>
      <p style={{ color: '#FFFFFF' }}>
        Cette page de test devrait être visible avec un fond sombre (#0F1116) et du texte blanc.
      </p>
      <p style={{ color: '#D9FF00', marginTop: '20px' }}>
        Si vous voyez cette page de test, le problème vient d'un composant spécifique.
      </p>
      <p style={{ color: '#FFFFFF', marginTop: '20px' }}>
        Si vous ne voyez toujours rien, c'est un problème CSS ou de rendu plus profond.
      </p>
    </div>
  )
}

export default AppTest



