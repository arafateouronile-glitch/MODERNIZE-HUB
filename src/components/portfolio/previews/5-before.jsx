// Portfolio AVANT - Artisan Électricien (Template cheap)
const ArtisanBefore = ({ demo }) => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">ÉLECTRICIEN</h1>
        <p className="text-2xl">06 12 34 56 78</p>
      </header>
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-200 h-64 mb-8 flex items-center justify-center text-gray-600">
            Photo de travail
          </div>
          <h2 className="text-2xl font-bold text-center mb-8">Nos Services</h2>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-bold mb-2">Installation</h3>
              <p className="text-gray-600 text-sm">Électricité générale</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Dépannage</h3>
              <p className="text-gray-600 text-sm">Intervention rapide</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Rénovation</h3>
              <p className="text-gray-600 text-sm">Mise aux normes</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>© 2014 - Tous droits réservés</p>
      </footer>
    </div>
  )
}

export default ArtisanBefore

