// Portfolio AVANT - Cabinet d'Avocats (Design 2015 obsolète)
const CabinetAvocatBefore = ({ demo }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header simple */}
      <header className="bg-gray-800 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">CABINET D'AVOCATS</h1>
        </div>
      </header>

      {/* Navigation basique */}
      <nav className="bg-gray-700 text-white">
        <div className="container mx-auto px-6 py-3">
          <a href="#accueil" className="mr-6">Accueil</a>
          <a href="#services" className="mr-6">Services</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section basique */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Bienvenue</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cabinet d'avocats spécialisé dans le droit des affaires. Nous sommes à votre service depuis 2010.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-8">Nos Services</h3>
          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 border border-gray-300">
              <h4 className="font-bold text-lg mb-2">Droit des Affaires</h4>
              <p className="text-gray-600 text-sm">
                Accompagnement juridique pour les entreprises
              </p>
            </div>
            <div className="bg-white p-6 border border-gray-300">
              <h4 className="font-bold text-lg mb-2">Droit Fiscal</h4>
              <p className="text-gray-600 text-sm">
                Optimisation fiscale et conseils
              </p>
            </div>
            <div className="bg-white p-6 border border-gray-300">
              <h4 className="font-bold text-lg mb-2">Droit Social</h4>
              <p className="text-gray-600 text-sm">
                Gestion des relations de travail
              </p>
            </div>
            <div className="bg-white p-6 border border-gray-300">
              <h4 className="font-bold text-lg mb-2">Droit Immobilier</h4>
              <p className="text-gray-600 text-sm">
                Transactions immobilières
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Contactez-nous</h3>
          <p className="text-gray-600 mb-4">Email: contact@cabinet-avocats.fr</p>
          <p className="text-gray-600">Téléphone: 01 23 45 67 89</p>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">© 2014 - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  )
}

export default CabinetAvocatBefore

