// Portfolio AVANT - Agence Immobilière (Grille basique)
const ImmobilierBefore = ({ demo }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold text-center">AGENCE IMMOBILIÈRE</h1>
      </header>
      <div className="bg-blue-400 py-4 px-6">
        <input type="text" placeholder="Rechercher un bien..." className="w-full max-w-md mx-auto block px-4 py-2" />
      </div>
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-gray-300">
              <div className="h-40 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="font-bold">Bien {i}</h3>
                <p className="text-gray-600 text-sm">Prix: {(i * 100).toLocaleString()} €</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>© 2014 - Tous droits réservés</p>
      </footer>
    </div>
  )
}

export default ImmobilierBefore


