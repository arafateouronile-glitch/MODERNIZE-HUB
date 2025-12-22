// Version ultra-simplifiée pour tester
function AppTestSimple() {
  return (
    <div style={{
      backgroundColor: '#FF0000',
      color: '#FFFFFF',
      minHeight: '100vh',
      padding: '40px',
      fontSize: '32px',
      fontFamily: 'Arial, sans-serif',
      zIndex: 999999
    }}>
      <h1 style={{ color: '#FFFFFF', fontSize: '48px', marginBottom: '20px' }}>
        🎯 TEST SIMPLE
      </h1>
      <p style={{ color: '#FFFFFF', fontSize: '24px' }}>
        Si vous voyez ce texte en blanc sur fond rouge, React fonctionne !
      </p>
      <p style={{ color: '#FFFFFF', fontSize: '20px', marginTop: '20px' }}>
        Background: Rouge (#FF0000)
      </p>
      <p style={{ color: '#FFFFFF', fontSize: '20px' }}>
        Text: Blanc (#FFFFFF)
      </p>
    </div>
  )
}

export default AppTestSimple



