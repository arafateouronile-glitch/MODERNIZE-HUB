// Portfolio AVANT - Restaurant (Template WordPress générique)
const RestaurantBefore = ({ demo }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-amber-800 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">RESTAURANT</h1>
        <p className="text-amber-200">Gastronomique</p>
      </header>

      {/* Carousel basique */}
      <div className="bg-amber-700 h-64 flex items-center justify-center text-white text-xl">
        <div className="text-center">
          <div className="mb-4">⬅️</div>
          <div>Image Carrousel</div>
          <div className="mt-4">➡️</div>
        </div>
      </div>

      {/* Menu Section */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Notre Menu</h2>
          <div className="grid grid-cols-3 gap-6">
            {['Entrée', 'Plat', 'Dessert'].map((item, idx) => (
              <div key={idx} className="bg-white p-6 border border-gray-300 text-center">
                <h3 className="font-bold mb-2">{item}</h3>
                <p className="text-gray-600 text-sm">Description du plat</p>
                <p className="text-amber-800 font-bold mt-2">Prix</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <p className="text-gray-600">Téléphone: 01 23 45 67 89</p>
        <p className="text-gray-600">Email: contact@restaurant.fr</p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p className="text-sm">© 2014 - Tous droits réservés</p>
      </footer>
    </div>
  )
}

export default RestaurantBefore

