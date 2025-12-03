// Portfolio AVANT - Salle de Sport (Design générique)
const SalleSportBefore = ({ demo }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">SALLE DE SPORT</h1>
        <p className="text-gray-400">Votre bien-être</p>
      </header>
      <div className="bg-gray-600 h-64 flex items-center justify-center text-white text-xl">
        Photo de la salle
      </div>
      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-8">Nos Services</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
          {[
            { name: 'Musculation', price: '30€/mois' },
            { name: 'Cardio', price: '25€/mois' },
            { name: 'Cours', price: '35€/mois' },
          ].map((service, idx) => (
            <div key={idx} className="bg-gray-100 p-6 text-center border border-gray-300">
              <h3 className="font-bold mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.price}</p>
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

export default SalleSportBefore


